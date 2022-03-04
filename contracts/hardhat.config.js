require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address +" balance " + (await account.getBalance()).toString());
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {compilers: [
    {
      version: "0.5.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 10,
        },
      },
    },
    {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 10,
        },
      },
    }

]},
    networks: {
      ropsten: {
        url: process.env.ROPSTEN_URL || "",
        accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      },
      metis_local: {
        url: "http://localhost:8545",
        accounts: [
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
          '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
        ]

      },
      metis_stardust: {
        url: "https://stardust.metis.io/?owner=588",
        accounts: [
          '0x571f3e01171a4db5886b9e3fa4d5c6a726eef2e3dc97d6cd34dd85e6335ef9c0',
          '0x12b7dfcab9ea3a13d46357219aa393fe8d722ba72987304ec396594486a9200f',
        ]

      },
      evmos_test: {
        url: "https://ethereum.rpc.evmos.dev",
        accounts: [
          '0x571f3e01171a4db5886b9e3fa4d5c6a726eef2e3dc97d6cd34dd85e6335ef9c0',
          '0x12b7dfcab9ea3a13d46357219aa393fe8d722ba72987304ec396594486a9200f',
        ]

      },
      evmos_test2: {
        url: "https://evmos-archive-testnet.api.bdnodes.net:8545",
        accounts: [
          '0x12b7dfcab9ea3a13d46357219aa393fe8d722ba72987304ec396594486a9200f', //0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC
          '0x571f3e01171a4db5886b9e3fa4d5c6a726eef2e3dc97d6cd34dd85e6335ef9c0',
        ]

      },



      
    },
    gasReporter: {
      enabled: process.env.REPORT_GAS !== undefined,
      currency: "USD",
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
};
