# balancer-mono

## Changes made
* Replaced Balancer's custom multicall contract. Balancer uses a custom multicall contract to retrieve pools' balances; however, there is no source code available, which is a major show stopper for deployment of Balancer to Evmos. Our fork does not require this contract anymore.
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
