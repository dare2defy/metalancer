# balancer-mono

## Changes made
* We've gathered all the necessary contracts in one a single repo (mutlicall, router, pool registry contracts). Previously, they were scattered around several different GitHub repos with no clear links between them. 
* 
* We've added an ERC20 Wrapped Photon contract to support trading Photons
* We've re-written of on-chain balance retrival mechanism that relied on a custom multicall with no source code available. Balancer uses a custom multicall contract, which is not in Balancer's Github repo. This is a major show stopper for deployment of Balancer to Evmos. Our fork does not require this contract anymore.
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
