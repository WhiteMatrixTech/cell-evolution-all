export * from './deployment/deploy';
export * from './verify/verify-cellevolution';

export interface ContractInfo {
  address: string;
  impl: string;
}

export interface Deployment {
  operator: string;
  CellEvolution: ContractInfo;
}

export interface RiverBoxDeployment {
  [network: string]: Deployment;
}
