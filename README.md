![image](https://user-images.githubusercontent.com/4420479/145579509-a72060c0-7728-4d74-b808-74ea231dd31f.png)
#  evmos-balancer

**Evmos** is a scalable and interoperable Ethereum, built on Proof-of-Stake with fast-finality.

**Balancer** is an automated, on-chain portfolio manager and liquidity provider. Balancer is based on an N-dimensional invariant surface which is a generalization of the constant product formula described by Vitalik Buterin.

This project introduces battle-proven Balancer Bronze realease to the Evmos ecosystem. In a nutshell, it is **off-the-shelf stack for rapid prototyping of DeFi protocols on Evmos**, giving developers access to state-of-the-art core functionality of Balancer, without non-essential feautures such as advanced gas optimizations. 

Our ultimate goal is to **enable builders in Evmos community to jump start their own DeFi products for Evmos, using secure, audited and well-tested Balancer's codebase**. 

## Summary of main contributions
* We've built a monorepo for the Balancer's front-end dapp and all its packages. This allows EVMos builders' community to start working with Balancer's front-end and Smart Order Routing source code, with instant rebuild/reload tooling enabled. Orignial Balancer dapp imports most of the packages as node modules, making it hard to build on top of the Balacner's code base. 
* We've gathered all the necessary contracts in one a single repo (mutlicall, router, pool registry contracts). Previously, they were scattered around several different GitHub repos with no clear links between them, i.e. it was unclear what contracts are required, what versions were compatible, etc. Now everything is in complete synch and is deployment-ready.
* We've added Truffle deployment and configuration scripts for a turn-key launch of the Balancer on Evmos, including detailed tutorial on launching a single node local testnet. Previsously, there were only unit tests available as a source of information on how to deploy Balancer. 
* We've added an ERC20 Wrapped Photon contract to support trading Photons, a native EVMos token.
* We've revamped balance retrival mechanism that relied on a custom multicall with no source code available. Balancer uses a custom multicall contract, which is not in Balancer's Github repo. This is a major show stopper for deployment of Balancer to Evmos. Our fork does not require this contract anymore.
* We've introduced a spaceship to the frontpage to motivate you to build the next-big-DeFi-protocol for Evmos ☺️

# Configuring and running Balancer locally

## Running a local testnet
Install and build Evmos (Evmos is built using Go version 1.17+):
```
git clone https://github.com/tharsis/evmos.git
cd evmos
make install
```

Check that the evmosd binaries have been successfully installed:

`evmosd version`

Initialize a new node:

`./evmosd init testing --chain-id=evmos_9000-99 --home=./local`

Add a validator and 3 test users:

```
./evmosd keys add my_validator --keyring-backend=test --home=./local
./evmosd keys add user1 --keyring-backend=test --home=./local
./evmosd keys add user2 --keyring-backend=test --home=./local
./evmosd keys add user3 --keyring-backend=test --home=./local
```

To see the keys and evmos (Bech32) addresses use:
`./evmosd keys list --keyring-backend=test --home=./local`

For example:
```
name: user3
  type: local
  address: evmos16hl88aqm2cftn8wc8xjl05wmy9ezem39j7pgkx
  pubkey: '{"@type":"/ethermint.crypto.v1.ethsecp256k1.PubKey","key":"A0bOpRq6agNaTVvocj7gGueyAf3VhZN7839kh1newHtE"}'
  mnemonic: ""
```

`User3` has address `evmos16hl88aqm2cftn8wc8xjl05wmy9ezem39j7pgkx`. To find a corresponding Ethereum-style address (EIP-55) for this Bech32 address, run:

```
./evmosd debug addr evmos16hl88aqm2cftn8wc8xjl05wmy9ezem39j7pgkx  --keyring-backend test --home=./local
```

Next, add genesis accounts for the validator and the users with initial Photon balances

```
./evmosd add-genesis-account my_validator 500000000000000000000stake,600000000000000000000aphoton --keyring-backend test --home=./local
./evmosd add-genesis-account user1 99900000000000000000000aphoton --keyring-backend test --home=./local
./evmosd add-genesis-account user2 8880000000000000000000aphoton --keyring-backend test --home=./local
```

Declare a validator via `gentx` transaction:
```
./evmosd gentx my_validator 1000000stake --home=./local --keyring-backend=test --chain-id=evmos_9000-99 \
    --moniker="myvalidator" \
    --commission-max-change-rate=0.01 \
    --commission-max-rate=1.0 \
    --commission-rate=0.07 \
    --details="..." \
    --security-contact="..." \
    --website="..."
```

Collect all genesis transactions and validate them:

```
./evmosd validate-genesis --home=./local
./evmosd collect-gentxs --home=./local`
```

Make sure that `evmosd` is configured to use the correct `home`, keyring and chain-id:

```
./evmosd config --home=./local
./evmosd config keyring-backend test --home=./local
./evmosd config chain-id evmos_9000-99 --home=./local
```

Finally, launch a single node test net

```
./evmosd start --keyring-backend=test --home=./local --pruning=nothing --minimum-gas-prices=0.0001aphoton --json-rpc.api eth,txpool,personal,net,debug,web3

```

## Connecting Metamask to a local testnet

Use the following network configuration

![image](https://user-images.githubusercontent.com/4420479/145582342-ec894dd8-5525-4172-a718-0c43e2b6a9a9.png)

To export a private key for Metamask, run

```
./evmosd keys unsafe-export-eth-key user1 --keyring-backend test --home=./local
```

## Building and deploying contracts

First, install [Truffle](http://trufflesuite.com/tutorial/index.html) and the dependencies

```
npm install -g truffle
cd contracts
npm install 
```

To deploy contracts, run

```
truffle migrate --network=evmos
```
You will see the addresses of the contracts being deployed:

```
Replacing 'Multicall'
---------------------
> transaction hash:    0x38dbe39600500ecbe96c8a46eaeaf5123d15e852eaa80dab5ccdc8fe2c3579ce
> Blocks: 0            Seconds: 4
> contract address:    0xcE436347AD0bc587124270C252eb97b08d5B8D85
> block number:        84
> block timestamp:     1638870510
> account:             0x60802D4de8B902c05B4ebDECF810BEB1e22b35F1
> balance:             599.94825417552949201
> gas used:            428502 (0x689d6)
> gas price:           2.500009 gwei
> value sent:          0 ETH
> total cost:          0.001071258856518 ETH


Replacing 'BRegistry'
---------------------
> transaction hash:    0x57d749925e701eff754cee3de8e646f195d11c74211af23f2529c744dbfdd81f
> Blocks: 0            Seconds: 0
> contract address:    0x9C3df452aA11e624bE3423E47CF47a0f021E337A
> block number:        85
> block timestamp:     1638870515
> account:             0x60802D4de8B902c05B4ebDECF810BEB1e22b35F1
> balance:             599.943293606761328354
> gas used:            1984253 (0x1e46fd)
> gas price:           2.500009 gwei
> value sent:          0 ETH
> total cost:          0.004960650358277 ETH


Replacing 'ExchangeProxy'
-------------------------
> transaction hash:    0x8ee7006559463e4bd6e05c1fb6e4fc8c0a32ad1ae82e14dd86daa3b5f229c0a1
> Blocks: 0            Seconds: 4
> contract address:    0x862c078A19F3c04b34c58F31de71326BDF600e82
> block number:        87
> block timestamp:     1638870525
> account:             0x60802D4de8B902c05B4ebDECF810BEB1e22b35F1
> balance:             599.935588569252761854
> gas used:            3082030 (0x2f072e)
> gas price:           2.500009 gwei
> value sent:          0 ETH
> total cost:          0.00770510273827 ETH
```

After the deployment, run the configuration script:

```
truffle exec test/evmos-deploy.js --network=evmos
```

This script will automaticall configue 3 tokens for a pool admin and 2 other users. More specifically, it this configuration script does the following

* mints 3 different tokens (symbols: `TOK1`,`TOK2`,`TOK3`) for users
* creates a pool
* provides liquidity for the pool
* sets fees for the pool
* enables swaps on the pool and finilizes the pool, so it can be used in publicly

The sample output of the deployment script:

```
Using network 'evmos'.

Network id: 9000, chain id: 9000
Pool admin: 0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
User 1: 0x43c40e2a9c9F2c95A130174790019542C2b8b17B
User 2: 0x0D1083Ad6fa92EBf807e7d67C55Fd288a227aed4
BFactory: 0x220663DC951A540685F809B1f914d458e00B58d8
Pool address: 0x9Cd06775B57218273A996c163dc817174F22E88a
Deployed TOK1 at 0x7B50E6D70e2D1261fD071E9ECf24277EfC0Fac2F
Deployed TOK2 at 0x950403F651b10700f77d0fA2cC8484fDB0110Ba4
Deployed TOK3 at 0x998E53e114FdF298F2B45c37b2973BC6FBF2CfC4
Minted TOK1 for 0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5, balance: 10000000000000000000000
Minted TOK2 for 0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5, balance: 10000000000000000000000
Minted TOK3 for 0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5, balance: 10000000000000000000000
Minted TOK1 for 0x43c40e2a9c9F2c95A130174790019542C2b8b17B, balance: 10000000000000000000000
Minted TOK2 for 0x43c40e2a9c9F2c95A130174790019542C2b8b17B, balance: 10000000000000000000000
Minted TOK3 for 0x43c40e2a9c9F2c95A130174790019542C2b8b17B, balance: 10000000000000000000000
Minted TOK1 for 0x0D1083Ad6fa92EBf807e7d67C55Fd288a227aed4, balance: 10000000000000000000000
Minted TOK2 for 0x0D1083Ad6fa92EBf807e7d67C55Fd288a227aed4, balance: 10000000000000000000000
Minted TOK3 for 0x0D1083Ad6fa92EBf807e7d67C55Fd288a227aed4, balance: 10000000000000000000000
approve 1
approve 2
approve 3
bind 1
bind 2
bind 3
TOK0 balance after bind:20000000000000000000
TOK1 balance after bind:30000000000000000000
TOK2 balance after bind:40000000000000000000
Fee is 3000000000000000
Public swap: true
Finalized: true
```

You will see the addresses of all major contracts, e.g. pool address: `0x9Cd06775B57218273A996c163dc817174F22E88a`. 


## Configuring, building and running Front-end

To configure the front-end dapp, edit `packages/balancer-frontend/src/config/evmos.json`.
You need to change the contracts' addresses to the ones generated by the deployment scripts:  

```
    "addresses": {
        "bFactory": "0x3bA74f689b11c8B7E6f7C37242500DbB7CC62AD6", 
        "bActions": "0xde4A25A0b9589689945d842c5ba0CF4f0D4eB3ac", 
        "dsProxyRegistry": "0x9C3df452aA11e624bE3423E47CF47a0f021E337A",
        "exchangeProxy": "0x862c078A19F3c04b34c58F31de71326BDF600e82", 
        "weth": "0xd4e1799d9624dC796A0e86B023fc27e47D1D0F50", 
        "multicall": "0xcE436347AD0bc587124270C252eb97b08d5B8D85" 
    },
```


### Build

```
npm install --global lerna
lerna bootstrap
```

### Run
```
cd packages/balancer-frontend
npm run serve
```
