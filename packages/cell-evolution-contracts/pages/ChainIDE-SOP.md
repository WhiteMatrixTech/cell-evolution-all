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

### 配置 env

eth 私钥：[https://www.107000.com/T-ETH](https://www.107000.com/T-ETH)

infura 的 APIKEY：[https://infura.io/dashboard/ethereum](https://infura.io/dashboard/ethereum)

etherscan 的 APIKEY：[https://etherscan.io/myapikey](https://etherscan.io/myapikey)

新建文件`envs/.env.eth.goerli`,输入以下内容：

```bash
PRIVATE_KEY=${eth私钥}
RINKEBY_INFURA=${infura的APIKEY}
APIKEY=${etherscan的APIKEY}
```

### 运行脚本

```bash
yarn run env-cmd -f ./envs/.env.eth.goerli yarn run hardhat cellEvolution:deploy --wait-num 1 --network goerli | tee -a ./logs/deployToLocal.log
```

## 发布 sdk

### 配置

注册 npm 账号：[https://www.npmjs.com/](https://www.npmjs.com/)

注意要验证邮箱。

修改`sdk/package.json`

```bash
  "name": "@${npm账号名}/cellevolution-sdk",
  "version": "${版本号}",
  "author": "${npm账号名}",
```

### 编译 sdk

```bash
cd sdk
yarn build
```

### 发布 sdk

```bash
npm adduser
yarn publish
```
