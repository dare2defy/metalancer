const hre = require("hardhat");


async function main() {

    const [deployer, user] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("User account:", user.address);
    console.log("Deployer balance before deployment:", (await deployer.getBalance()).toString());

    const DSProxyFactory = await hre.ethers.getContractFactory("DSProxyFactory");
    const dsproxyfactory = await DSProxyFactory.deploy();
    await dsproxyfactory.deployed();
    console.log("dsproxyfactory: " + dsproxyfactory.address);
    const ProxyRegistry = await hre.ethers.getContractFactory("ProxyRegistry");
    const proxyregistry = await ProxyRegistry.deploy(dsproxyfactory.address);
    await proxyregistry.deployed();
    console.log("proxyregistry: " + proxyregistry.address);


}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
