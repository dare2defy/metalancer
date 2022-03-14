const hre = require("hardhat");

async function main() {
  const [deployer, user] = await ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("User account:", user.address);
  console.log(
    "Deployer balance before deployment:",
    (await deployer.getBalance()).toString()
  );

  const BActionsFactory = await hre.ethers.getContractFactory("BActions");
  const bActionsFactory = await BActionsFactory.deploy();
  await bActionsFactory.deployed();
  console.log("bActionsFactory: " + bActionsFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
