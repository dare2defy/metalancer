# balancer-mono

## Changes made
* Re-write of calls to Balancer's custom multicall contract that had no source code available. Balancer uses a custom multicall contract, which is not in Balancer's Github repo. This is a major show stopper for deployment of Balancer to Evmos. Our fork does not require this contract anymore.
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
