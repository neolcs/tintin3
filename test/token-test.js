const { ethers } = require("hardhat");
const { expect } = require('chai')

describe("token test", () => {
  let owner, Rocket, contract;
  let one_ether = ethers.utils.parseEther("1.0");

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Rocket = await ethers.getContractFactory("Rocket");
    contract = await Rocket.deploy(one_ether);
  })

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    await contract.buy({ value: one_ether })
    const result = await contract.withdraw();
    expect(result).to.be.equal(one_ether);
  })
})