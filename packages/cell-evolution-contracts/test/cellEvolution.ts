import chai, {expect} from 'chai';
import {ethers, upgrades, network} from 'hardhat';
import {solidity} from 'ethereum-waffle';
import {BigNumber, ContractFactory, utils, Event} from 'ethers';
import {CellEvolutionNewWorld} from '../sdk/src/typechain';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import pino from 'pino';

chai.use(solidity);
const ONE_ETH = utils.parseEther('1');
const Logger = pino();

describe('RiverBoxImpl with Proxy', () => {
  let operator: SignerWithAddress;
  let accountA: SignerWithAddress;
  let accountB: SignerWithAddress;
  let accountC: SignerWithAddress;
  let RiverBoxFactory: ContractFactory;
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

  before('setup accounts', async () => {
    [operator, accountA, accountB, accountC] = await ethers.getSigners();
  });

  describe('test base Information', () => {
    let cellEvolution: CellEvolutionNewWorld;

    beforeEach('deploy and init contract', async () => {
      Logger.info('deploy cellEvolutionNewWorld proxy');
      cellEvolution = (await (
        await ethers.getContractFactory('CellEvolutionNewWorld')
      )
        .connect(operator)
        .deploy()) as unknown as CellEvolutionNewWorld;
      Logger.info(`deployed at ${cellEvolution.address}`);
    });

    it('check', async () => {
      await cellEvolution.dnamerge(1,1,1,1,1,1,1,1,"1");
      console.log(await cellEvolution.getCellHistory(0))
      console.log(await cellEvolution.getCellHistory(1))
    });
  });
});
