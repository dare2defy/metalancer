const TMath = artifacts.require("TMath");
const TToken1 = artifacts.require("TToken");
const TToken2 = artifacts.require("TToken2");
const TToken3 = artifacts.require("TToken3");
const BToken = artifacts.require("BToken");
const BFactory = artifacts.require("BFactory");
const Multicall = artifacts.require("Multicall");
const BRegistry = artifacts.require("BRegistry");
const ExchangeProxy = artifacts.require("ExchangeProxy");
const WPhoton = artifacts.require("WPhoton");

//truffle migrate --network=dare2defy --reset
//truffle migrate --network=evmos --reset
module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TMath);
  await deployer.deploy(WPhoton);
  let wphoton = await WPhoton.deployed();

  await deployer.deploy(BFactory);
  let factory = await BFactory.deployed();
  await deployer.deploy(Multicall);
  await deployer.deploy(BRegistry, factory.address);
  let registry = await BRegistry.deployed();

  await deployer.deploy(ExchangeProxy, wphoton.address);
  let exchangeProxy = await ExchangeProxy.deployed();

  console.log("Proxy deployed to:", exchangeProxy.address);

  await exchangeProxy.setRegistry(registry.address);
};

// Starting migrations...
// ======================
// > Network name:    'evmos'
// > Network id:      9000
// > Block gas limit: 4294967295 (0xffffffff)

// 1_initial_migration.js
// ======================

//    Replacing 'Migrations'
//    ----------------------
//    > transaction hash:    0x2fdbc3461c541aec00f381398923d318dd98793b89ede6b004de809bd45cc246
//    > Blocks: 0            Seconds: 0
//    > contract address:    0x659195344648b91f1355EB87682944A0Bc449aB7
//    > block number:        8267
//    > block timestamp:     1638828455
//    > account:             0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
//    > balance:             599.408154387663354906
//    > gas used:            170927 (0x29baf)
//    > gas price:           2.500000014 gwei
//    > value sent:          0 ETH
//    > total cost:          0.000427317502392978 ETH

//    > Saving migration to chain.
//    > Saving artifacts
//    -------------------------------------
//    > Total cost:     0.000427317502392978 ETH

// 2_deploy_factories.js
// =====================

//    Replacing 'TMath'
//    -----------------
//    > transaction hash:    0x34ad90b731f285e6166fa3ceec9f0326874c3e6d0d70ffe9fa644ffa919cc5cb
//    > Blocks: 1            Seconds: 4
//    > contract address:    0xc3973A8C7B4766D99d859Bf225cd2Db618BAf3ca
//    > block number:        8269
//    > block timestamp:     1638828465
//    > account:             0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
//    > balance:             599.405582945250262517
//    > gas used:            982776 (0xefef8)
//    > gas price:           2.500000014 gwei
//    > value sent:          0 ETH
//    > total cost:          0.002456940013758864 ETH

//    Deploying 'WPhoton'
//    -------------------
//    > transaction hash:    0x9329e0f1f07f6890f7dcb3862329be7480a1456145d7301736b72882ba660e97
//    > Blocks: 1            Seconds: 4
//    > contract address:    0xa2682403Ed98D98669E71184D6ee7f3cB606C45d
//    > block number:        8270
//    > block timestamp:     1638828470
//    > account:             0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
//    > balance:             599.403196857790635297
//    > gas used:            954435 (0xe9043)
//    > gas price:           2.500000014 gwei
//    > value sent:          0 ETH
//    > total cost:          0.00238608751336209 ETH

//    Replacing 'BFactory'
//    --------------------
//    > transaction hash:    0xf915c93aa03ffa3f46742c0c18465c3395509eda4d8d375f5a145df3d26549cd
//    > Blocks: 0            Seconds: 4
//    > contract address:    0x88f062c7562BD50aAedbC02161403De2136C4d80
//    > block number:        8271
//    > block timestamp:     1638828475
//    > account:             0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
//    > balance:             599.389815285300220719
//    > gas used:            5352629 (0x51acb5)
//    > gas price:           2.500000014 gwei
//    > value sent:          0 ETH
//    > total cost:          0.013381572574936806 ETH

//    Deploying 'Multicall'
//    ---------------------
//    > transaction hash:    0x8fb3a92f28d68ebb404f6129e05a08eeda3252c19ce5f7159621f38dacd2f371
//    > Blocks: 0            Seconds: 4
//    > contract address:    0x45Adef25edCb817260B788856bdcA2609aFC676c
//    > block number:        8272
//    > block timestamp:     1638828480
//    > account:             0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
//    > balance:             599.38874403034427503
//    > gas used:            428502 (0x689d6)
//    > gas price:           2.500000014 gwei
//    > value sent:          0 ETH
//    > total cost:          0.001071255005999028 ETH

//    Deploying 'BRegistry'
//    ---------------------
//    > transaction hash:    0x56696e2a89c3df6b0f7b2b70b090a45ee091bad3e99e475d61ad0c1eac881c1e
//    > Blocks: 0            Seconds: 4
//    > contract address:    0xEE966666452b1E33a62544A498ddffdc844600f4
//    > block number:        8273
//    > block timestamp:     1638828485
//    > account:             0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
//    > balance:             599.383783397877439084
//    > gas used:            1984253 (0x1e46fd)
//    > gas price:           2.500000014 gwei
//    > value sent:          0 ETH
//    > total cost:          0.004960632527779542 ETH

//    Deploying 'ExchangeProxy'
//    -------------------------
//    > transaction hash:    0x50bda65f8428d5da7e9493657df482581e82fee6d02944dfaa64e23bdc644568
//    > Blocks: 0            Seconds: 4
//    > contract address:    0xcAEBE3779C796D8b5F0C5D818000Dd54C4A338C1
//    > block number:        8274
//    > block timestamp:     1638828490
//    > account:             0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5
//    > balance:             599.376078322902918699
//    > gas used:            3082030 (0x2f072e)
//    > gas price:           2.500000014 gwei
//    > value sent:          0 ETH
//    > total cost:          0.00770507504314842 ETH

// Proxy deployed to: 0xcAEBE3779C796D8b5F0C5D818000Dd54C4A338C1

//    ⠙ Saving migration to chain.
//    Replacing 'TToken'
//    ------------------

//    Replacing 'TToken3'
//    -------------------

//    Replacing 'TToken2'
//    -------------------
//    ⠹ Saving migration to chain.
//    Replacing 'BToken'
//    ------------------
//    ⠸ Saving migration to chain.   > transaction hash:    0x9cec555cff5252981c946d11e86c70bc5ce1356ba83eec30770fc6cb39481537
//    ⠋ Blocks: 0            Seconds: 0   > transaction hash:    0x46b6e299146755fbbf0d903ec02697574746efb025103b9bec318a60afc57e7e
//    ⠋ Blocks: 0            Seconds: 0   > transaction hash:    0x6df2e161760f0b6a34696657cea782ed85b8048b9ccadb6cf48e18b2b0c0600c
//    ⠋ Blocks: 0            Seconds: 0   > transaction hash:    0x8ecc93cc14c78622413cf954a8f8ef6f33236b654eadfd2120b8eac2e3310111
//    > Saving migration to chain.
//    > Saving artifacts
//    -------------------------------------
//    > Total cost:     0.03196156267898475 ETH

// Summary
// =======
// > Total deployments:   7
// > Final cost:          0.032388880181377728 ETH
