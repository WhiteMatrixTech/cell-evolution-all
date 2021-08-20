/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import { contractChainId, etherClient } from '../../../../utils/etherClient';

import { BigNumber } from 'ethers';
import { error } from '../../../Dialog/Dialog';
import type { ICellData } from './cellInfo';

export interface IWorldInfo {
  day?: number;
  cell?: number;
  env?: number;
  reproduction?: number;
  adaptability?: number;
  survivability?: number;

  id?: string;
  totalScore?: string;
  worldTitle?: string;

  cells: ICellData[];
}

/**
 * 获得世界信息
 * @param gameData
 * @returns
 */
export async function getWorldInfo(id: string): Promise<IWorldInfo> {
  return new Promise((resolve, reject) => {
    doGetWorldInfo(id).then(resolve).catch(reject);
  });
}

export async function doGetWorldInfo(worldId: string) {
  await etherClient.loadProvider();
  const walletInfo = await etherClient.getWalletInfo();
  if (!walletInfo) {
    error('获得世界信息失败', '未获取到钱包信息');
    throw new Error('未获取到钱包信息');
  }
  if (walletInfo.chainId !== contractChainId) {
    error('获得世界信息失败', `请将metamask的chainId切换为${contractChainId}`);
    throw new Error(`请将metamask的chainId切换为${contractChainId}`);
  }
  etherClient.connectCellEvolutionContract();
  // etherClient.connectSigner();
  if (!etherClient.client) {
    error('获得世界信息失败', `钱包异常`);
    throw new Error(`钱包异常`);
  }
  const world = await etherClient.client.getCellHistory(BigNumber.from(worldId));

  const {
    id,
    cellno,
    adaption,
    surviveability,
    division,
    environment,
    day,
    worldtitle,
    totalscore,
    cellsdetail,
  } = world;

  const cells: ICellData[] = [];

  if (cellsdetail) {
    const cellsStr = cellsdetail.split('|');
    for (const cellStr of cellsStr) {
      if (cellStr) {
        const attrs = cellStr.split(',');
        if (attrs.length === 11) {
          const [id, creator, cell, ada, sur, rep, env, day, total, title, owner] = attrs;
          cells.push({
            id,
            creator,
            cell: parseInt(cell, 10),
            adaptability: parseInt(ada, 10),
            survivability: parseInt(sur, 10),
            reproduction: parseInt(rep, 10),
            env: parseInt(env, 10),
            day: parseInt(day, 10),
            totalScore: total,
            owner,
          });
        }
      }
    }
  }
  const detail: IWorldInfo = {
    id: (id as BigNumber)?.toString(),
    cell: (cellno as BigNumber)?.toNumber(),
    adaptability: (adaption as BigNumber)?.toNumber(),
    reproduction: (division as BigNumber)?.toNumber(),
    survivability: (surviveability as BigNumber)?.toNumber(),
    env: (environment as BigNumber)?.toNumber(),
    day: (day as BigNumber)?.toNumber(),
    totalScore: (totalscore as BigNumber)?.toString(),
    worldTitle: worldtitle,
    cells,
  };

  return detail;
}
