/**
 * t1 Protocol - Proof of Read Verification Example Script
 *
 * This script demonstrates how to fetch and verify cross-chain read proofs using the t1 Protocol.
 * It retrieves Merkle proofs for cross-chain read operations from t1's API and verifies them on-chain via t1 XChainReader contract.
 *
 * Before running this script, ensure you have:
 * 1. Node.js and npm installed
 * 2. Installed dependencies (ethers.js)
 * 3. A valid Ethereum address that has performed cross-chain reads through t1 Protocol
 *
 * Usage: node fetchAndVerifyProofOfRead <requester_address> <direction>
 * - requester_address: The Ethereum address that initiated cross-chain reads
 * - direction: Either "ARB_TO_BASE" or "BASE_TO_ARB" for the cross-chain direction
 *
 * Example: node fetchAndVerifyProofOfRead 0x1234567890123456789012345678901234567890 ARB_TO_BASE
 */

import { ethers } from 'ethers';

enum Direction {
  ARB_TO_BASE = 'L1_TO_L2',
  BASE_TO_ARB = 'L2_TO_L1',
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

interface Result {
  source_tx_hash: string;
  message_type: number;
  block_number: number;
  message_hash: string;
  tx_sender: string;
  direction: Direction;
  claim_info: ClaimInfo;
}

interface ReadProofsResponse {
  results: Result[];
  page: number;
  page_size: number;
  total: number;
}

interface VerifiedProofReturn {
  requestId: string;
  result: string;
}

const XCHAINREADER_ABI = [
  'function verifyProofOfRead(bytes encodedProofOfRead) external view returns (bytes32, bytes)',
];
const API_BASE_URL = 'https://api.v05.t1protocol.com/api';
const ARB_RPC_URL = 'https://arbitrum-sepolia-rpc.publicnode.com';
const BASE_RPC_URL = 'https://base-sepolia-rpc.publicnode.com';
const ARB_XCHAINREADER_ADDRESS = '0x42d389A9007e446b92C0ce7bd8F42Ea10292881B';
const BASE_XCHAINREADER_ADDRESS = '0x3821b214B4c9D053fa744dc2B355E2039696dFb7';

async function getMerkleProofs(
  address: string,
  direction: Direction,
  page: number = 1,
  pageSize: number = 100,
): Promise<ReadProofsResponse> {
  const url = `${API_BASE_URL}/read-proofs?address=${address}&direction=${direction}&page=${page}&page_size=${pageSize}`;

  console.log(`Fetching Merkle proofs from: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch proofs: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = await response.json();
  return data;
}

async function verifyProofOfRead(
  direction: Direction,
  proofCalldata: string,
): Promise<VerifiedProofReturn | undefined> {
  const provider = new ethers.JsonRpcProvider(
    direction === Direction.ARB_TO_BASE ? ARB_RPC_URL : BASE_RPC_URL,
  );
  const contract = new ethers.Contract(
    direction === Direction.ARB_TO_BASE
      ? ARB_XCHAINREADER_ADDRESS
      : BASE_XCHAINREADER_ADDRESS,
    XCHAINREADER_ABI,
    provider,
  );

  try {
    const response = await contract.verifyProofOfRead(proofCalldata);
    return { requestId: response[0], result: response[1] };
  } catch (error) {
    console.error('Error verifying proof:', error);
    return undefined;
  }
}

async function main() {
  const address = process.argv[2];
  const direction = process.argv[3];

  if (
    !address ||
    (direction !== 'ARB_TO_BASE' && direction !== 'BASE_TO_ARB')
  ) {
    console.error(
      'Usage: npm run dev <requester_address> <direction: "ARB_TO_BASE" | "BASE_TO_ARB">',
    );
    process.exit(1);
  }

  const parsedDirection =
    direction === 'ARB_TO_BASE' ? Direction.ARB_TO_BASE : Direction.BASE_TO_ARB;

  try {
    console.log(`Getting Merkle proofs for address: ${address}`);

    const response = await getMerkleProofs(address, parsedDirection);

    if (response.results.length === 0) {
      console.log('No proofs found for this address.');
      return;
    }

    console.log(`Found ${response.results.length} proof(s)`);

    for (let i = 0; i < response.results.length; i++) {
      const item = response.results[i];

      console.log(`\nVerifying proof ${i + 1}/${response.results.length}:`);
      console.log(`- Request ID: ${item.claim_info.request_id}`);
      console.log(`- Source TX Hash: ${item.source_tx_hash}`);
      console.log(`- Batch Index: ${item.claim_info.proof.batch_index}`);

      const res = await verifyProofOfRead(
        parsedDirection,
        item.claim_info.handle_read_result_with_proof_calldata,
      );

      if (!res) {
        console.log('Proof verification FAILED');
      } else {
        console.log('Proof verification SUCCESSFUL');
      }
    }

    console.log('\nProof verifications completed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);
