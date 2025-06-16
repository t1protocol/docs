---

id: api-reference
title: API Reference
sidebar_label: API Reference
sidebar_position: 2
---

# API Reference

### Get Read Proofs
Retrieve proof data for cross-chain read requests.

**URL**: https://api.v05.t1protocol.com/api/read-proofs

**Parameters**:
- `address` (string, required): Your contract address
- `direction` (string, optional): L1_TO_L2 or L2_TO_L1
- `page` (number, optional): Page number
- `page_size` (number, optional): Results per page

**Example**:
https://api.v05.t1protocol.com/api/read-proofs?address=0x81B5e00e15fb3ee055aB5e616Ccb52fA935D3534&direction=L1_TO_L2&page=1&page_size=100


**Response Format**:

```json
{
  "source_tx_hash": "0xc40c2adee606e05a4c40f26f13c6066ddfabcac9467fdbf7450dac7a644f3d9e",
  "message_type": 4, // xChainRead
  "block_number": 163780939,
  "message_hash": "0x94cdea443c0f6034de6bdf781ce159055546c0e42632db5215558c392088ee8f",
  "tx_sender": "0x42d389A9007e446b92C0ce7bd8F42Ea10292881B",
  "direction": "L1_TO_L2", // Arbitrum Sepolia to Base Sepolia
  "claim_info": {
    "from": "0x81B5e00e15fb3ee055aB5e616Ccb52fA935D3534",
    "to": "0xf96B8CcB029E0932fe36da0CeDd2b035E2c1695d", 
    "value": "0",
    "nonce": "4",
    "message": "0xe11680cd0000000000000000000000000000000000000000000000000000000000014a34000000000000000000000000f96b8ccb029e0932fe36da0cedd2b035e2c1695d374f3efe8b19f4937fadee47d33f93d66a6dd62f5141d8efa41bf5de64f6e53a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000081b5e00e15fb3ee055ab5e616ccb52fa935d35340000000000000000000000000000000000000000000000000000000000000024ebd45ba21b50198add4a3fd45e9b53bf0a37bd0859d912cfdde54efefe31a0a0fc203b1f00000000000000000000000000000000000000000000000000000000",
    "x_chain_read_result": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000011b50198add4a3fd45e9b53bf0a37bd0859d912cfdde54efefe31a0a0fc203b1f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000004c408e9bed2426840112ed5fc1c438356a1fd162",
    "request_id": "0x374f3efe8b19f4937fadee47d33f93d66a6dd62f5141d8efa41bf5de64f6e53a",
    "handle_read_result_with_proof_calldata": "0x0000000000000000000000000000000000000000000000000000000000000004374f3efe8b19f4937fadee47d33f93d66a6dd62f5141d8efa41bf5de64f6e53a000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000011b50198add4a3fd45e9b53bf0a37bd0859d912cfdde54efefe31a0a0fc203b1f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000004c408e9bed2426840112ed5fc1c438356a1fd16200000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5ada0adf42ef09dfcc8f39ea7a22fb33de614899ddecc8558ab5ba341febd990b",
    "proof": {
      "batch_index": "4",
      "merkle_proof": "0000000000000000000000000000000000000000000000000000000000000000ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5ada0adf42ef09dfcc8f39ea7a22fb33de614899ddecc8558ab5ba341febd990b"
    }
  }
}
```

### Key Fields

| Field | Description |
|-------|-------------|
| `source_tx_hash` | Transaction hash that initiated the read request |
| `message_type` | Message type (4 = xChainRead) |  
| `block_number` | Block number when request was submitted |
| `request_id` | Unique identifier for the read request |
| `x_chain_read_result` | Raw ABI-encoded result from target function |
| `handle_read_result_with_proof_calldata` | **Ready-to-use calldata for your contract** |
| `proof.batch_index` | Batch containing this read result |
| `proof.merkle_proof` | Cryptographic proof for verification |

:::tip
The `handle_read_result_with_proof_calldata` field contains pre-encoded calldata that you can directly submit to your contract's `handleReadResultWithProof` function.
:::

## Smart Contract API

### `T1XChainReader` Interface

```solidity
interface T1XChainReader {
    struct ReadRequest {
        uint32 destinationDomain;
        address targetContract;
        uint256 gasLimit;
        uint64 minBlock;
        bytes callData;
        address requester;
    }

    function requestRead(
        ReadRequest calldata request
    ) external payable returns (bytes32 requestId);
    
    function verifyProofOfRead(
        bytes calldata encodedProofOfRead  
    ) external view returns (bytes32 requestId, bytes memory result);
}
```

### Events

```solidity
event ReadRequested(
    bytes32 indexed requestId,
    uint32 indexed destinationDomain,
    address targetContract,
    address requester,
    uint256 gasLimit,
    uint64 minBlock,
    bytes callData,
    uint256 nonce
);

event ProofOfReadRootCommitted(uint256 batchIndex);
```

### Proof Encoding Format

Proofs use the following ABI encoding:
```solidity
abi.encode(
    uint256 batchIndex,    // index of the batch posted by the prover
    bytes32 requestId,     // requestId of the read request
    uint256 position,      // position in merkle tree
    bytes result,          // raw function result, ABI-encoded
    bytes proof            // merkle proof
)
```