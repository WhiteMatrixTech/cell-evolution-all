# cellerfork-contract
- [SDK package](./sdk/)
- [Sample Scripts](#sample-scripts)
- [RiverBox Dev](#riverbox-dev)
- [Admin SOP](#admin-sop)
- [Latest Contract Address](./logs-persis/deployment.json)

## Sample Scripts
### Install dependencies
```bash
yarn
```

### Compile contracts
```bash
yarn run hardhat compile
```

### Run lint 
```bash
yarn run lint
yarn run lint:fix
```

### Run format 
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
``` bash
LOAD_TASK=True yarn run hardhat cellEvolution:deploy --wait-num 1 --network localhost | tee -a ./logs/deployToLocal.log
```

### rinkeby

Deploy
``` bash
LOAD_TASK=True yarn run env-cmd -f ./envs/.env.eth.rinkeby yarn run hardhat cellEvolution:deploy --wait-num 1 --network rinkeby | tee -a ./logs/deployToLocal.log
```
verify
``` bash
LOAD_TASK=True yarn run env-cmd -f ./envs/.env.eth.rinkeby yarn run hardhat cellEvolution:verify --network rinkeby | tee -a ./logs/verifyRinkeby.log
```