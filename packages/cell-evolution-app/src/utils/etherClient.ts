/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { CellEvolutionClient } from '@white-matrix/cellevolution-sdk';
import { cellEvolutionProvider, DeploymentInfo, Network } from '@white-matrix/cellevolution-sdk';
import { ethers } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { Emitter } from '@white-matrix/event-emitter';

const CELL_EVOLUTION_CONTRACT_ADDRESS = DeploymentInfo[Network.rinkeby].CellEvolution.address;

export interface IWalletInfo {
  address: string;
  networkName: string;
  chainId: number;
  balance: string;
}
// rinkeby id
export const contractChainId = 4;
export const contractChainName = 'rinkeby';

class EtherClient {
  cellEvolutionContractAddress: string;
  winProvider?: any;
  provider?: Web3Provider;
  client?: CellEvolutionClient;
  readonly onAccountsDidChange = new Emitter<string[]>();
  onAccountsChange = this.onAccountsDidChange.event;

  constructor(cellEvolutionContractAddress: string) {
    this.cellEvolutionContractAddress = cellEvolutionContractAddress;
  }

  async loadProvider() {
    if (this.provider) {
      return;
    }
    this.winProvider = await detectEthereumProvider();
    if (this.winProvider) {
      // change event bind
      this.winProvider.on('accountsChanged', (accounts: string[]) => {
        this.onAccountsDidChange.fire(accounts);
      });
      this.winProvider.on('chainChanged', () => {
        window.location.reload();
      });
      this.provider = new ethers.providers.Web3Provider(this.winProvider);
      return;
    }
    throw new Error('there are no eth provider.');
  }

  async getWalletInfo(): Promise<IWalletInfo | undefined> {
    if (this.provider) {
      await this.winProvider.request({ method: 'eth_requestAccounts' });
      const address = await this.provider.getSigner().getAddress();
      const balance = await this.provider.getBalance(address);
      const network = await this.provider.getNetwork();
      return {
        address,
        networkName: network.name,
        chainId: network.chainId,
        balance: ethers.utils.formatEther(balance),
      };
    }
    throw new Error('get wallet info failed');
  }

  connectCellEvolutionContract() {
    if (this.provider) {
      this.client = cellEvolutionProvider(false);
      this.client.connectProvider(this.cellEvolutionContractAddress, this.provider);
      this.client.setWaitConfirmations(1);
    }
  }

  connectSigner() {
    if (this.client && this.provider) {
      this.client.setWaitConfirmations(1);
      const signer = this.provider.getSigner();
      this.client.connectSigner(signer);
    }
  }

  resetClientConfirmations() {
    if (this.client) {
      this.client.setWaitConfirmations(1); // set number of confirmations to wait default is 5 blocks
    }
  }
}

export const etherClient = new EtherClient(CELL_EVOLUTION_CONTRACT_ADDRESS);
