# cellerfork-contract

## Sample Scripts

### Install dependencies

```bash
yarn
```

### Compile contracts

```bash
yarn run hardhat compile
```

### test

```bash
yarn hardhat test
```

### Run coverage

```bash
yarn hardhat coverage
```

### Run lint

```bash
yarn run lint
yarn run lint:fix
```

### Run format

[ChainIDE-SOP](./pages/ChainIDE-SOP.md)

```bash
yarn run format
yarn run format:fix
```

### Generate types for SDK

```bash
yarn run hardhat typechain
```

### Hardhat start local test node

```bash
yarn run hardhat node --network hardhat --no-deploy --show-accounts
```

Deploy

```bash
yarn run hardhat cellEvolution:deploy --wait-num 1 --network localhost | tee -a ./logs/deployToLocal.log
```

### goerli

Deploy

```bash
yarn run env-cmd -f ./envs/.env.eth.goerli yarn run hardhat cellEvolution:deploy --wait-num 1 --network goerli | tee -a ./logs/deployToLocal.log
```

verify

```bash
yarn run env-cmd -f ./envs/.env.eth.goerli yarn run hardhat cellEvolution:verify --network goerli | tee -a ./logs/verifyGoerli.log
```
