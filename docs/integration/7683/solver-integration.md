---
id: solver-integration
title: Solver Integration
sidebar_label: Solver Integration
sidebar_position: 1
---

# t1 Intents Protocol: Solver Integration

Our intent protocol implements the ERC 7683 specification.

The workflow is mostly the same than in other implementations : intents are opened, filled and settled.

But it has 2 specificities : the auction system and the settlement mechanism.

## The auction

Our intent protocol uses an offchain auction system where solvers have to login.

Solvers then stream their prices to our backend.

When an intent is opened, they might get the chance to fill it if they offer the best price.

Winner gets notified off chain and can then fill and settle with the data we provide.

## The settlement

There is a difference in the process for settlement of solvers on source chain.

We use our Proof of Read system to verify the intent has correctly been filled on destination chain.

Thus, solvers need to require such a Proof of Read, and then use a merkle proof to get repaid.

## Workflow

Here is the full workflow from intent open to settlement.

The settler contract implementation is `T1ERC7683.sol`.

1 - Solver logins to t1 backend and stream its prices for token/chain pairs supported over websocket connection.

2 - Intent is opened on source chain settler contract whether on chain by user or gasslessly by t1. The intent data contains a `minAmountOut` value that is basically a lower price limit to cover slippage.

3 - t1 catches the open event on source chain settler contract and runs an auction to compute what is the best price available.

4 - Considering the best price is at least the `minAmountOut`, t1 commits the winning bid `amountOut` and solver's settlement receiver address on source settler contracts, and notifies winner solver it can fill over the websocket connection (with relevant data).

5 - Solver fills on destination chain settler contract in respect of the pricing it commited to.

6 - Solver calls a verify function on source chain settler contract that will create the Proof of Read that will check the fill on destination settler contract.

7 - Solver listens for new Proof of Read commitment event on source chain XChainReader contract.

8 - Solver calls t1 offchain API to get the merkle proof data for the Proof of Read.

9 - Solver calls settlement function on source chain settler contract by providing the merkle proof, and get repaid if the fill settlement receiver address and amountOut verified by Proof of Read match with the commited winning bid.

## Integrating the auction

Here is how you can integrate from step 1 to 5.

### 1 - Solver logins to t1 backend and stream its prices

Connect to `wss://localhost:{port}` by providing a `username` data field.

```typescript
  const socket = new WebSocket(`ws://localhost:{port}/`, {
    headers: { Authorization: "username" }
  });
  ```

Then stream you price list in the following format to the socket.

Best frequency is 1s.

```typescript
 type PriceListItem = {
    direction: Direction;
    intervals: Interval[];
    srcTokenAddresses: string[];
    dstTokenAddress: string[];
    solverAddress: string;
}

 enum Direction {
    "Base_USDC->Arbitrum_USDC",
    "Base_USDC->Arbitrum_WETH",
    "Arbitrum_USDC->Base_USDC",
    "Arbitrum_WETH->Base_USDC",
}

enum Token {
    Base_USDC = "Base_USDC",
    Base_WETH = "Base_WETH",
    Arbitrum_USDC = "Arbitrum_USDC",
    Arbitrum_WETH = "Arbitrum_WETH",
}

 type Interval = {
    range: {
        min: bigint; // must be an integer representing full tokens
        max: bigint; // must be an integer representing full tokens
    };
    rangeUnit: Token;
    price: bigint; // must be an integer representing the smallest denomination of the token
    priceUnit: Token;
};

  socket.send(JSON.stringify(priceList));

