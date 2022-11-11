const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");


/** @type import('hardhat/config').HardhatUserConfig */

task("accounts", "Print the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  accounts.map(acc => console.log(acc.address));
})

const ALCHEMY_API_KEY = "E-aIWmir44gvHgAXHeiIzgzT_hravJJo";
const GOERLI_PRIVATE_KEY = "7ecfa53a3e43f5e93ca5524fc84198ba1c357b022200aaba3a18d5fc485542eb";
const ETHERSCAN_API_KEY = "7CDDVGKJUGP4ZZFKN4BMPPDVY4S9FZZU96"

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/E-aIWmir44gvHgAXHeiIzgzT_hravJJo`,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  }
};
