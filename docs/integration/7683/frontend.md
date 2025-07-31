---
id: frontend-integration
title: Frontend Integration
sidebar_label: Frontend Integration
sidebar_position: 2
---

# Frontend Integration for ERC 7683 Intent Bridging

This guide explains how to integrate the 7683 intent bridging mechanism into your frontend application. It covers encoding the order data, estimating gas, and executing the bridge transaction.

## Overview

The 7683 Intent Bridge enables cross-chain token transfers through an intent-based system. Users express their intent to bridge tokens, and fillers compete to fulfill these intents, providing better execution and potentially better rates.

## How it works

The 7683 Intent Bridge operates through a standardized intent protocol:

1. **Intent Creation**: Users create an intent specifying source and destination tokens, amounts, and execution parameters
2. **Order Encoding**: The intent is encoded according to ERC-7683 standards with proper ABI encoding
3. **On-Chain Submission**: The encoded intent is submitted to the origin chain contract
4. **Filler Execution**: Off-chain fillers monitor intents and compete to fulfill them on the destination chain
5. **Settlement**: Once filled, the intent is marked as complete and funds are released

## Integration Overview

The main components of frontend integration are:

- Encoding intent order data in a Solidity-compatible format.
- Executing the bridge intent with custom parameters.

## Encoding Order Data

To prepare the order data for execution, use the `encodeIntentOrderData` function. This ensures the `bytes` format is correctly aligned for the 7683 contract.

### IntentOrderData Type Definition

```ts
export type IntentOrderData = {
  sender: string // padded address
  recipient: string // padded address
  inputToken: string // padded address
  outputToken: string // padded address
  amountIn: string
  amountOut: string
  senderNonce: number
  originDomain: number
  destinationDomain: number
  destinationSettler: string // padded address
  fillDeadline: number
  data: string // hex string like "0x"
}
```

```ts
export function encodeIntentOrderData(orderData: IntentOrderData): string {
  const abiCoder = ethers.utils.defaultAbiCoder
  const toBytes32 = (addr: string) => ethers.utils.hexZeroPad(addr, 32)

  const orderDataEncoded = abiCoder.encode(
    [
      'bytes32',
      'bytes32',
      'bytes32',
      'bytes32',
      'uint256',
      'uint256',
      'uint256',
      'uint32',
      'uint32',
      'bytes32',
      'uint32',
      'bytes',
    ],
    [
      toBytes32(orderData.sender),
      toBytes32(orderData.recipient),
      toBytes32(orderData.inputToken),
      toBytes32(orderData.outputToken),
      orderData.amountIn,
      orderData.amountOut,
      orderData.senderNonce,
      orderData.originDomain,
      orderData.destinationDomain,
      toBytes32(orderData.destinationSettler),
      orderData.fillDeadline,
      orderData.data,
    ]
  )

  const dynamicOffsetPrefix = '0x0000000000000000000000000000000000000000000000000000000000000020'
  return dynamicOffsetPrefix + orderDataEncoded.slice(2)
}
```

### 2. Order Data Type Hash

Define the EIP-712 type string and hash for the order data:

```typescript
export const ORDER_DATA_TYPE_STRING =
  'OrderData(' +
  'bytes32 sender,' +
  'bytes32 recipient,' +
  'bytes32 inputToken,' +
  'bytes32 outputToken,' +
  'uint256 amountIn,' +
  'uint256 amountOut,' +
  'uint256 senderNonce,' +
  'uint32 originDomain,' +
  'uint32 destinationDomain,' +
  'bytes32 destinationSettler,' +
  'uint32 fillDeadline,' +
  'bytes data)'

export const ORDER_DATA_TYPE_HASH = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ORDER_DATA_TYPE_STRING))
```

### 3. Executing Intent Bridge

Here's the complete implementation for executing an intent bridge:

```typescript
export const executeIntentBridge = async (
  walletProvider: providers.ExternalProvider,
  walletAddress: string,
  fromChainId: number,
  toChainId: number,
  amount: string
) => {
  const provider = new ethers.providers.Web3Provider(walletProvider, 'any')
  const signer = provider.getSigner()

  const originChainContract = new ethers.Contract(
    process.env.ORIGIN_CHAIN_7683_CONTRACT_ADDRESS,
    ORIGIN_CHAIN_7683_ABI,
    signer
  )

  try {
    const amountAfterConversion = ethers.utils.parseUnits(amount, 18)

    // Construct order data
    const orderData: IntentOrderData = {
      sender: walletAddress,
      recipient: walletAddress,
      inputToken: '0x0000000000000000000000000000000000000000', // Native ETH
      outputToken: '0x0000000000000000000000000000000000000000', // Native ETH
      amountIn: Number(amountAfterConversion).toString(),
      amountOut: Number(amountAfterConversion).toString(), // Adjust amountOut based on the filler's fee
      senderNonce: Math.floor(Math.random() * 1e15),
      originDomain: fromChainId,
      destinationDomain: toChainId,
      destinationSettler: process.env.DESTINATION_CHAIN_7683_CONTRACT_ADDRESS,
      fillDeadline: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hour deadline
      data: '0x',
    }

    // Encode order data
    const encodedOrderData = encodeIntentOrderData(orderData)

    // Submit the intent to the contract
    const executeIntentBridgeResult = await originChainContract.open(
      {
        fillDeadline: orderData.fillDeadline,
        orderDataType: ORDER_DATA_TYPE_HASH,
        orderData: encodedOrderData,
      },
      {
        value: amountAfterConversion.toBigInt(),
      }
    )
    await executeIntentBridgeResult.wait()
  } catch (e) {
    console.error(e)
  }
}
```

### Security Considerations

- **Nonce Management**: Each intent uses a unique random nonce to prevent replay attacks
- **Deadline Protection**: 24-hour deadline prevents indefinite pending states
- **Amount Validation**: Ensure proper decimal conversion and fee calculations
