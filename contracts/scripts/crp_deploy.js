const hre = require("hardhat");

async function simple_deploy(name) {
    const ContractFactory = await hre.ethers.getContractFactory(name);
    const contract = await ContractFactory.deploy();
    await contract.deployed();
    return contract;

}

async function main() {
    const [deployer, user] = await ethers.getSigners();


    // contracts/crp/libraries/BalancerSafeMath.sol:BalancerSafeMath
    // * contracts/crp/libraries/RightsManager.sol:RightsManager
    // * contracts/crp/libraries/SmartPoolManager.sol:SmartPoolManage
    let rightsManager = await simple_deploy("RightsManager");
    let balancerSafeMath = await simple_deploy("BalancerSafeMath");
    let smartPoolManager = await simple_deploy("SmartPoolManager");

    console.log(rightsManager.address);
    console.log(balancerSafeMath.address);
    console.log(smartPoolManager.address);

    const CRPFactory = await hre.ethers.getContractFactory("CRPFactory", { libraries: {
        RightsManager: rightsManager.address,
        BalancerSafeMath: balancerSafeMath.address,
        SmartPoolManager: smartPoolManager.address,
      },
    });
    const crpfactory = await CRPFactory.deploy();
    await crpfactory.deployed();
    console.log("crpfactory deployed to:", crpfactory.address);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
