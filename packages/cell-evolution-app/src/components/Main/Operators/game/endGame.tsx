import type { IGameData } from '../../../../store/gameSlice';
import { contractChainId, etherClient } from '../../../../utils/etherClient';
import { BigNumber } from 'ethers';
import { confirmDialog, error, success } from '../../../Dialog/Dialog';
import { GameReport } from './GameReport';
import { loading } from '../../../Loading/Loading';
import { t } from '../../../../i18n'

export async function endGame(gameData: IGameData) {
  return new Promise((resolve, reject) => {
    confirmDialog(
      <GameReport data={gameData} />,
      () => {
        const close = loading(t('fusionDNA'));
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
  const mergeDnaFailure1 = t('whyFusedCellFailure1');
  const mergeDnaFailure2 = t('whyFusedCellFailure2');
  const mergeDnaFailure3 = t('whyFusedCellFailure3');
  if (!walletInfo) {
    error(t('uploadFailure'), mergeDnaFailure1);
    throw new Error(mergeDnaFailure1);
  }
  if (walletInfo.chainId !== contractChainId) {
    error(t('uploadFailure'), `${mergeDnaFailure2}${contractChainId}`);
    throw new Error(`${mergeDnaFailure2}${contractChainId}`);
  }
  etherClient.connectCellEvolutionContract();
  etherClient.connectSigner();
  if (!etherClient.client) {
    error(t('uploadFailure'), mergeDnaFailure3);
    throw new Error(mergeDnaFailure3);
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

  success(t('fusionDNASuccess'), `${t('fusedCellID')}${nextid.toString()}`);
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
