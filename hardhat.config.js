require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [
        "a5f63572f5123c49078fe28aa2b2b16375e5f4c0fbf56e9a31620558bde00a8f",
      ],
    },
  },
  solidity: "0.8.4",
  etherscan: {
    apiKey: "PDHDDBXQF5QIQFSGWYX94KT8CATN8IAP86",
  },
};
