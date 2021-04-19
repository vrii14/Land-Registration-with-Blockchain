const Land = artifacts.require("Land");

module.exports = function(deployer) {
  deployer.deploy(Land);
};
