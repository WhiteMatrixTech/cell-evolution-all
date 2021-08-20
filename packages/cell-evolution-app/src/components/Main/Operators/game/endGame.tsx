import type { IGameData } from '../../../../store/gameSlice';
import { contractChainId, etherClient } from '../../../../utils/etherClient';
import { BigNumber } from 'ethers';
import { confirmDialog, error, success } from '../../../Dialog/Dialog';
import { GameReport } from './GameReport';
import { loading } from '../../../Loading/Loading';

export async function endGame(gameData: IGameData) {
  return new Promise((resolve, reject) => {
    confirmDialog(
      <GameReport data={gameData} />,
      () => {
        const close = loading(`融合DNA中...`);
        doMergeDna(gameData)
          .then(() => {
            resolve(getInitGameData());
          })
          .catch(reject)
          .finally(close);
      },
      () => {
        resolve(getInitGameData());
      },
    );
  });
}

export async function doMergeDna(gameData: IGameData) {
  await etherClient.loadProvider();
  const walletInfo = await etherClient.getWalletInfo();
  if (!walletInfo) {
    error('上传失败', '未获取到钱包信息');
    throw new Error('未获取到钱包信息');
  }
  if (walletInfo.chainId !== contractChainId) {
    error('上传失败', `请将metamask的chainId切换为${contractChainId}`);
    throw new Error(`请将metamask的chainId切换为${contractChainId}`);
  }
  etherClient.connectCellEvolutionContract();
  etherClient.connectSigner();
  if (!etherClient.client) {
    error('上传失败', `钱包异常`);
    throw new Error(`钱包异常`);
  }
  const totalCell = await etherClient.client.totalcell();
  const nextid = totalCell.add(1);
  await etherClient.client.dnamerge(
    nextid,
    BigNumber.from(gameData.cell),
    BigNumber.from(gameData.adaptability),
    BigNumber.from(gameData.survivability),
    BigNumber.from(gameData.reproduction),
    BigNumber.from(gameData.env),
    BigNumber.from(gameData.day),
    BigNumber.from(getTotalScore(gameData)),
    '',
    {},
  );

  success(`融合DNA成功`, `融合的细胞ID为${nextid.toString()}`);
  return getInitGameData();
}

export function getInitGameData() {
  return {
    day: 1,
    cell: 0,
    env: 0,
    reproduction: 0,
    adaptability: 0,
    survivability: 0,
    lifeCycle: 20,
  };
}

function getTotalScore(gameData: IGameData) {
  return (
    gameData.cell +
    (gameData.adaptability + gameData.survivability + gameData.reproduction) * 100 +
    gameData.day * gameData.env
  );
}
