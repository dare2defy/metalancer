const hre = require("hardhat");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function main() {
    const [deployer, user] = await ethers.getSigners();

    console.log("Deplyoing tokens...");
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

    let tokens = [token1, token2, token3];
    let tokensBalances = [
        '10000',
        '20000',
        '30000'
    ];
    let accounts = [deployer.address, user.address];
    for (let i = 0; i < 2; i++) {
        for (let t = 0; t < 3; t++) {
            const mintTx = await tokens[t].mint(accounts[i], web3.utils.toWei(tokensBalances[t]));
            await mintTx.wait();
            let balance = await tokens[t].balanceOf(accounts[i]);
            console.log("Minted " + await tokens[t].symbol() + " for " + accounts[i] + ", balance: " + (balance).toString());
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
