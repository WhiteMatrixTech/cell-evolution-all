import { BigNumber } from 'ethers';

export interface CellHistory {
  id: BigNumber;
  cellno: BigNumber;
  adaption: BigNumber;
  surviveability: BigNumber;
  division: BigNumber;
  environment: BigNumber;
  day: BigNumber;
  totalscore: BigNumber;
  worldtitle: string;
  startcellid: BigNumber;
  endcellid: BigNumber;
  cellsdetail:string;
  version: BigNumber;
}

export interface CellEvolution {
  id: BigNumber;
  creator: string;
  cellno: BigNumber;
  adaption: BigNumber;
  surviveability: BigNumber;
  division: BigNumber;
  environment: BigNumber;
  day: BigNumber;
  totalscore: BigNumber;
  finaltitle: string;
  belong: BigNumber;
  version: BigNumber;
}
