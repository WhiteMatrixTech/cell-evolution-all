import {HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-contract-sizer';
import '@openzeppelin/hardhat-upgrades';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import './tasks';
import dotenv from 'dotenv';

dotenv.config();
const privateKey = process.env.PRIVATE_KEY;
let accounts = [`${privateKey}`];

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      accounts,
      timeout: 60000,
      blockGasLimit: 60000000,
    },
    confluxEspace: {
      url: 'https://evmtestnet.confluxrpc.com',
      chainId: 71,
      accounts,
      timeout: 60000,
    },
  },
  namedAccounts: {
    deployer: 0,
    accountA: 1,
    accountB: 2,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  gasReporter: {
    currency: 'CHF',
    gasPrice: 1,
  },
  typechain: {
    outDir: './sdk/src/typechain',
    target: 'ethers-v5',
  },
};
export default config;
