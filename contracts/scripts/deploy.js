const hre = require("hardhat");


// --------------------------------------------------
// yarn hardhat run scripts/deploy.js --network metis
// --------------------------------------------------


// packages/balancer-frontend/src/config/metis.json
// packages/balancer-frontend/src/assets/pools.json
// packages/balancer-frontend/src/api/ethereum.ts
// packages/balancer-frontend/src/utils/storage.ts
// packages/balancer-frontend/.env
// packages/balancer-assets/lists/eligible.json
// packages/balancer-assets/lists/listed.json
// packages/ethcall/src/provider.ts
// packages/balancer-frontend/node_modules/balancer-assets/scripts/generate-registry.js
// packages/balancer-frontend/src/utils/provider.ts


// Deployer account: 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC
// User account: 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86
// Deployer balance before deployment: 1499563380000000000
// BFactory deployed to: 0xe74C0Ae9f38b2dE34ec78FbF83Af68125A456998
// WEth deployed to: 0x5e60843E249F2D75311Fe6583c6FB727c6b9Cd7F
// Registry deployed to: 0xC125B4a359e03683B26f67b7cc421518E5b47F82
// ExchangeProxy deployed to: 0x8DcCa026Ca829D479E004b61f6d94451ca90f2Fc
// Multicall deployed to:  0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d
// Pool address: 0xB994a8A7242e48D15f47E22e98e8BAEbE09B0548
// TOK1 address: 0x1A30eE1295e0f10d3D9bDDc763510b3baFD1be98
// TOK2 address: 0x6925EA17e5BcCb23CB271530cad999B992D50799
// TOK3 address: 0x00B205bB15729dc21BBEf9b422498cFebE4CC4F0
// Minted TOK1 for 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC, balance: 10000000000000000000000
// Minted TOK2 for 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC, balance: 20000000000000000000000
// Minted TOK3 for 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC, balance: 30000000000000000000000
// Minted TOK1 for 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86, balance: 10000000000000000000000
// Minted TOK2 for 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86, balance: 20000000000000000000000
// Minted TOK3 for 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86, balance: 30000000000000000000000
// TOK0 balance after bind:500000000000000000000
// TOK1 balance after bind:600000000000000000000
// TOK2 balance after bind:700000000000000000000
// Fee is 3000000000000000
// Public swap: true
// Finalized: true


async function main() {

    const [deployer, user] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("User account:", user.address);
    console.log("Deployer balance before deployment:", (await deployer.getBalance()).toString());

    const BFactory = await hre.ethers.getContractFactory("BFactory");
    const bfactory = await BFactory.deploy();
    await bfactory.deployed();
    console.log("BFactory deployed to:", bfactory.address);

    const WEth = await hre.ethers.getContractFactory("WEth");
    const weth = await WEth.deploy();
    await weth.deployed();
    console.log("WEth deployed to:", weth.address);

    const BRegistry = await hre.ethers.getContractFactory("BRegistry");
    const registry = await BRegistry.deploy(bfactory.address);
    await registry.deployed();
    console.log("Registry deployed to:", registry.address);


    const ExchangeProxy = await hre.ethers.getContractFactory("ExchangeProxy");
    const proxy = await ExchangeProxy.deploy(weth.address);
    await proxy.deployed();

    console.log("ExchangeProxy deployed to:", proxy.address);
    await proxy.setRegistry(registry.address);


    const Multicall = await hre.ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed();
    console.log("Multicall deployed to: ", multicall.address);



    // pool set up
    let poolTx = await (await bfactory.newBPool()).wait();
    //console.log(poolTx);
    let pool_address = poolTx.events[0].args["pool"];
    //console.log(poolTx.events);
    console.log("Pool address: " + pool_address);

    const BPool = await ethers.getContractFactory("BPool");
    const bpool = await BPool.attach(pool_address);

    // console.log("Is pool is finalized? (should be false): " + await bpool.isFinalized());
    const TToken = await hre.ethers.getContractFactory("TToken");
    const token1 = await TToken.deploy("Token1", "TOK1", 18);
    await token1.deployed();
    const token2 = await TToken.deploy("Token2", "TOK2", 18);
    await token2.deployed();
    const token3 = await TToken.deploy("Token3", "TOK3", 18);
    await token3.deployed();

    console.log("TOK1 address:", token1.address);
    console.log("TOK2 address:", token2.address);
    console.log("TOK3 address:", token3.address);

    let accounts = [deployer.address, user.address];
    let tokens = [token1, token2, token3];
    let tokensBalances = [
        '10000',
        '20000',
        '30000'
    ];
    for (let i = 0; i < 2; i++) {
        for (let t = 0; t < 3; t++) {
            const mintTx = await tokens[t].mint(accounts[i], web3.utils.toWei(tokensBalances[t]));
            await mintTx.wait();
            console.log("Minted " + await tokens[t].symbol() + " for " + accounts[i] + ", balance: " + (await tokens[t].balanceOf(accounts[i])).toString());
        }
    }


    // approve admin tokens                                 
    const txApprove1 = await tokens[0].approve(pool_address, web3.utils.toWei('10000'));
    await txApprove1.wait();
    console.log('approve 1');

    const txApprove2 = await tokens[1].approve(pool_address, web3.utils.toWei('20000'));
    await txApprove2.wait();
    console.log('approve 2');

    const txApprove3 = await tokens[2].approve(pool_address, web3.utils.toWei('30000'));
    await txApprove3.wait();

    console.log('approve 3');


    // bind tokens      1_000_000_000_000_000_000
    //await bpool.bind(tokens[0].address, web3.utils.toBN(20 * 10 ** 18), web3.utils.toBN(5 * 10 ** 18));
    const bind1Tx = await bpool.bind(tokens[0].address, web3.utils.toWei('10000'), web3.utils.toWei('5'));
    await bind1Tx.wait();

    console.log('bind 1');

    const bind2Tx = await bpool.bind(tokens[1].address, web3.utils.toWei('20000'), web3.utils.toWei('5'));
    await bind2Tx.wait();

    console.log('bind 2');

    const bind3Tx = await bpool.bind(tokens[2].address, web3.utils.toWei('30000'), web3.utils.toWei('5'));
    await bind3Tx.wait();

    console.log('bind 3');

    for (let i = 0; i < 3; i++) {
        const balance = await bpool.getBalance(tokens[i].address);
        console.log("TOK" + i + " balance after bind:" + balance);
    }

    // set fees 
    const setFeeTx = await bpool.setSwapFee(web3.utils.toWei('0.003')); //0.3%
    await setFeeTx.wait();


    const swapFee = await bpool.getSwapFee();
    console.log("Fee is " + swapFee);

    // enable public swap
    await bpool.setPublicSwap(true);

    const publicSwap = await bpool.isPublicSwap();
    console.log("Public swap: " + publicSwap);


    // finilze pool
    let finalizationTx = await bpool.finalize();
    await finalizationTx.wait();

    const finalized = await bpool.isFinalized();
    console.log('Finalized: ' + finalized);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
