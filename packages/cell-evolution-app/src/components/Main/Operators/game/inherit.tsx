import type { IGameData } from '../../../../store/gameSlice';
import { contractChainId, etherClient } from '../../../../utils/etherClient';
import { loading } from '../../../Loading';
import { error, success } from '../../../Dialog/Dialog';
import styles from './styles.less';
/**
 * 遗传
 * @param gameData
 * @returns
 */
export async function inherit(gameData: IGameData) {
  return new Promise((resolve, reject) => {
    if (gameData.day > 1) {
      error('遗传失败', '只能在存活日为1的时候遗传');
      reject(new Error('只能在存活日为1的时候遗传'));
      return;
    }
    const close = loading(`获得遗传信息中..`);
    doInherit(gameData).then(resolve).catch(reject).finally(close);
  });
}

export async function doInherit(gameData: IGameData): Promise<IGameData> {
  await etherClient.loadProvider();
  const walletInfo = await etherClient.getWalletInfo();
  if (!walletInfo) {
    error('遗传失败', '未获取到钱包信息');
    throw new Error('未获取到钱包信息');
  }
  if (walletInfo.chainId !== contractChainId) {
    error('遗传失败', `请将metamask的chainId切换为${contractChainId}`);
    throw new Error(`请将metamask的chainId切换为${contractChainId}`);
  }
  etherClient.connectCellEvolutionContract();
  // etherClient.connectSigner();
  if (!etherClient.client) {
    error('遗传失败', `钱包异常`);
    throw new Error(`钱包异常`);
  }
  const [ada, sur, rep, no] = await etherClient.client.inheritance();
  const adaptability = ada.toNumber();
  const survivability = sur.toNumber();
  const reproduction = rep.toNumber();
  success(
    '遗传成功',
    <ul className={styles.result}>
      <li>遗传编号: No.{no.toNumber()}</li>
      <br />
      <li>天生繁殖性: {reproduction}</li>
      <li>天生适应性: {adaptability}</li>
      <li>天生生存性: {survivability}</li>
    </ul>,
  );

  return { ...gameData, adaptability, survivability, reproduction };
}
