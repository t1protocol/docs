---
id: tee
title: TEE
sidebar_position: 6
---

Trusted Execution Environments (TEEs) are specialized hardware-based environments that isolate sensitive computations and data from the rest of the system, ensuring that data is processed correctly and privately. In particular, TEEs provide verifiable computation guarantees through a process called “Remote Attestation”, which proves to external parties that the TEE is running a specific, unmodified piece of software (bytecode) without any tampering. Verifiers can then use this proof to confirm that the TEE and its output is trustworthy. Additionally, TEEs can preserve privacy by keeping sensitive data and execution logic concealed from the system operator and external observers. In other words, TEEs are secure hardware areas that protect sensitive data and computations from tampering or unauthorized access.

## What t1 uses TEEs for

t1 uses them to make undercollateralized credit possible, and to make the collateral legible across the venues a borrower trades on:

- **Hold encumbered keys.** A margin account's private key is generated inside the enclave and never leaves it. The loan policy is bound to the key at creation, and the key signs only transactions that satisfy it. See [Programmable Custody](./programmable-custody.md).
- **Run the risk engine.** Position monitoring, dynamic loan-to-value, and liquidation execution run inside the enclave at market speed, and their results are attested on-chain. See [Risk Engine and Liquidation](./risk-engine.md).
- **Read other chains reliably.** t1 runs full nodes for supported chains inside its node infrastructure, so an account's exposure is computed from state that was actually read rather than reported.
- **Prove execution in real time.** State transitions are proven to Ethereum and supported rollups within a single block. See [Real-Time Proving](./rtp.md).

Remote attestation is what ties these together for a lender. It proves which binary is holding the key and running the risk engine, so "the policy is enforced" is a claim about a specific binary with a verifiable measurement, not a claim about t1's good behavior. Some subsystems already run this way and others are being moved; see [Rollout](./programmable-custody.md#rollout).

## Real-time settlement

This architecture enables us to achieve a single-block-only asynchrony window with Ethereum (12 seconds) and supported rollups. This approach is a substantial improvement over the current seven-day window in Optimistic Rollups and hours-long window in Zero-Knowledge Rollups, and also over synchronous composability approaches which require a form of shared sequencing across rollups.

## Encrypted inputs

In addition to the above, TEEs allow t1 to support encrypted inputs. An encrypted mempool prevents adversarial reordering, such as sandwich attacks, where an attacker observes a pending transaction and places trades before (front-running) and after (back-running) it, profiting at the expense of regular users. Sandwich attacks cost Ethereum users over [$100mn every year](https://eigenphi.io/mev/ethereum/sandwich). An encrypted mempool also facilitates use cases like sealed-bid auctions and information-incomplete games. This capability belongs to the decentralized network described in [Network Architecture](./architecture.md).
