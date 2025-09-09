---
id: aggregator-integration
title: Aggregator Integration
sidebar_label: Aggregator Integration
sidebar_position: 2
---

# Aggregator Integration for t1 Intent Bridging

This guide explains how to integrate the t1 intent bridging mechanism into your frontend application. It covers encoding the order data, estimating gas, and executing the bridge transaction.

## Overview

The t1 Intent Bridge facilitates cross-chain token transfers using a Trusted Execution Environment (TEE) based proving system. Users express their intent to bridge tokens, and fillers compete to fulfill these intents. TEE-based xChainRead enables solvers to get repaid in less than 10 seconds, improving capital efficiency for solvers and providing better execution and rates for users.

## How it works

The t1 Intent Bridge operates through a standardized intent protocol that is based on ERC-7683 standard:

1. **Intent Creation**: Users create an intent specifying source and destination tokens, amounts, and execution parameters
2. **Order Encoding**: The intent is encoded according to ERC-7683 standards with proper ABI encoding
3. **On-Chain Submission**: The encoded intent is submitted to the origin chain contract
4. **Filler Execution**: Off-chain fillers monitor intents and compete to fulfill them on the destination chain
5. **Settlement**: Once filled, the intent is marked as complete and funds are released

## Integration Overview

The main components of aggregator integration are:

- Querying `minAmountOut` from API
- Encoding intent order data in a Solidity-compatible format.
- Executing the bridge intent with custom parameters.

### 1. Querying minAmountOut via API

To obtain a pre-auction bid, query the POST `${baseUrl}/preauction` API:

```bash
curl --location 'https://{baseUrl}/preauction' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "uuid",
    "srcTokenAddress": "0x...",
    "dstTokenAddress": "0x...",
    "srcChainId": 1,
    "dstChainId": 137,
    "amountIn": "1000000000000000000"
  }'
```


**Request Parameters:**

- `id`: randomly generated v4 uuid
- `srcTokenAddress`: input token address
- `dstTokenAddress`: output token address
- `srcChainId`: input chain id
- `dstChainId`: output chain id
- `amountIn`: input amount in units

Your response should look like this:

```typescript
interface Quote {
  id: string
  request: {
    srcChainId: number
    dstChainId: number
    srcTokenAddress: string
    dstTokenAddress: string
    amountIn: number
  }
  amountOut: string
  solverAddress: string
  timestamp: number
}
```

We can obtain the `amountOut` and use it as `minAmountOut` in our intent.

### 2. Encoding Order Data

To prepare the order data for execution, use the `encodeIntentOrderData` function. This ensures the `bytes` format is correctly aligned for the 7683 contract.

#### IntentOrderData Type Definition

```typescript
export type IntentOrderData = {
  sender: string // padded address
  recipient: string // padded address
  inputToken: string // padded address
  outputToken: string // padded address
  amountIn: string
  minAmountOut: string
  senderNonce: number
  originDomain: number
  destinationDomain: number
  destinationSettler: string // padded address
  fillDeadline: number
  closedAuction: boolean
  data: string // hex string like "0x"
}
```

```typescript
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
      'boolean',
      'bytes',
    ],
    [
      toBytes32(orderData.sender),
      toBytes32(orderData.recipient),
      toBytes32(orderData.inputToken),
      toBytes32(orderData.outputToken),
      orderData.amountIn,
      orderData.minAmountOut,
      orderData.senderNonce,
      orderData.originDomain,
      orderData.destinationDomain,
      toBytes32(orderData.destinationSettler),
      orderData.fillDeadline,
      orderData.closedAuction,
      orderData.data,
    ],
  )

  const dynamicOffsetPrefix = '0x0000000000000000000000000000000000000000000000000000000000000020'
  return dynamicOffsetPrefix + orderDataEncoded.slice(2)
}
```

### 3. Order Data Type Hash

Define the EIP-712 type string and hash for the order data:

```typescript
export const ORDER_DATA_TYPE_STRING =
  'OrderData(' +
  'bytes32 sender,' +
  'bytes32 recipient,' +
  'bytes32 inputToken,' +
  'bytes32 outputToken,' +
  'uint256 amountIn,' +
  'uint256 minAmountOut,' +
  'uint256 senderNonce,' +
  'uint32 originDomain,' +
  'uint32 destinationDomain,' +
  'bytes32 destinationSettler,' +
  'uint32 fillDeadline,' +
  'bool closedAuction,' +
  'bytes data)'

export const ORDER_DATA_TYPE_HASH = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ORDER_DATA_TYPE_STRING))
```

### 4. Executing Intent Bridge

Here's the complete implementation for executing an intent bridge:

```typescript

// Define TokenInfo type
interface TokenInfo {
  address: string
  decimal: number
}

export const executeIntentBridge = async (
  walletProvider: providers.ExternalProvider,
  walletAddress: string,
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  fromChainId: number,
  toChainId: number,
  amount: string,
  amountOut: string, // Get this from the /preauction API response
) => {
  const provider = new ethers.providers.Web3Provider(walletProvider, 'any')
  const signer = provider.getSigner()

  const originChainContract = new ethers.Contract(
    process.env.ORIGIN_CHAIN_7683_CONTRACT_ADDRESS!,
    ORIGIN_CHAIN_7683_ABI,
    signer,
  )

  try {
    const amountInAfterConversion = ethers.utils.parseUnits(amount, tokenIn.decimal)
    const amountOutAfterConversion = ethers.utils.parseUnits(amountOut, tokenOut.decimal)

    // Construct order data
    const orderData: IntentOrderData = {
      sender: walletAddress,
      recipient: walletAddress,
      inputToken: tokenIn.address,
      outputToken: tokenOut.address,
      amountIn: Number(amountInAfterConversion).toString(),
      minAmountOut: Number(amountOutAfterConversion).toString(), // Get minAmountOut from our /preauction API
      senderNonce: Math.floor(Math.random() * 1e15),
      originDomain: fromChainId,
      destinationDomain: toChainId,
      destinationSettler: process.env.DESTINATION_CHAIN_7683_CONTRACT_ADDRESS!,
      fillDeadline: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hour deadline
      closedAuction: true, // this will always be true if you are using our closed auction api
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
      // only if you are transferring native ETH, else remove this block
      {
        value: amountInAfterConversion.toBigInt(),
      },
    )
    await executeIntentBridgeResult.wait()
  } catch (e) {
    console.error(e)
  }
}
```

## Security Considerations

- **Nonce Management**: Each intent uses a unique random nonce to prevent replay attacks
- **Deadline Protection**: 24-hour deadline prevents indefinite pending states
- **Amount Validation**: Ensure proper decimal conversion and fee calculations
