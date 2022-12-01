import { contractChainId, etherClient } from '../../../../utils/etherClient';

import { BigNumber } from 'ethers';
import { error } from '../../../Dialog/Dialog';

export interface ICellData {
  cell?: number;
  day?: number;
  env?: number;
  reproduction?: number;
  adaptability?: number;
  survivability?: number;

  id?: string;
  totalScore?: string;
  finalTitle?: string;
  creator?: string;
  owner?: string;
}
/**
 * 获得世界信息
 * @param gameData
 * @returns
 */
export async function getCellInfo(id: string): Promise<ICellData> {
  return new Promise((resolve, reject) => {
    doGetCellInfo(id).then(resolve).catch(reject);
  });
}

export async function doGetCellInfo(cellId: string): Promise<ICellData> {
  await etherClient.loadProvider();
  const walletInfo = await etherClient.getWalletInfo();
  if (!walletInfo) {
    error('获得细胞信息失败', '未获取到钱包信息');
    throw new Error('未获取到钱包信息');
  }
  if (walletInfo.chainId !== contractChainId) {
    error('获得细胞信息失败', `请将metamask的chainId切换为${contractChainId}`);
    throw new Error(`请将metamask的chainId切换为${contractChainId}`);
  }
  etherClient.connectCellEvolutionContract();
  // etherClient.connectSigner();
  if (!etherClient.client) {
    error('获得细胞信息失败', `钱包异常`);
    throw new Error(`钱包异常`);
  }
  const {
    adaption,
    belong,
    cellno,
    creator,
    day,
    division,
    environment,
    finaltitle,
    id,
    surviveability,
    totalscore,
  } = await etherClient.client.getCellDB(BigNumber.from(cellId));

  const data: ICellData = {
    cell: (cellno as BigNumber).toNumber(),
    day: (day as BigNumber).toNumber(),
    env: (environment as BigNumber).toNumber(),
    reproduction: (division as BigNumber).toNumber(),
    adaptability: (adaption as BigNumber).toNumber(),
    survivability: (surviveability as BigNumber).toNumber(),
    id: (id as BigNumber).toString(),
    totalScore: (totalscore as BigNumber).toString(),
    finalTitle: finaltitle,
    creator,
    owner: (belong as BigNumber).toString(),
  };

  return data;
}
