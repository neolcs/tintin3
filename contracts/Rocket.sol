// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Rocket is ERC20 {
    uint256 private price_;
    uint256 private money_;
    mapping(address => uint256) private balance_;

    constructor(uint256 price) ERC20("Rocket Token", "RTT") {
        price_ = price;
    }

    function buy() external payable {
        require(price_ > 0, "price not set");
        require(msg.value > 0, "no ether");

        uint256 numberOfToken = msg.value / price_;

        // _mint(msg.sender, numberOfToken);
        balance_[msg.sender] = numberOfToken;
    }

    function withdraw() public returns (uint256) {
        require(price_ > 0, "price not set");
        uint256 numberOfToken = balance_[msg.sender];
        require(numberOfToken > 0, "No token");

        uint256 amount = numberOfToken * price_;
        // (bool success, ) = payable(msg.sender).call{value: amount}("");
        // if (!success) {
        //     revert("Failed to withdraw");
        // }
        balance_[msg.sender] = 0;
        return amount;
    }

    function getMoney() public view returns (uint256) {
        return money_;
    }

    function getPrice() public view returns (uint256) {
        return price_;
    }
}
