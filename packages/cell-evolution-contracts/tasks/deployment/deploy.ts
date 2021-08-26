import '@nomiclabs/hardhat-ethers';
import {task} from 'hardhat/config';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import pino from 'pino';
import fs from 'fs';
import {Deployment, CellEvolutionDeployment} from '..';
import {PayableOverrides} from 'ethers';
import {getPersisLogDir, AutoTry} from '../utils';

const Logger = pino();
const taskName = 'cellEvolution:deploy';

task(taskName, 'Deploy cellEvolution upgradeable')
  .addParam('waitNum', 'The waitNum to transaction')
  .setAction(async (args, hre: HardhatRuntimeEnvironment) => {
    // check log-persis folder
    const autoTry = new AutoTry(taskName);
    await autoTry.load();
    const waitNum = parseInt(args['waitNum']);
    const txConfig: PayableOverrides = {};
    const deploymentLog = `${await getPersisLogDir()}/deployment.json`;
    let deploymentFull: CellEvolutionDeployment = {};
    if (fs.existsSync(deploymentLog)) {
      deploymentFull = JSON.parse(
        (await fs.promises.readFile(deploymentLog)).toString()
      );
    }

    Logger.info('deploy CellEvolutionNewWorld');

    const CellEvolutionFactory = await hre.ethers.getContractFactory(
      'CellEvolutionNewWorld'
    );

    const deployCellEvolutionResult = await autoTry.transaction(
      CellEvolutionFactory.deploy.bind(CellEvolutionFactory),
      [],
      ['contractAddress'],
      'deploy CellEvolution',
      txConfig,
      waitNum,
      true
    );
    Logger.info(
      `cellEvolution deployed at ${deployCellEvolutionResult.contractAddress}`
    );
    const cellEvolution = CellEvolutionFactory.attach(
      deployCellEvolutionResult.contractAddress
    );
    const operator = (await hre.ethers.getSigners())[0];

    const deployment: Deployment = {
      operator: operator.address,
      CellEvolution: {
        address: cellEvolution.address,
        impl: 'CellEvolutionNewWorld',
      }
    };
    // persis log
    deploymentFull[hre.network.name] = deployment;
    await fs.promises.writeFile(
      deploymentLog,
      JSON.stringify(deploymentFull, undefined, 2)
    );
  });
