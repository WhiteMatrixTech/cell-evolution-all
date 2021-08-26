# ChainIDE-SOP

## 安装
```bash
yarn
```

## 编译
```bash
yarn hardhat compile
```

## 测试
```bash
yarn hardhat test
```

## 部署

### 配置env

eth私钥：[https://www.107000.com/T-ETH](https://www.107000.com/T-ETH)

infura的APIKEY：[https://infura.io/dashboard/ethereum](https://infura.io/dashboard/ethereum)

etherscan的APIKEY：[https://etherscan.io/myapikey](https://etherscan.io/myapikey)

新建文件`envs/.env.eth.rinkeby`,输入以下内容：
```bash
PRIVATE_KEY=${eth私钥}
RINKEBY_INFURA=${infura的APIKEY}
APIKEY=${etherscan的APIKEY}
```

### 运行脚本

```bash
yarn run env-cmd -f ./envs/.env.eth.rinkeby yarn run hardhat cellEvolution:deploy --wait-num 1 --network rinkeby | tee -a ./logs/deployToLocal.log
```

## 发布sdk
### 配置

注册npm账号：[https://www.npmjs.com/](https://www.npmjs.com/)

注意要验证邮箱。

修改`sdk/package.json`

```bash
  "name": "@${npm账号名}/cellevolution-sdk",
  "version": "${版本号}",
  "author": "${npm账号名}",
```

### 编译sdk

```bash
cd sdk
yarn build
```

### 发布sdk

```bash
npm adduser
yarn publish
```