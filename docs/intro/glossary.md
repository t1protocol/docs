---
id: glossary
title: Glossary
sidebar_position: 5
---

## Programmable custody

t1's name for custody that is enforced by code rather than by an institution. A margin account's private key is held inside a [TEE](#tee) and bound to a [loan policy](#loan-policy) at creation, so the key signs a transaction only if the policy permits it. The borrower can direct the capital and can never withdraw it. See [Programmable Custody](/intro/protocol/programmable-custody).

## Private key encumbrance

The academic term for a key whose holder cannot use it freely, because the conditions under which it will sign are fixed outside their control. Programmable custody is an applied form of it.

## Encumbered key

The keypair controlling a [margin account](#margin-account). Generated inside the TEE, with the private half never leaving it, and bound to a loan policy at the moment of creation. The binding cannot be redone, so an account's policy is fixed for its whole life.

## Margin account

The account t1 lends into: one per borrower, holding their own deposit plus the credit drawn against it, and appearing as the trading address at every venue the policy permits. Positions held on separate venues resolve into this single account. See [Margin Accounts](/intro/protocol/margin-accounts).

## Loan policy

The rules an encumbered key enforces: the permitted venues and assets, the maximum position size, and the liquidation threshold. Set by the lender when a [lending pool](#lending-pool) is created, and immutable thereafter. A pool's interest rate is a separate parameter and is not fixed this way.

## Signature gate

The point at which a policy is applied. Every transaction an account would make — a borrower's trade, a withdrawal attempt, a liquidation — is presented to the encumbered key, which signs it or does not.

## Lending pool

Where credit comes from. Lenders deposit capital into a pool, the pool carries a loan policy, and every margin account borrowing from it is bound to that policy. A lender wanting different parameters creates a different pool. See [Lending Pools](/intro/protocol/lending-pools).

## LTV

_Loan-to-value_ is the ratio of the credit drawn against a margin account to the current value of what backs it. The policy's _liquidation threshold_ is the LTV at which the risk engine begins closing the position.

## Liquidation

Closing a position to protect the lender's principal when an account's LTV crosses its liquidation threshold. On t1 a liquidation is an ordinary transaction through the signature gate — it is permitted by the policy, so the key signs it, and the borrower has no way to block it. See [Risk Engine and Liquidation](/intro/protocol/risk-engine).

## TEE

_Trusted Execution Environments_ ([TEEs](https://tee.fyi/)) are specialized hardware-based environments that isolate sensitive computations and data from the rest of the system, ensuring that data is processed correctly and (optionally) privately.

In particular, TEEs provide verifiable computation guarantees through a process called “Remote Attestation” which proves to external verifying parties that the TEE in question is running a specific, unmodified piece of software (bytecode), without any tampering. Verifiers can then use this attestation and combine it with an understanding of what the bytecode is doing in order to confirm that a TEE’s output is indeed trustworthy.

Optionally, TEEs can preserve privacy by keeping sensitive data and execution logic concealed from the broader system and external observers.

## Remote attestation

The proof a TEE produces of which code it is running. For a lender it is the load-bearing piece: it is what turns "the policy is enforced" from a claim about t1's behavior into a claim about a published binary with a verifiable measurement.

## ZKP

A _zero-knowledge (ZK) proof_ is a cryptographic protocol that enables one entity (the prover) to convince another one (the verifier) that a particular claim is true without disclosing any details about the claim itself. ZKPs used in blockchains are mostly used due to their succinctness property—meaning that the work required by the verifier to check the proof is substantially smaller than the work of re-running the computation required to reach the claim independently.

## RTP

_Real-Time Proving_ is the ability to prove state transitions in a rollup within one base layer block, which is 12 seconds for Ethereum L1. For example, this allows previous rollup deposits to be withdrawn immediately (real-time settlement). In the credit protocol it is what lets positions on separate venues resolve into one margin account with proven, rather than reported, state.

## Reth

[_Reth_](https://github.com/paradigmxyz/reth) (aka _Rust Ethereum_) is an Ethereum execution node implementation focused on being user-friendly, modular, and efficient. Reth is an execution client compatible with all Ethereum consensus client implementations that support the Engine API. As a full Ethereum node, Reth will allow users to sync the complete Ethereum blockchain from genesis and interact with it (and its historical state, if in archive mode) once synced.

## Reth ExEx

[_Execution Extensions_](https://www.paradigm.xyz/2024/05/reth-exex) (aka _ExEx_) are a feature of Reth that allows developers to receive comprehensive data about a newly “mined” block in an observer-listener pattern. Thanks to this, developers can perform actions based on certain changes on the blockchain in an efficient and seamless way.

## Sequencer

A term from t1's [long-term network design](/intro/protocol/architecture). _Sequencers_ are a highly decentralized set of nodes tasked with blindly finalizing the ordering of partially-encrypted transactions in a t1 block. Since Sequencers only order transactions rather than executing them (meaning lower hardware and network requirements, in particular no TEE requirement), t1 can achieve high decentralization and censorship resistance. Sequencers provide proofs of _Sequencing Consensus_. For details, check t1's [litepaper](/intro/resources#t1-vision-litepaper).

## Executor

A term from t1's [long-term network design](/intro/protocol/architecture). _Executors_ are a network of TEE-enabled nodes tasked with executing state changes given the ordered sequences of transaction bundles determined by the Sequencers. Executors provide proofs of _Execution Consensus_. For details, check t1's [litepaper](/intro/resources#t1-vision-litepaper).
