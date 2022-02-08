// Usage example:
// npm run calculateProof -- /home/greg/erc20-redeemable/merkle/test/10_totals.json  0x77c845E6A61F37cB7B237de90a74fbc3679FcF06

const { MerkleTree } = require("./merkleTree");
const { utils } = web3;
const fs = require("fs");
const { loadTree } = require("./loadTree");


function calculateProof(path, addr, callback) {
  console.log("File Path Arg (must be absolute):", path);

  const merkleTree = loadTree(utils, path);
  const root = merkleTree.getHexRoot();

  const rawdata = fs.readFileSync(path);
  const balances = JSON.parse(rawdata);
  const address = addr;

  const claimBalance = balances[address];
  console.log("Tree:\t", root);
  console.log("Account:\t", address);
  console.log("Balance:\t", claimBalance);
  const proof = merkleTree.getHexProof(
    utils.soliditySha3(address, utils.toWei(claimBalance))
  );
  console.log("Proof:\t", proof);

  console.log("\n\n// TO CLAIM THIS WEEK");
  console.log("let redeem\nMerkleRedeem.deployed().then(i => redeem = i);");
  console.log("\nlet weekNum = 1 // adjust accordingly");
  console.log("\nlet proof = " + JSON.stringify(proof));
  console.log('\nlet claimBalance = web3.utils.toWei("' + claimBalance + '")');

  console.log(
    '\nawait redeem.verifyClaim("' +
      address +
      '", weekNum, claimBalance, proof)'
  );
  console.log(
    '\nawait redeem.claimWeek("' + address + '", weekNum, claimBalance, proof)'
  );
  return proof;
};


async function main() {
  calculateProof("/home/lexx/code/metalancer-hh/staking/tree/sample_data.json", "0x70997970c51812dc3a010c7d01b50e0d17dc79c8");
  
}


// We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });



    module.exports = {calculateProof};
