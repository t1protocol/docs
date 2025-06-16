---
id: overview
title: xChainRead Overview
sidebar_label: Overview
sidebar_position: 1
---

# xChainRead

xChainRead is a cross-chain verification primitive that enables smart contracts to securely call view functions on other t1-supported chains and prove the results back to an origin chain.

## How It Works

xChainRead operates through TEE-secured execution:

1. **Request**: Your contract calls `requestRead()` with target chain and function details
2. **Execution**: t1's TEE infrastructure executes the cross-chain read request on the target chain
3. **Proof**: Results are batched into merkle trees and the root is committed on-chain
4. **Verification**: Fetch the proof from the API and verify it for your contract

### TEE Security Model

t1 runs full nodes of partner rollups inside TEEs, ensuring verifiable execution of state reads and cryptographic guarantees of result integrity.

## Quick Start

### 1. Deploy Your Contract

t1 currently supports the following chains:
- Arbitrum Sepolia
- Base Sepolia

Let's use the following example to demonstrate how to use xChainRead. This example is a simplified version of the [T1ERC7683](https://github.com/t1protocol/t1/blob/canary/contracts/src/7683/T1ERC7683.sol) contract. It allows users to request a cross-chain read of the `getFilledOrderStatus` function of a 7683 contract on the Base Sepolia chain.

```solidity
import "./T1XChainReader.sol";

contract IntentSettler {
    T1XChainReader public xChainRead;
    mapping(bytes32 => bytes32) public readRequestToOrderId;
    
    constructor(address _xChainReader) {
        xChainRead = T1XChainReader(_xChainReader);
    }

    function requestVerification(bytes32 orderId) external payable {
        bytes memory callData = abi.encodeWithSignature(
            "getFilledOrderStatus(bytes32)", 
            orderId
        );
        
        bytes32 requestId = xChainRead.requestRead({
            destinationDomain: 84532, // Base Sepolia
            targetContract: 0xf96B8CcB029E0932fe36da0CeDd2b035E2c1695d,
            gasLimit: 200000,
            minBlock: 0,
            callData: callData,
            requester: msg.sender
        });
        
        readRequestToOrderId[requestId] = orderId;
    }

    function handleReadResultWithProof(bytes calldata encodedProofOfRead) external {
        (bytes32 requestId, bytes memory result) = 
            xChainRead.verifyProofOfRead(encodedProofOfRead);
        
        bytes32 orderId = readRequestToOrderId[requestId];
        require(orderId != bytes32(0), "Invalid request");
        
        delete readRequestToOrderId[requestId];
        
        // Process verified result
        bool isSettled = (result.length != 0);
        if (isSettled) {
            _releaseEscrowToSolver(orderId);
        }
    }
}
```

### 2. Request Cross-Chain Read

The `requestRead` function is used to request a cross-chain read. It takes a `ReadRequest` struct as input, which contains the following fields:

- `destinationDomain`: The domain ID of the target chain
- `targetContract`: The address of the target contract
- `gasLimit`: The gas limit for the read operation
- `minBlock`: The minimum block number to read from
- `callData`: The calldata to call the target function with

### 3. Handle Proof Response

Once the read request is processed, the result will be posted to the [API](./api-reference). You can fetch the proof from the API and verify it with your contract. The `verifyProofOfRead` function is used to verify the proof. It takes a `bytes` calldata as input, which contains the encoded proof of read. If the proof is valid, the function will return the request ID and the result of the target function. If the proof is invalid, the function will revert.

## Next Steps

- [API Reference](./api-reference) - Detailed API documentation