![image](https://user-images.githubusercontent.com/4420479/145579509-a72060c0-7728-4d74-b808-74ea231dd31f.png)
# balancer-mono

**Evmos** is a scalable and interoperable Ethereum, built on Proof-of-Stake with fast-finality.

**Balancer** is an automated, on-chain portfolio manager and liquidity provider. Balancer is based on an N-dimensional invariant surface which is a generalization of the constant product formula described by Vitalik Buterin.

This project introduces battle-proven Balancer Bronze realease to the Evmos ecosystem. In a nutshell, it is **off-the-shelf stack for rapid prototyping of DeFi protocols on EVMos**, giving developers access to state-of-the-art core functionality of Balancer, without non-essential feautures such as advanced gas optimizations. Our ultimate goal is to **enable builders in EVMos community to jump start their own DeFi products for Evmos, using secure, audited and well-tested Balancer's codebase**. 

## Summary of main contributions
* We've build a monorepo for the Balancer's front-end dapp and all its packages. This allows EVMos builders' community to start working with Balancer's front-end and Smart Order Routing source code, with instant rebuild/reload tooling enabled. Orignial Balancer dapp imports most of the packages as node modules, making it hard to build on top of the Balacner's code base. 
* We've gathered all the necessary contracts in one a single repo (mutlicall, router, pool registry contracts). Previously, they were scattered around several different GitHub repos with no clear links between them, i.e. it was unclear what contracts are required, what versions were compatible, etc. Now everything is in complete synch and is deployment-ready.
* We've added Truffle deployment and configuration scripts for a turn-key launch of the Balancer on Evmos, including detailed tutorial on launching a single node local testnet. Previsously, there were only unit tests available as a source of information on how to deploy Balancer. 
* We've added an ERC20 Wrapped Photon contract to support trading Photons, a native EVMos token.
* We've rewamped balance retrival mechanism that relied on a custom multicall with no source code available. Balancer uses a custom multicall contract, which is not in Balancer's Github repo. This is a major show stopper for deployment of Balancer to Evmos. Our fork does not require this contract anymore.
* We've introduced a spaceship to the frontpage to motivate you to build the next-big-DeFi protocol for Evmos ☺️

# Configuring and running Balancer locally

Install and build Evmos (Evmos is built using Go version 1.17+):

``git clone https://github.com/tharsis/evmos.git
cd evmos
make install``

Check that the evmosd binaries have been successfully installed:

`evmosd version`


./evmosd init testing --chain-id=evmos_9000-99 --home=./local

./evmosd keys add my_validator --keyring-backend=test --home=./local
./evmosd keys add user1 --keyring-backend=test --home=./local
./evmosd keys add user2 --keyring-backend=test --home=./local
./evmosd keys add user3 --keyring-backend=test --home=./local


# Building and Running Front-end
## Build

```
npm install --global lerna
lerna bootstrap
```

## Run
```
cd packages/balancer-frontend
npm run serve
```
