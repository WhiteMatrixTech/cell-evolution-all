import chai, {expect} from 'chai';
import {ethers, network} from 'hardhat';
import {solidity} from 'ethereum-waffle';
import {BigNumber, ContractFactory, Contract, utils, Event} from 'ethers';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import pino from 'pino';

chai.use(solidity);
const Logger = pino();

describe('cellEvolution with Proxy', () => {
  let operator: SignerWithAddress;
  let accountA: SignerWithAddress;

  before('setup accounts', async () => {
    [operator, accountA] = await ethers.getSigners();
  });

  describe('test base Information', () => {
    let cellEvolution: Contract;
    let cellEvolutionFactory: ContractFactory;

    beforeEach('deploy and init contract', async () => {
      Logger.info('deploy cellEvolutionNewWorld proxy');
      cellEvolutionFactory = await ethers.getContractFactory(
        'CellEvolutionNewWorld'
      );

      cellEvolution = await cellEvolutionFactory.connect(operator).deploy();
      Logger.info(`deployed at ${cellEvolution.address}`);
    });

    it('check bases', async () => {
      await cellEvolution.newinheritance();
      expect(await cellEvolution.inheritanceno()).to.equal(1001);
      await cellEvolution.setIsOpen(false);
      expect(await cellEvolution.isOpen()).to.equal(false);
      await cellEvolution.setCellno(1);
      expect(await cellEvolution.totalcell()).to.equal(1);
      await cellEvolution.sethistoryno(1);
      expect(await cellEvolution.historyno()).to.equal(1);
      await cellEvolution.setVersion(1);
      expect(await cellEvolution.version()).to.equal(1);
      await cellEvolution.setHomeworld(1, 'new world');
      const cellHistroy1 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy1.worldtitle).to.equal('new world');
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1,
        adaption: 1,
        surviveability: 1,
        division: 1,
        environment: 1,
        day: 1,
        totalscore: 1,
        worldtitle: 'new world',
        startcellid: 1,
        endcellid: 1,
        cellsdetail: '',
        version: 1,
      });
      const cellHistroy2 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy2.id).equal(1);
      expect(cellHistroy2.cellno).equal(1);
      expect(cellHistroy2.adaption).equal(1);
      expect(cellHistroy2.surviveability).equal(1);
      expect(cellHistroy2.division).equal(1);
      expect(cellHistroy2.environment).equal(1);
      expect(cellHistroy2.day).equal(1);
      expect(cellHistroy2.totalscore).equal(1);
      expect(cellHistroy2.worldtitle).equal('new world');
      expect(cellHistroy2.startcellid).equal(1);
      expect(cellHistroy2.endcellid).equal(1);
      expect(cellHistroy2.cellsdetail).equal('');
      expect(cellHistroy2.version).equal(1);
      await cellEvolution.writecell({
        id: 1,
        creator: operator.address,
        cellno: 1,
        adaption: 1,
        surviveability: 1,
        division: 1,
        environment: 1,
        day: 1,
        totalscore: 1,
        finaltitle: '',
        belong: 1,
        version: 1,
      });
      const cellDB = await cellEvolution.getCellDB(1);
      expect(cellDB.id).equal(1);
      expect(cellDB.creator).equal(operator.address);
      expect(cellDB.cellno).equal(1);
      expect(cellDB.adaption).equal(1);
      expect(cellDB.surviveability).equal(1);
      expect(cellDB.division).equal(1);
      expect(cellDB.environment).equal(1);
      expect(cellDB.day).equal(1);
      expect(cellDB.totalscore).equal(1);
      expect(cellDB.finaltitle).equal('');
      expect(cellDB.belong).equal(1);
      expect(cellDB.version).equal(1);
    });

    it('check dnamerge', async () => {
      await cellEvolution.setIsOpen(false);
      await expect(
        cellEvolution.dnamerge(1, 1, 1, 1, 1, 1, 1, 1, '1')
      ).to.revertedWith('Game is currently closed');
      await cellEvolution.setIsOpen(true);
      await expect(
        cellEvolution.dnamerge(0, 1, 1, 1, 1, 1, 1, 1, '1')
      ).to.revertedWith('empty id');
      await cellEvolution.dnamerge(1, 1, 1, 1, 1, 1, 1, 1, '1');
      const cellHistroy = await cellEvolution.getCellHistory(1);

      expect(cellHistroy.id).equal(BigNumber.from(1));
      expect(cellHistroy.cellno).equal(BigNumber.from(1));
      expect(cellHistroy.adaption).equal(BigNumber.from(1));
      expect(cellHistroy.surviveability).equal(BigNumber.from(1));
      expect(cellHistroy.division).equal(BigNumber.from(1));
      expect(cellHistroy.environment).equal(BigNumber.from(1));
      expect(cellHistroy.day).equal(BigNumber.from(1));
      expect(cellHistroy.totalscore).equal(BigNumber.from(1));
      expect(cellHistroy.worldtitle).equal('evolutionary world');
      expect(cellHistroy.startcellid).equal(BigNumber.from(0));
      expect(cellHistroy.endcellid).equal(BigNumber.from(1));
      expect(cellHistroy.cellsdetail).equal(
        `1,${operator.address.toLowerCase()},1,1,1,1,1,1,1,1,1|`
      );
      expect(cellHistroy.version).equal(BigNumber.from(0));

      await expect(
        cellEvolution.dnamerge(1, 1, 1, 1, 1, 1, 1, 1, '1')
      ).to.revertedWith('system error');
    });

    it('check Admin only', async () => {
      await expect(
        cellEvolution.connect(accountA).setIsOpen(true)
      ).to.revertedWith('Admin only');
      await expect(
        cellEvolution.connect(accountA).setCellno(1)
      ).to.revertedWith('Admin only');
      await expect(
        cellEvolution.connect(accountA).sethistoryno(1)
      ).to.revertedWith('Admin only');
      await expect(
        cellEvolution.connect(accountA).setVersion(1)
      ).to.revertedWith('Admin only');
      await expect(
        cellEvolution.connect(accountA).setHomeworld(1, 'new world')
      ).to.revertedWith('Admin only');
      await expect(
        cellEvolution.connect(accountA).writeworld({
          id: 1,
          cellno: 1,
          adaption: 1,
          surviveability: 1,
          division: 1,
          environment: 1,
          day: 1,
          totalscore: 1,
          worldtitle: 'new world',
          startcellid: 1,
          endcellid: 1,
          cellsdetail: '',
          version: 1,
        })
      ).to.revertedWith('Admin only');
      await expect(
        cellEvolution.connect(accountA).writecell({
          id: 1,
          creator: accountA.address,
          cellno: 1,
          adaption: 1,
          surviveability: 1,
          division: 1,
          environment: 1,
          day: 1,
          totalscore: 1,
          finaltitle: '',
          belong: 1,
          version: 1,
        })
      ).to.revertedWith('Admin only');
    });

    it('check checkdeath', async () => {
      await cellEvolution.checkdeath(1,1,1,1);
      expect(await cellEvolution.historyno()).equal(1);
      await cellEvolution.checkdeath(10001,1,1,1);
      expect(await cellEvolution.historyno()).equal(1);
      await cellEvolution.checkdeath(10001,1,100,100);
      expect(await cellEvolution.historyno()).equal(2);
      const cellHistroy = await cellEvolution.getCellHistory(2);
      expect(cellHistroy.id).equal(2);
      expect(cellHistroy.worldtitle).equal('evolutionary world');
      expect(cellHistroy.startcellid).equal(1);
    });

    it('check inheritance', async () => {
      const inheritance1=await cellEvolution.inheritance();
      expect(inheritance1[0]).lt(10);
      expect(inheritance1[1]).lt(10);
      expect(inheritance1[2]).lt(10);
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1,
        adaption: 100000001,
        surviveability: 100000001,
        division: 100000001,
        environment: 1,
        day: 1,
        totalscore: 1,
        worldtitle: 'new world',
        startcellid: 1,
        endcellid: 1,
        cellsdetail: '',
        version: 1,
      })
      const inheritance2=await cellEvolution.inheritance();
      expect(inheritance2[0]).lt(50);
      expect(inheritance2[1]).lt(50);
      expect(inheritance2[2]).lt(50);
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1,
        adaption: 1000000001,
        surviveability: 1000000001,
        division: 1000000001,
        environment: 1,
        day: 1,
        totalscore: 1,
        worldtitle: 'new world',
        startcellid: 1,
        endcellid: 1,
        cellsdetail: '',
        version: 1,
      })
      const inheritance3=await cellEvolution.inheritance();
      expect(inheritance3[0]).lt(100);
      expect(inheritance3[1]).lt(100);
      expect(inheritance3[2]).lt(100);
    });

    it('check worldtitlecheck', async () => {
      await cellEvolution.worldtitlecheck();
      const cellHistroy1 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy1.worldtitle).to.equal('quiet low adaptation low survival low reproduction low environmental resistance human world');
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1,
        adaption: 1000000001,
        surviveability: 1000000002,
        division: 1000000001,
        environment: 501,
        day: 5001,
        totalscore: 1,
        worldtitle: '',
        startcellid: 0,
        endcellid: 51,
        cellsdetail: '',
        version: 1,
      })
      await cellEvolution.worldtitlecheck();
      const cellHistroy2 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy2.worldtitle).to.equal('hot normal adaptation normal survival normal reproduction normal environmental resistance spiritual world');
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1000000000001,
        adaption: 10000000001,
        surviveability: 10000000002,
        division: 10000000001,
        environment: 1001,
        day: 1000,
        totalscore: 1,
        worldtitle: '',
        startcellid: 0,
        endcellid: 101,
        cellsdetail: '',
        version: 1,
      })
      await cellEvolution.worldtitlecheck();
      const cellHistroy3 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy3.worldtitle).to.equal('high evolution advanced adaptation high survival high reproduction high environmental resistance zerg world');
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1000000000001,
        adaption: 10000000001,
        surviveability: 100000000001,
        division: 10000000001,
        environment: 1001,
        day: 1000,
        totalscore: 1,
        worldtitle: '',
        startcellid: 0,
        endcellid: 101,
        cellsdetail: '',
        version: 1,
      })
      await cellEvolution.worldtitlecheck();
      const cellHistroy4 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy4.worldtitle).to.equal('high evolution advanced adaptation high survival high reproduction high environmental resistance mechanical world');
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1000000000001,
        adaption: 10000000001,
        surviveability: 10000000001,
        division: 100000000001,
        environment: 1001,
        day: 1000,
        totalscore: 1,
        worldtitle: '',
        startcellid: 0,
        endcellid: 101,
        cellsdetail: '',
        version: 1,
      })
      await cellEvolution.worldtitlecheck();
      const cellHistroy5 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy5.worldtitle).to.equal('high evolution advanced adaptation high survival high reproduction high environmental resistance ocean world');
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1000000000001,
        adaption: 100000000001,
        surviveability: 10000000001,
        division: 10000000001,
        environment: 1001,
        day: 1000,
        totalscore: 1,
        worldtitle: '',
        startcellid: 0,
        endcellid: 101,
        cellsdetail: '',
        version: 1,
      })
      await cellEvolution.worldtitlecheck();
      const cellHistroy6 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy6.worldtitle).to.equal('high evolution advanced adaptation high survival high reproduction high environmental resistance rock world');
      await cellEvolution.writeworld({
        id: 1,
        cellno: 1000000000001,
        adaption: 10000000001,
        surviveability: 10000000001,
        division: 10000000001,
        environment: 1001,
        day: 5001,
        totalscore: 1,
        worldtitle: '',
        startcellid: 0,
        endcellid: 101,
        cellsdetail: '',
        version: 1,
      })
      await cellEvolution.worldtitlecheck();
      const cellHistroy7 = await cellEvolution.getCellHistory(1);
      expect(cellHistroy7.worldtitle).to.equal('high evolution advanced adaptation high survival high reproduction high environmental resistance gaia world');
    });
  });
});
