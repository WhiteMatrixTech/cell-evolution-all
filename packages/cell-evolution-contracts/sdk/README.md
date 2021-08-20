## SDK Package
[![npm version](https://badge.fury.io/js/blindbox-sdk.svg)](https://badge.fury.io/js/blindbox-sdk)

- [SDK Package](#sdk-package)
- [Install](#install)
- [Browser with Metamask](#browser-with-metamask)
- [Node with Ethers Provider](#node-with-ethers-provider)
- [API Reference:](#api-reference)
  - [Interface](#interface)
    - [RiverBox Interface](#riverbox-interface)
  - [MockClient Example](#mockclient-example)
- [SDK-Package:](#sdk-package-1)
  - [Build:](#build)
  - [Test:](#test)
  - [Publish:](#publish)

## Install
```bash
yarn add @white-matrix/cellevolution-sdk
```

## API Reference:
### Interface
#### RiverBox Interface
[riverbox-client.ts](./src/client/riverbox-client.ts)
```typescript
export interface CellEvolutionClient {
  connectProvider(address: string, provider: Provider): CellEvolutionClient;

  connectSigner(signer: Signer): CellEvolutionClient;

  setWaitConfirmations(num: number): void;

  /* Backup interface
   * @return CellEvolution typechain interface for  CellEvolution contract
   */
  cellEvolutionContract?(): Promise<CellEvolutionNewWorld>;

  inheritance(config?: PayableOverrides): Promise<Array<BigNumber>>;

  getCellHistory(
    cellHistoryId: BigNumber,
    config?: PayableOverrides
  ): Promise<CellHistory>;

  getCellDB(cellDBId: BigNumber, config?: PayableOverrides): Promise<_CellEvolution>;

  isOpen(config?: PayableOverrides): Promise<boolean>;

  admAdd(config?: PayableOverrides): Promise<string>;

  totalcell(config?: PayableOverrides): Promise<BigNumber>;

  historyno(config?: PayableOverrides): Promise<BigNumber>;

  version(config?: PayableOverrides): Promise<BigNumber>;

  inheritanceno(config?: PayableOverrides): Promise<BigNumber>;

  setIsOpen(isopen: boolean, config: PayableOverrides): Promise<any>;

  setCellno(cellno: BigNumber, config: PayableOverrides): Promise<any>;

  sethistoryno(historyno: BigNumber, config: PayableOverrides): Promise<any>;

  setVersion(versionno: BigNumber, config: PayableOverrides): Promise<any>;

  setHomeworld(
    worldId: BigNumber,
    newtitle: string,
    config: PayableOverrides
  ): Promise<any>;

  writeworld(
    cellHistory:CellHistory,
    config: PayableOverrides
  ): Promise<any>;

  writecell(
    cellEvolution:_CellEvolution,
    config: PayableOverrides
  ): Promise<any>;

  dnamerge(
    id: BigNumber,
    cellno: BigNumber,
    adaption: BigNumber,
    surviveability: BigNumber,
    division: BigNumber,
    environment: BigNumber,
    day: BigNumber,
    totoalscore: BigNumber,
    finaltitle: string,
    config: PayableOverrides
  ): Promise<any>;

  newinheritance(config: PayableOverrides): Promise<any>;

  worldtitlecheck(config: PayableOverrides): Promise<any>;

  checkdeath(
    cellno: BigNumber,
    adaption: BigNumber,
    surviveability: BigNumber,
    division: BigNumber,
    config: PayableOverrides
  ): Promise<any>;
}
```

## SDK-Package:

### Build:
```bash
yarn run build
```

### Test:
Start local hardhat node first and deploy the contract
```bash
CONTRACT_ADDRESS={ADDRESS} yarn run test
```

### Publish:
Recommend to use yarn's publish command to publish the pacakge
```bash
yarn publish
```
