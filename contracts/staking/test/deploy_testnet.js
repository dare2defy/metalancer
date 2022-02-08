// yarn hardhat run staking/tree/redeem_test.js --network hardhat

const hre = require("hardhat");
const { disburse } = require("./disburse.js");
const { calculateProof } = require("./calculateProof.js");

async function main() {
    const [deployer, user] = await ethers.getSigners();
    
    console.log("user: " + user.address);
    const TToken = await hre.ethers.getContractFactory("TToken");
    const mtg_token = await TToken.attach("0xBE252d980c66613c49d5F94F218D66c59cB0c1C3");
    console.log("mtg_token address:", mtg_token.address);


    const MerkleRedeem = await hre.ethers.getContractFactory("MerkleRedeem");
    const merkle_redeem = await MerkleRedeem.attach("0x1Af053d7dfeca0af78443DB8B54a0414d614211f");

    // const mintTx = await mtg_token.mint(deployer.address, web3.utils.toWei('1000'));
    // await mintTx.wait();
    // let balance = await mtg_token.balanceOf(deployer.address);
    // console.log("Minted " + await mtg_token.symbol() + " for " + deployer.address + ", balance: " + (balance).toString());

    // const approveTx = await mtg_token.approve(merkle_redeem.address, web3.utils.toWei('1000'));
    // await approveTx.wait();
    // console.log("approve");

    console.log("merklee_redeem address:", merkle_redeem.address);
    console.log(disburse);
    const weekNum = 1;
    const claimBalance = web3.utils.toWei('140');
    // const root = disburse("/home/lexx/code/metalancer-hh/staking/test/sample_data.json")
    // const seedTx = await merkle_redeem.seedAllocations(weekNum, root, web3.utils.toWei('1000'));
    // await seedTx.wait();

    proof = calculateProof("/home/lexx/code/metalancer-hh/staking/test/sample_data.json", "0xB994a8A7242e48D15f47E22e98e8BAEbE09B0548");
    console.log(proof);
    console.log("verificaiton");

    const verification = await merkle_redeem.verifyClaim("0xB994a8A7242e48D15f47E22e98e8BAEbE09B0548", weekNum, claimBalance, proof);
    console.log(verification);
    const claim_status = await merkle_redeem.claimStatus("0xB994a8A7242e48D15f47E22e98e8BAEbE09B0548", 1, 3);
    console.log(claim_status);

    // console.log ("before claiming " + await mtg_token.balanceOf(user.address));

    // const reedemTx = await merkle_redeem.claimWeek(user.address, weekNum, claimBalance, proof);
    // await reedemTx.wait();

    // console.log ("after claiming " + await mtg_token.balanceOf(user.address));
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

