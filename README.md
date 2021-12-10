# balancer-mono



## Our contribution
* We've build a monorepo for the Balancer's front-end dapp and all its packages. This allows developers to start working with Balancer's front-end and Smart Order Routing source code, with instant rebuild/reload tooling enabled. Orignial Balancer dapp imports most of the packages as node modules, making it hard to build on top of the Balacner's code base. 
* We've gathered all the necessary contracts in one a single repo (mutlicall, router, pool registry contracts). Previously, they were scattered around several different GitHub repos with no clear links between them, i.e. it was unclear what contracts are required, what versions were compatible, etc. Now everything is in complete synch and is deployment-ready.
* We've added Truffle deployment and configuration scripts for a turn-key launch of the Balancer on EVMos, including detailed tutorial on launching a single node local testnet. Previsously, there were only unit tests available as a source of information on how to deploy Balancer. 
* We've added an ERC20 Wrapped Photon contract to support trading Photons
* We've rewamped balance retrival mechanism that relied on a custom multicall with no source code available. Balancer uses a custom multicall contract, which is not in Balancer's Github repo. This is a major show stopper for deployment of Balancer to Evmos. Our fork does not require this contract anymore.
* 


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
