module.exports = {
  plugins: ["truffle-contract-size"],
  networks: {
    dare2defy: {
      host: "dare2defy.xyz", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gas: 6721975
    },

    ganache: {
      host: "localhost", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gas: 6721975
    },
    findora: {
      host: "localhost", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gas: 6721975
    },

    evmos: {
      host: "localhost", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gas: 6721975
      //from: '0xFE3D811A3ABB203E11ABC8B97992AD53EB64C216',
    }

    //

    // development: {
    //     host: 'localhost', // Localhost (default: none)
    //     port: 8545, // Standard Ethereum port (default: none)
    //     network_id: '*', // Any network (default: none)
    //     gas: 10000000,
    // },
    // coverage: {
    //     host: 'localhost',
    //     network_id: '*',
    //     port: 8555,
    //     gas: 0xfffffffffff,
    //     gasPrice: 0x01,
    // },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.12",
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 100
        },
        evmVersion: "byzantium"
      }
    }
  }
};
