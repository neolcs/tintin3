const {ethers} = require("hardhat");
const { expect } = require('chai')

describe("token test", () => {
  let owner, Token, hardhatToken;

  beforeEach(async function(){
    [owner] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    hardhatToken = await Token.deploy();
  })

  it("Deployment should assign the total supply of tokens to the owner", async function() {
    const ownerBalance = await hardhatToken.balanceOf(owner.address); 
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  })
})