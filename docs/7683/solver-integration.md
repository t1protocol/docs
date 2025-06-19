# t1 intents protocol: solver integration

Our intent protocol implements the ERC 7683 specification.

The workflow is the same for intents opening, filling and settlement.


There is only a difference in the process for settlement of solvers on origin chain.

Solvers need to require a so called Proof of Read, and then use a merkle proof to get repaid.

## Workflow

Here is the full workflow from intent open to settlement (t1 specific steps with 🔴) :

1 - Intent is opened on source chain settler contract (whether on chain by user or gasslessly by solver)

2 - Solver listen for open event on source chain settler contract and fill on destination chain settler contract

🔴 3 - Solver call a verify function on source chain settler contract

🔴 4 - Solver listen for new Proof of Read commitment event on source chain XChainReader contract

🔴 5 - Solver call t1 offchain API to get the merkle proof data

🔴 6 - Solver call settlement function on source chain settler contract and get repaid

## Implementation

Here is how you integrate from step 3.

### 3 - Solver call a verify function on source chain settler contract

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

### 4 - Solver listen for new Proof of Read commitment event on source chain XChainReader contract

Location: source chain

Contract: T1XChainReader (see deployment file for address and ABI)

Timing: should be listened to once `verifySettlement` has been called

```solidity
     /// @param batchIndex The index where the Proof of Read batch has been committed
    event ProofOfReadRootCommitted(uint256 batchIndex);
```

### 5 - Solver call t1 offchain API to get the merkle proof data

Location: offchain

Timing: once a new `ProofOfReadRootCommitted` event has been emitted

Base URL: `https://api.v05.t1protocol.com`

Endpoint: `/api/read-proofs`

Method: `GET`

**Query Parameters:**
| Parameter | Type | Optional | Description | Value suggested |
|-----------|------|----------|-------------|---------|
| `address` | string | No | Address that called `verifySettlement` | - |
| `direction` | string | Yes | Direction of the read: `"L1_TO_L2"` \| `"L2_TO_L1"` | - |
| `page` | number | Yes | Page number to fetch | `1` |
| `page_size` | number | Yes | Items per page | `100` |

**Example Request:**
```bash
curl "https://api.v05.t1protocol.com/api/read-proofs?address=0x123...&direction=L1_TO_L2&page=1&page_size=100"
```

The HTTP call will return the following structure as a response :

```typescript
interface ReadProofsResponse {
  results: Result[];
  page: number;
  page_size: number;
  total: number;
}

interface Result {
  source_tx_hash: string;
  message_type: number;
  block_number: number;
  message_hash: string;
  tx_sender: string;
  direction: Direction;
  claim_info: ClaimInfo;
}

enum Direction {
  L1_TO_L2 = 'L1_TO_L2',
  L2_TO_L1 = 'L2_TO_L1',
}

interface ClaimInfo {
  from: string;
  to: string;
  value: string;
  nonce: string;
  message: string;
  x_chain_read_result: string;
  request_id: string;
  handle_read_result_with_proof_calldata: string;
  proof: {
    batch_index: string;
    merkle_proof: string;
  };
}

```

Solver will then iterate on the `results` array and find the one that matches its request.

Solver can check values like `source_tx_hash` or `tx_sender` for that.

Solver will then get the value in `claim_info.handle_read_result_with_proof_calldata` from the matching result for next step.

See more: https://docs.t1protocol.com/api/xChainRead/overview

### 6 - Solver call settlement function on source chain settler contract and get repaid

Location: source chain

Contract: T1ERC7683 (see deployment file for address and ABI)

Timing: should be called once new `ProofOfReadRootCommitted` event has been emitted and merkle proof has been fetched from API

```solidity
    /// @param encodedProofOfRead The encoded proof of read which is formatted as following:
    /// abi.encode(uint256 batchIndex, bytes32 requestId, uint256 position, bytes result, bytes proof)
    /// This is the value returned in previous step as `handle_read_result_with_proof_calldata`
    function handleReadResultWithProof(bytes encodedProofOfRead);
```
