// Usage example:
// npm run disburse -- /home/greg/erc20-redeemable/merkle/test/10_totals.json 10622281

const { MerkleTree } = require("./merkleTree");
const { utils } = web3;
const { loadTree } = require("./loadTree");
const fs = require("fs");

async function disburse(path, callback) {
  console.log("File Path Arg (must be absolute):", path);

  const merkleTree = loadTree(utils, path);
  // const blockNum = process.argv[5];

  // const block = await web3.eth.getBlock(blockNum);
  // console.log("Block:\t", blockNum, block.hash, block.timestamp);

  const root = merkleTree.getHexRoot();
  console.log("Tree:\t", root);

  console.log("\n\n// TO FINISH THIS WEEK");
  console.log("let redeem\nMerkleRedeem.deployed().then(i => redeem = i);");
  console.log("let weekNum = 1 // adjust accordingly");
  // console.log(
  //   "await redeem.finishWeek(weekNum, " +
  //     block.timestamp +
  //     ', "' +
  //     block.hash +
  //     '")'
  // );
  console.log('await redeem.seedAllocations(weekNum, "' + root + '")');
  return root;
};


// async function main() {
//   disburse("/home/lexx/code/metalancer-hh/staking/tree/sample_data.json");
  
// }


// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });



module.exports = { disburse };