const {ethers} = require("hardhat");
const { expect } = require('chai')

describe("token test", () => {
  let owner, Token, hardhatToken;

  beforeEach(async function(){
    [owner, receiver, third] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    hardhatToken = await Token.deploy();
  })

  it("Deployment should assign the total supply of tokens to the owner", async function() {
    const ownerBalance = await hardhatToken.balanceOf(owner.address); 
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  })

  it("transfer from owner to receiver with 500", async function() {
    const ownerBalance = await hardhatToken.balanceOf(owner.address); 
    const amount = 500;
    await hardhatToken.transfer(receiver.address, amount);
    const ownerBalanceAfterTransfer = await hardhatToken.balanceOf(owner.address);
    expect(ownerBalance - ownerBalanceAfterTransfer).to.equal(amount);
    const balanceOfReceiver = await hardhatToken.balanceOf(receiver.address);
    expect(balanceOfReceiver).to.equal(amount);
  })

  it("should fail if send 1000 with balance of 500", async function() {
    const amount = 500;
    const largeAmount = 1000;
    await hardhatToken.transfer(receiver.address, amount);
    await expect(hardhatToken.connect(receiver).transfer(third.address, largeAmount)).to.be.revertedWith('Not enough tokens');
  })
})