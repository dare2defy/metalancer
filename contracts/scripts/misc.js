const hre = require("hardhat");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function main() {
    const [deployer, user] = await ethers.getSigners();

    console.log("Deplyoing tokens...");
    const TToken = await hre.ethers.getContractFactory("TToken");

    const token1 = await TToken.attach('0x47AF69C820b672452a10FE2d04B78eEC026d0A99');


    const token4 = await TToken.deploy("Token4", "TOK4", 18);
    await token4.deployed();
    // await delay(10000);
    // await delay(10000);


    const BFactory = await hre.ethers.getContractFactory("BFactory");
    const bfactory = await BFactory.attach('0xD4140D93f5F7e9e8e05E0ac9f925B64fC4c94825');

    //console.log(bfactory);
    let poolTx = await (await bfactory.newBPool()).wait();
    // console.log(poolTx);
    let pool_address = poolTx.events[0].args["pool"];
    //console.log(poolTx.events);
    console.log("Pool address: " + pool_address);
    const BPool = await ethers.getContractFactory("BPool");
    const bpool = await BPool.attach(pool_address);
    
    const txApprove2 = await token1.approve(pool_address, web3.utils.toWei('50000'));
    await txApprove2.wait();
    console.log('approve 2');


    console.log("TOK4 address:", token4.address);

    let tokens = [token4, token1];
    let tokensBalances = [
        '60000',
        '50000',
    ];
    let accounts = [deployer.address, user.address];
    for (let i = 0; i < accounts.length; i++) {
        for (let t = 0; t < tokens.length; t++) {
            const mintTx = await tokens[t].mint(accounts[i], web3.utils.toWei(tokensBalances[t]));
            await mintTx.wait();
            let balance = await tokens[t].balanceOf(accounts[i]);
            console.log("Minted " + await tokens[t].symbol() + " for " + accounts[i] + ", balance: " + (balance).toString());
        }
    }


    // await delay(10000);
    // approve admin tokens                                 
    const txApprove1 = await tokens[0].approve(pool_address, web3.utils.toWei('50000'));
    await txApprove1.wait();
    console.log('approve 1');
    // await delay(10000);

    // await delay(10000);



    // bind tokens      1_000_000_000_000_000_000
    //await bpool.bind(tokens[0].address, web3.utils.toBN(20 * 10 ** 18), web3.utils.toBN(5 * 10 ** 18));
    const bind1Tx = await bpool.bind(tokens[0].address, web3.utils.toWei('30000'), web3.utils.toWei('5'));
    await bind1Tx.wait();
    // await delay(10000);

    console.log('bind 1');

    const bind2Tx = await bpool.bind(tokens[1].address, web3.utils.toWei('40000'), web3.utils.toWei('5'));
    await bind2Tx.wait();
    // await delay(10000);

    console.log('bind 2');

    // await delay(10000);

    for (let i = 0; i < tokens.length; i++) {
        const balance = await bpool.getBalance(tokens[i].address);
        console.log("TOK" + i + " balance after bind:" + balance);
    }

    // set fees 
    const setFeeTx = await bpool.setSwapFee(web3.utils.toWei('0.003')); //0.3%
    await setFeeTx.wait();

    // await delay(10000);

    const swapFee = await bpool.getSwapFee();
    console.log("Fee is " + swapFee);

    // enable public swap
    await (await bpool.setPublicSwap(true)).wait();

    // await delay(10000);

    const publicSwap = await bpool.isPublicSwap();
    console.log("Public swap: " + publicSwap);

    // await delay(10000);

    // finilze pool
    let finalizationTx = await bpool.finalize();
    await finalizationTx.wait();

    const finalized = await bpool.isFinalized();
    console.log('Finalized: ' + finalized);



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