```


### 4 - t1 notifies winner solver it can fill

When an intent is opened and you win to auction, t1 backend will notify you over websocket the following way.

You will receive a JSON stringify version of the following data on your socket connection.

```typescript
interface AuctionResult {
    winner: string;
    price: bigint;
    orderId: string;
    resolvedOrder: string;
}
```

### 5 - Solver fills on destination chain

You can then use the received data to call the `fill` function on destination settler.


```solidity
/// @param originData orderData contained in resolvedOrder > fillInstructions > originData
/// @param fillerData Data provided by the filler to inform the amount they want to fill and the address they
/// want to receive the source chain settle on.
/// Formatted as: abi.encode(uint256 amountOut, address settlementReceiver)
function fill(bytes32 orderId, bytes calldata originData, bytes calldata fillerData) external payable;
```


## Settlement integration

Here is how you can integrate from step 6 to 9.

### 6 - Solver calls a verify function on source chain settler contract

Location: source chain

Contract: T1ERC7683 (see deployment file for address and ABI)

Timing: should be called once intent is filled on destination chain

```solidity
    /// @param destinationDomain The chain id of the destination chain
    /// @param gasLimit The gas limit for the read operation
    /// @param orderId The ID of the order to verify fillment
    /// @return requestId The ID of the read request
    function verifySettlement(
        uint32 destinationDomain,
        uint256 gasLimit,
        bytes32 orderId
    )
        payable
        returns (bytes32 requestId);
```

### 7 - Solver listens for new Proof of Read commitment event on source chain XChainReader contract

Location: source chain

Contract: T1XChainReader (see deployment file for address and ABI)

Timing: should be listened to once `verifySettlement` has been called

```solidity
     /// @param batchIndex The index where the Proof of Read batch has been committed
    event ProofOfReadRootCommitted(uint256 batchIndex);
```

### 8 - Solver calls t1 offchain API to get the merkle proof data

Location: offchain

Timing: once a new `ProofOfReadRootCommitted` event has been emitted

Base URL: `https://api.v06.t1protocol.com`

Endpoint: `/api/read-proofs`

Method: `GET`

**Query Parameters:**

| Parameter | Type | Optional | Description | Value suggested |

|-----------|------|----------|-------------|---------|

| `address` | string | No | Address that called `verifySettlement` | - |
| `direction` | string | Yes | Direction of the read: `"ARB_TO_BASE"` \| `"BASE_TO_ARB"` | - |
| `page` | number | Yes | Page number to fetch | `1` |
| `page_size` | number | Yes | Items per page | `100` |

**Example Request:**

```bash
curl "https://api.v06.t1protocol.com/api/read-proofs?address=0x123...&direction=ARB_TO_BASE&page=1&page_size=100"
```

The HTTP call will return the following structure as a response :

```typescript
interface ReadProofsResponse {
  results: Result[]
  page: number
  page_size: number
  total: number
}

interface Result {
  source_tx_hash: string
  message_type: number
  block_number: number
  message_hash: string
  tx_sender: string
  direction: Direction
  claim_info: ClaimInfo
}

enum Direction {
  ARB_TO_BASE = 'ARB_TO_BASE',
  BASE_TO_ARB = 'BASE_TO_ARB',
}

interface ClaimInfo {
  from: string
  to: string
  value: string
  nonce: string
  message: string
  x_chain_read_result: string
  request_id: string
  handle_read_result_with_proof_calldata: string
  proof: {
    batch_index: string
    merkle_proof: string
  }
}
```

Solver will then iterate on the `results` array and find the one that matches its request.

Solver can check values like `source_tx_hash` or `tx_sender` for that.

Solver will then get the value in `claim_info.handle_read_result_with_proof_calldata` from the matching result for next step.

See more: https://docs.t1protocol.com/api/xChainRead/overview

### 9 - Solver calls settlement function on source chain settler contract and get repaid

Location: source chain

Contract: T1ERC7683 (see deployment file for address and ABI)

Timing: should be called once new `ProofOfReadRootCommitted` event has been emitted and merkle proof has been fetched from API

```solidity
    /// @param encodedProofOfRead The encoded proof of read which is formatted as following:
    /// abi.encode(uint256 batchIndex, bytes32 requestId, uint256 position, bytes result, bytes proof)
    /// This is the value returned in previous step as `handle_read_result_with_proof_calldata`
    function handleReadResultWithProof(bytes encodedProofOfRead);
```
