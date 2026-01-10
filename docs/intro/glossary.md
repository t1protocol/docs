---
id: glossary
title: Glossary
sidebar_position: 4
---

## TEE

_Trusted Execution Environments_ ([TEEs](https://tee.fyi/)) are specialized hardware-based environments that isolate sensitive computations and data from the rest of the system, ensuring that data is processed correctly and (optionally) privately.

In particular, TEEs provide verifiable computation guarantees through a process called “Remote Attestation” which proves to external verifying parties that the TEE in question is running a specific, unmodified piece of software (bytecode), without any tampering. Verifiers can then use this attestation and combine it with an understanding of what the bytecode is doing in order to confirm that a TEE’s output is indeed trustworthy.

Optionally, TEEs can preserve privacy by keeping sensitive data and execution logic concealed from the broader system and external observers.

## ZKP

A _zero-knowledge (ZK) proof_ is a cryptographic protocol that enables one entity (the prover) to convince another one (the verifier) that a particular claim is true without disclosing any details about the claim itself. ZKPs used in blockchains are mostly used due to their succinctness property—meaning that the work required by the verifier to check the proof is substantially smaller than the work of re-running the computation required to reach the claim independently.

## AVS

[_Autonomous Verifiable Services_](https://app.eigenlayer.xyz/avs) is a term coined by EigenLayer that refers to services or applications built on top of the Ethereum blockchain, reusing it for security and validation mechanisms. These services could include rollups, DA layers, interoperability protocols etc. AVS effectively allows Ethereum validators to use their staked assets to provide security to other applications than just Ethereum itself.

## Reth

[_Reth_](https://github.com/paradigmxyz/reth) (aka _Rust Ethereum_) is an Ethereum execution node implementation focused on being user-friendly, modular, and efficient. Reth is an execution client compatible with all Ethereum consensus client implementations that support the Engine API. As a full Ethereum node, Reth will allow users to sync the complete Ethereum blockchain from genesis and interact with it (and its historical state, if in archive mode) once synced.

## Reth ExEx

[_Execution Extensions_](https://www.paradigm.xyz/2024/05/reth-exex) (aka _ExEx_) are a feature of Reth that allows developers to receive comprehensive data about a newly “mined” block in an observer-listener pattern. Thanks to this, developers can perform actions based on certain changes on the blockchain in an efficient and seamless way.

## RTP

_Real-Time Proving_ is the ability to prove state transitions in a rollup within one base layer block, which is 12 seconds for Ethereum L1. For example, this allows previous rollup deposits to be withdrawn immediately (real-time settlement).

## Sequencer

_Sequencers_ are a highly decentralized set of nodes tasked with blindly finalizing the ordering of partially-encrypted transactions in a t1 block. Since Sequencers only order transactions rather than executing them (meaning lower hardware and network requirements, in particular no TEE requirement), t1 can achieve high decentralization and censorship resistance. Sequencers provide proofs of _Sequencing Consensus_. For details, check t1's [litepaper](/intro/resources#t1-litepaper).

## Executor

_Executors_ are a network of TEE-enabled nodes tasked with executing state changes given the ordered sequences of transaction bundles determined by the Sequencers. Executors provide proofs of _Execution Consensus_. For details, check t1's [litepaper](/intro/resources#t1-litepaper).
