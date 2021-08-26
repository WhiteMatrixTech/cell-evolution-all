import '@nomiclabs/hardhat-ethers';
import {task} from 'hardhat/config';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import pino from 'pino';
import {getPersisLogDir} from '../utils';
import fs from 'fs';
import {CellEvolutionDeployment} from '..';

const Logger = pino();

task('cellEvolution:verify', 'verify contract').setAction(
  async (args, hre: HardhatRuntimeEnvironment) => {
    // parse deployment configuration
    const persisLogDir = await getPersisLogDir();
    const deploymentLog = `${persisLogDir}/deployment.json`;
    const deploymentFull = JSON.parse(
      (await fs.promises.readFile(deploymentLog)).toString()
    ) as CellEvolutionDeployment;
    const deployment = deploymentFull[hre.network.name];
    Logger.info(`Use deployment information ${JSON.stringify(deployment)}`);
    // try to upgrade to new implementation
    try {
      await hre.run('verify:verify', {
        address: deployment.CellEvolution.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.log(error);
    }
  }
);
