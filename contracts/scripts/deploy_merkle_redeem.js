const hre = require("hardhat");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function main() {
    const [deployer, user] = await ethers.getSigners();

    console.log("Deplyoing tokens...");
    const TToken = await hre.ethers.getContractFactory("TToken");
    const mtg_token = await TToken.deploy("MTG", "MTG", 18);
    await mtg_token.deployed();
    console.log("mtg_token address:", mtg_token.address);


    const MerkleRedeem = await hre.ethers.getContractFactory("MerkleRedeem");
    const merkle_redeem = await MerkleRedeem.deploy(mtg_token.address);
    await merkle_redeem.deployed();

    console.log("merklee_redeem address:", merkle_redeem.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
