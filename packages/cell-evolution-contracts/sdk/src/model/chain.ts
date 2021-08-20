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

export interface ContractBuyResult {
  transactionHash: string;
  newTokenIds: BigNumber[];
}

export interface ContractFuseResult {
  transactionHash: string;
  newTokenId: BigNumber;
}

export interface ContractAwardedBoxEvent {
  payer: string;
  tokenId: BigNumber;
}

export interface ContractTokenDetail {
  locationId: number;
  fusionCount: number; // number of times used to fuse item
  airDropResourceId: number;
  signature: BigNumber; // item properties hash - uint256
  parts: BigNumber[]; // a list of token ids which are used to fuse this item
}

export interface ContractDealDetail {
  price: BigNumber;
  createdTime: BigNumber;
  seller: string;
  tokenId: BigNumber;
}

export interface ContractDealPostedEvent {
  dealId: BigNumber;
}

export interface ContractPostDealResult {
  dealId: BigNumber;
  transactionHash: string;
}
