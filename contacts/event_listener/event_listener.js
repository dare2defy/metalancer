const Web3 = require("web3");
const fs = require("fs");

const FACTORY_ADDRESS = "0x23460aa2fc81Dd9dB6eF4eAe9B443af10eFd1A19";
const RPC_ADDRESS = "ws://127.0.0.1:8546"; // evmos WS port
const EVENT = "LOG_NEW_POOL";

var web3Provider = new Web3.providers.WebsocketProvider(RPC_ADDRESS);
var web3 = new Web3(web3Provider);

let poolsList = [];

const BFactory_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "blabs", type: "address" }
    ],
    name: "LOG_BLABS",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "pool", type: "address" }
    ],
    name: "LOG_NEW_POOL",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "getColor",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "b", type: "address" }],
    name: "isBPool",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "newBPool",
    outputs: [{ internalType: "contract BPool", name: "", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getBLabs",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "b", type: "address" }],
    name: "setBLabs",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "contract BPool", name: "pool", type: "address" }],
    name: "collect",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
const factoryContract = new web3.eth.Contract(BFactory_ABI, FACTORY_ADDRESS);

factoryContract
  .getPastEvents(EVENT, { fromBlock: 0 }, function(error, events) {})
  .then(results => {
    for (let i = 0; i < results.length; i++) {
      let poolAddress = results[i].returnValues.pool;
      console.log("old pool: " + poolAddress);
      poolsList.push(poolAddress);
    }
  });

factoryContract.events.allEvents().on("data", event => {
  if (event.event == EVENT) {
    let poolAddress = event.returnValues.pool;
    console.log("new pool: " + poolAddress);
    poolsList.push(poolAddress);
  }
});

var http = require("http");

var app = http.createServer(function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(poolsList));
});
app.listen(8808);

// function getContractAbi(contractName) {
//     const CONTRACT_ABI = JSON.parse(fs.readFileSync("./build/contracts/"+contractName+".json", 'UTF-8'));
//     return CONTRACT_ABI.abi;
// }

//const BFactory_ABI = getContractAbi('BFactory');

// factoryContract.events.allEvents().on('data', (event) => {
//     if (event.event == 'LOG_NEW_POOL') {
//         let newPoolAddress = event.returnValues.pool;
//         console.log("new pool:" + newPoolAddress);
//         // const poolContract = new web3.eth.Contract(getContractAbi('BPool'), newPoolAddress);
//         // poolContract.events.allEvents().on('data', (event) => {
//         //     console.log(event);
//         // });

//     }
// })
// .on('error', console.error);
