const TToken1 = artifacts.require("TToken");
const TToken2 = artifacts.require("TToken2");
const TToken3 = artifacts.require("TToken3");
const BToken = artifacts.require("BToken");

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(TToken1, "TOK1", "TOK1", 18);
  deployer.deploy(TToken2, "TOK2", "TOK2", 18);
  deployer.deploy(TToken3, "TOK3", "TOK3", 18);
  deployer.deploy(BToken);
};
