<p align="center">
  <a href="https://chainide.com">
    <img width="200" src="https://chainide-static-resource.s3.us-west-2.amazonaws.com/cell-evolution-logo.svg">
  </a>
</p>

<h1 align="center">细胞进化</h1>

<div align="center">

细胞进化是第一款基于区块链的去中心化的沙盒经营策略游戏，所有的玩家扮演一个细胞族群。在这个族群里，我们需要平衡我们总体的适应性，生存性与繁殖性。当我们的细胞族群的方向失衡，我们整体将会进化失败。这不仅仅是个游戏，也是个真正的社会群体实验。你在这里扮演了一个原始细胞，而无数个你将会决定我们共同的命运。接下来，开启的进化之旅！

</div>

## ⏬ 安装 git
```
apk add git
```

## ⏬ 下载源码

```bash
git clone https://github.com/WhiteMatrixTech/cell-evolution-all.git
```

## 📦 安装依赖

```bash
cd cell-evolution-all
```

```bash
yarn
```

## 设置部署账户privatekey

在 `packages/cell-evolution-contracts/.env` 文件中, 填写privateKey

```
PRIVATE_KEY=XXX
```

## 💻 编译合约
```
yarn compile:contract
```

## 💻 发布合约
```
yarn deploy:contract
```

## 💻 打包sdk
```
yarn build:sdk
```

## 🧿 开发dapp
```
yarn start:webapp
```