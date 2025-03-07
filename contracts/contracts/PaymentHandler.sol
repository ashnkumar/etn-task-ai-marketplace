// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentHandler {
    address public owner;
    
    // Event emitted when a payment is received
    event PaymentReceived(
        address indexed sender,
        uint256 amount,
        string promptId,
        uint256 timestamp
    );
    
    constructor() {
        owner = msg.sender;
    }
    
    // Function to receive payment and emit event
    function makePayment(string memory promptId) external payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        
        emit PaymentReceived(
            msg.sender,
            msg.value,
            promptId,
            block.timestamp
        );
    }
    
    // Function to withdraw funds (only owner)
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
} 