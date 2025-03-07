// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIMarketplace {
    address public owner;
    
    struct Service {
        string id;            // Service identifier
        address provider;     // Address of the service provider
        uint256 feePercent;   // Platform fee percentage (0-100)
        bool active;          // Whether the service is active
    }
    
    // Mapping from service ID to Service struct
    mapping(string => Service) public services;
    
    // Mapping to track earnings for each provider
    mapping(address => uint256) public earnings;
    
    // Platform earnings
    uint256 public platformEarnings;
    
    // Events
    event ServiceRegistered(string serviceId, address provider, uint256 feePercent);
    event ServiceUpdated(string serviceId, address provider, uint256 feePercent);
    event ServiceDeactivated(string serviceId);
    
    event PaymentReceived(
        address indexed sender,
        string serviceId,
        string requestId,
        uint256 amount,
        uint256 providerAmount,
        uint256 platformFee,
        uint256 timestamp
    );
    
    event PaymentWithdrawn(address indexed provider, uint256 amount);
    event PlatformFeesWithdrawn(uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Register a new service
    function registerService(
        string memory serviceId,
        address provider,
        uint256 feePercent
    ) external onlyOwner {
        require(feePercent <= 100, "Fee percentage cannot exceed 100");
        require(services[serviceId].provider == address(0), "Service ID already exists");
        
        services[serviceId] = Service({
            id: serviceId,
            provider: provider,
            feePercent: feePercent,
            active: true
        });
        
        emit ServiceRegistered(serviceId, provider, feePercent);
    }
    
    // Update service details
    function updateService(
        string memory serviceId,
        address provider,
        uint256 feePercent
    ) external onlyOwner {
        require(feePercent <= 100, "Fee percentage cannot exceed 100");
        require(services[serviceId].provider != address(0), "Service does not exist");
        
        Service storage service = services[serviceId];
        service.provider = provider;
        service.feePercent = feePercent;
        
        emit ServiceUpdated(serviceId, provider, feePercent);
    }
    
    // Deactivate a service
    function deactivateService(string memory serviceId) external onlyOwner {
        require(services[serviceId].provider != address(0), "Service does not exist");
        
        services[serviceId].active = false;
        
        emit ServiceDeactivated(serviceId);
    }
    
    // Make payment for a service
    function makePayment(string memory serviceId, string memory requestId) external payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        
        Service memory service = services[serviceId];
        require(service.provider != address(0), "Service does not exist");
        require(service.active, "Service is not active");
        
        // Calculate fee split
        uint256 platformFee = (msg.value * service.feePercent) / 100;
        uint256 providerAmount = msg.value - platformFee;
        
        // Update earnings
        earnings[service.provider] += providerAmount;
        platformEarnings += platformFee;
        
        // Emit payment event
        emit PaymentReceived(
            msg.sender,
            serviceId,
            requestId,
            msg.value,
            providerAmount,
            platformFee,
            block.timestamp
        );
    }
    
    // Withdraw provider earnings
    function withdrawEarnings() external {
        uint256 amount = earnings[msg.sender];
        require(amount > 0, "No earnings to withdraw");
        
        earnings[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit PaymentWithdrawn(msg.sender, amount);
    }
    
    // Withdraw platform fees (only owner)
    function withdrawPlatformFees() external onlyOwner {
        uint256 amount = platformEarnings;
        require(amount > 0, "No platform fees to withdraw");
        
        platformEarnings = 0;
        
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit PlatformFeesWithdrawn(amount);
    }
    
    // Check service existence and status
    function getServiceDetails(string memory serviceId) external view returns (
        address provider,
        uint256 feePercent,
        bool active
    ) {
        Service memory service = services[serviceId];
        require(service.provider != address(0), "Service does not exist");
        
        return (service.provider, service.feePercent, service.active);
    }
    
    // Get provider's current earnings
    function getEarnings(address provider) external view returns (uint256) {
        return earnings[provider];
    }
}