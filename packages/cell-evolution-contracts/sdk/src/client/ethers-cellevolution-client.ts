import { Provider } from '@ethersproject/providers';
import { BigNumber, PayableOverrides, Signer } from 'ethers';
import { CellEvolutionClient } from './cellevolution-client';
import {
  CellHistory,
  CellEvolution as _CellEvolution
} from '../model/chain';
import {
  CellEvolutionNewWorld as CellEvolution,
  CellEvolutionNewWorld__factory as CellEvolution__factory
} from '../typechain';

// TODO: implement all interface once the contract is ready
// export class EtherClient implements IClient {
export class EtherCellEvolutionClient implements CellEvolutionClient {
  private cellEvolution: CellEvolution | undefined;
  private provider: Provider | undefined;
  private signer: Signer | undefined;
  private _waitConfirmations = 5;

  public connectProvider(
    address: string,
    provider: Provider
  ): CellEvolutionClient {
    this.provider = provider;
    this.cellEvolution = CellEvolution__factory.connect(address, this.provider);
    return this;
  }

  public connectSigner(signer: Signer): CellEvolutionClient {
    this.signer = signer;
    return this;
  }

  public setWaitConfirmations(num: number): void {
    this._waitConfirmations = num;
  }

  public contract(): Promise<CellEvolution> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return Promise.resolve(this.cellEvolution);
  }

  public inheritance(config?: PayableOverrides): Promise<Array<BigNumber>> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.inheritance({ ...config });
  }

  public getCellHistory(
    cellHistoryId: BigNumber,
    config?: PayableOverrides
  ): Promise<CellHistory> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.getCellHistory(cellHistoryId, { ...config });
  }

  public getCellDB(
    cellDBId: BigNumber,
    config?: PayableOverrides
  ): Promise<_CellEvolution> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.getCellDB(cellDBId, { ...config });
  }

  public isOpen(config?: PayableOverrides): Promise<boolean> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.isOpen({ ...config });
  }

  public admAdd(config?: PayableOverrides): Promise<string> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.admAdd({ ...config });
  }

  public totalcell(config?: PayableOverrides): Promise<BigNumber> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.totalcell({ ...config });
  }

  public historyno(config?: PayableOverrides): Promise<BigNumber> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.historyno({ ...config });
  }

  public version(config?: PayableOverrides): Promise<BigNumber> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.version({ ...config });
  }

  public inheritanceno(config?: PayableOverrides): Promise<BigNumber> {
    if (this.provider === undefined || this.cellEvolution === undefined) {
      return Promise.reject('need to connect a valid provider');
    }
    return this.cellEvolution.inheritanceno({ ...config });
  }

  public async setIsOpen(
    isopen: boolean,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.setIsOpen(isopen, { ...config });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .setIsOpen(isopen, { gasLimit: gas.mul(13).div(10), ...config });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }

  public async setCellno(
    cellno: BigNumber,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.setCellno(cellno, { ...config });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .setCellno(cellno, { gasLimit: gas.mul(13).div(10), ...config });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }

  public async sethistoryno(
    historyno: BigNumber,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.sethistoryno(historyno, { ...config });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .setCellno(historyno, { gasLimit: gas.mul(13).div(10), ...config });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }
  public async setVersion(
    versionno: BigNumber,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.setVersion(versionno, { ...config });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .setVersion(versionno, { gasLimit: gas.mul(13).div(10), ...config });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }
  public async setHomeworld(
    worldId: BigNumber,
    newtitle: string,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.setHomeworld(worldId, newtitle, { ...config });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .setHomeworld(worldId, newtitle, {
        gasLimit: gas.mul(13).div(10),
        ...config
      });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }

  public async writeworld(
    cellHistory:CellHistory,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.writeworld(
        cellHistory,
        { ...config }
      );
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .writeworld(
        cellHistory,
        { gasLimit: gas.mul(13).div(10), ...config }
      );
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }

  public async writecell(
    cellEvolution:_CellEvolution,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.writecell(
        cellEvolution,
        { ...config }
      );
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .writecell(
        cellEvolution,
        { gasLimit: gas.mul(13).div(10), ...config }
      );
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }

  public async dnamerge(
    id: BigNumber,
    cellno: BigNumber,
    adaption: BigNumber,
    surviveability: BigNumber,
    division: BigNumber,
    environment: BigNumber,
    day: BigNumber,
    totoalscore: BigNumber,
    finaltitle: string,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.dnamerge(
        id,
        cellno,
        adaption,
        surviveability,
        division,
        environment,
        day,
        totoalscore,
        finaltitle,
        { ...config }
      );
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .dnamerge(
        id,
        cellno,
        adaption,
        surviveability,
        division,
        environment,
        day,
        totoalscore,
        finaltitle,
        { gasLimit: gas.mul(13).div(10), ...config }
      );
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }
  public async newinheritance(config: PayableOverrides = {}): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.newinheritance({ ...config });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .newinheritance({ gasLimit: gas.mul(13).div(10), ...config });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }

  public async worldtitlecheck(config: PayableOverrides = {}): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.worldtitlecheck({ ...config });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .worldtitlecheck({ gasLimit: gas.mul(13).div(10), ...config });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }

  public async checkdeath(
    cellno: BigNumber,
    adaption: BigNumber,
    surviveability: BigNumber,
    division: BigNumber,
    config: PayableOverrides = {}
  ): Promise<any> {
    if (
      this.provider === undefined ||
      this.cellEvolution === undefined ||
      this.signer === undefined
    ) {
      return Promise.reject('need to connect a valid provider and signer');
    }
    const gas = await this.cellEvolution
      .connect(this.signer)
      .estimateGas.checkdeath(cellno, adaption, surviveability, division, {
        ...config
      });
    const transaction = await this.cellEvolution
      .connect(this.signer)
      .checkdeath(cellno, adaption, surviveability, division, {
        gasLimit: gas.mul(13).div(10),
        ...config
      });
    const receipt = await transaction.wait(this._waitConfirmations);
    return receipt;
  }
}