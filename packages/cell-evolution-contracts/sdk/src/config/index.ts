export interface ContractInfo {
  address: string;
  impl: string;
}

export interface Deployment {
  operator: string;
  CellEvolution: ContractInfo;
}

export enum Network {
  localhost = 'localhost',
  confluxEspace = 'confluxEspace'
}

export interface CellEvolutionDeployment {
  [network: string]: Deployment;
}

import * as deploymentData from './deployment.json';
export const DeploymentInfo: CellEvolutionDeployment = deploymentData;
