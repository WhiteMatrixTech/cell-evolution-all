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
let mnemonic = process.env.MNEMONIC;
const privateKey = process.env.PRIVATE_KEY;
let accounts;

if (privateKey) {
  accounts = [privateKey];
} else {
  if (!mnemonic) {
    // FOR DEV ONLY, SET IT IN .env files if you want to keep it private
    // (IT IS IMPORTANT TO HAVE A NON RANDOM MNEMONIC SO THAT SCRIPTS CAN ACT ON THE SAME ACCOUNTS)
    mnemonic = 'test test test test test test test test test test test junk';
  }
  accounts = {
    mnemonic,
  };
}

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
    hardhat: {
      accounts: {
        mnemonic,
        accountsBalance: '100000000000000000000000000',
      },
      blockGasLimit: 60000000,
      initialBaseFeePerGas: 0,
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts,
      timeout: 60000,
      blockGasLimit: 60000000,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts,
      timeout: 60000,
    },
  },
  etherscan: {
    apiKey: process.env.APIKEY,
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
