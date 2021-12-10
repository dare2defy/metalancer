//// ======================================================================================================================
//// Server setup (ganache-dare2defy.sh):
// ganache-cli --host dare2defy.xyz  --deterministic --mnemonic="obey soccer party industry goddess width side elder barely kiwi tree mask" --defaultBalanceEther 900000

//// run ganache as a daemon:
// daemon --name="ganache" --output=ganache_log.txt /home/defi/ganache-dare2defy.sh

//
// daemon --name="emvos" --output=evmos_log.txt /home/defi/run_evmos.sh

//// check that everything is working: port 8545
// sudo lsof -i -P -n | grep LISTEN
//// ======================================================================================================================

//// ======================================================================================================================
//// Local setup:
// ganache-cli --deterministic --mnemonic="obey soccer party industry goddess width side elder barely kiwi tree mask" --defaultBalanceEther 900000 -l 10000000000000
//// ======================================================================================================================

//// ======================================================================================================================
//// How to run this script
// truffle migrate --network=dare2defy --reset
// truffle exec test/ganache-deploy.js  --network=dare2defy
// truffle exec test/ganache-deploy.js  --network=evmos
//// ======================================================================================================================

const BPool = artifacts.require("BPool");
const BFactory = artifacts.require("BFactory");
const TToken1 = artifacts.require("TToken");
const TToken2 = artifacts.require("TToken2");
const TToken3 = artifacts.require("TToken3");

module.exports = async function(callback) {
  try {
    const networkId = await web3.eth.net.getId();
    const chainId = await web3.eth.getChainId();
    console.log("Network id: " + networkId + ", chain id: " + chainId);

    let accounts = await web3.eth.getAccounts();

    const admin = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    console.log("Pool admin: " + admin);
    console.log("User 1: " + user1);
    console.log("User 2: " + user2);

    let factory = await BFactory.deployed();
    console.log("BFactory: " + factory.address);

    // pool set up
    // let poolTx = await factory.newBPool();
    // let pool_address = poolTx.logs[0].args.pool;
    let pool_address = "0x59Bb72EE581138931fAe257859340E66e65f21bb";
    // console.log("Pool address: " + pool_address);
    let pool = await BPool.at(pool_address);

    // deploy 3 Test tokens TOK1, TOK2, TOK3
    let tokens = [];
    tokens[0] = await TToken1.deployed();
    console.log("Deployed TOK1 at " + tokens[0].address);

    tokens[1] = await TToken2.deployed();
    console.log("Deployed TOK2 at " + tokens[1].address);

    tokens[2] = await TToken3.deployed();
    console.log("Deployed TOK3 at " + tokens[2].address);

    //mint coins for all accounts
    // for (let i = 0; i < 3; i++) {
    //     for (let t = 0; t < 3; t++) {
    //         await tokens[t].mint(accounts[i], '10000000000000000000000');
    //         console.log("Minted " + await tokens[t].symbol() + " for " + accounts[i] + ", balance: " + (await tokens[t].balanceOf(accounts[i])).toString());
    //     }
    // }

    // approve admin tokens
    // await tokens[0].approve(pool_address, web3.utils.toWei('1000000000000000000000'));
    // console.log('approve 1');
    // await tokens[1].approve(pool_address, web3.utils.toWei('1000000000000000000000'));
    // console.log('approve 2');
    // await tokens[2].approve(pool_address, web3.utils.toWei('1000000000000000000000'));
    // console.log('approve 3');

    // // bind tokens
    // await pool.bind(tokens[0].address, web3.utils.toBN(20 * 10 ** 18), web3.utils.toBN(5 * 10 ** 18));
    // console.log('bind 1');
    // await pool.bind(tokens[1].address, web3.utils.toBN(30 * 10 ** 18), web3.utils.toBN(5 * 10 ** 18));
    // console.log('bind 2');
    // await pool.bind(tokens[2].address, web3.utils.toBN(40 * 10 ** 18), web3.utils.toBN(5 * 10 ** 18));
    // console.log('bind 3');

    for (let i = 0; i < 3; i++) {
      const balance = await pool.getBalance(tokens[i].address);
      console.log("TOK" + i + " balance after bind:" + balance);
    }

    // // set fees
    await pool.setSwapFee(web3.utils.toWei("0.003"));
    const swapFee = await pool.getSwapFee();
    console.log("Fee is " + swapFee);

    // // enable public swap
    await pool.setPublicSwap(true);
    const publicSwap = await pool.isPublicSwap();
    console.log("Public swap: " + publicSwap);

    // // finilze pool
    let finalizationResult = await pool.finalize();
    const finalized = await pool.isFinalized();
    console.log("Finalized: " + finalized);

    // // let pools = await factory.getPools();
    // // console.log(pools);
    // // for (let i = 0; i < pools.length; i++) {
    // //     console.log("getPools [" + i + "]: " + pools[i]);
    // // }

    // const wethPrice = await pool.getSpotPriceSansFee(tokens[0].address, tokens[1].address);
    // console.log('TOK1/TOK2 price: ' + wethPrice);

    // // approve user1 tokens
    // let tok1user1 = await tokens[0].approve(pool_address, web3.utils.toWei('10000000000000000000000'), {from: accounts[1]});
    // console.log('approve user1 tok1');

    // console.log("user1 tok1 balance before swap:  " + await tokens[0].balanceOf(accounts[1]));
    // console.log("user1 tok2 balance before swap:  " + await tokens[1].balanceOf(accounts[1]));
    // let swapResult = await pool.swapExactAmountIn(tokens[0].address, web3.utils.toBN(10 * 10 ** 18), tokens[1].address, web3.utils.toBN(1 * 10 ** 18), web3.utils.toBN(5 * 10 ** 18),{ from: accounts[1] });
    // console.log("user1 tok1 balance after swap:  " + await tokens[0].balanceOf(accounts[1]));
    // console.log("user1 tok2 balance after swap:  " + await tokens[1].balanceOf(accounts[1]));

    // console.log('swp user1 tok1 => tok2');
  } catch (error) {
    console.log(error);
  } finally {
    callback();
  }
};
