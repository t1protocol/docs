---
id: glossary
title: Glossary
sidebar_position: 4
---

## TEE

Trusted Execution Environments (TEEs) are specialized hardware-based environments that isolate sensitive computations and data from the rest of the system, ensuring that data is processed correctly and privately. In particular, TEEs provide verifiable computation guarantees through a process called “Remote Attestation,” which proves to external parties that the TEE is running a specific, unmodified piece of software (bytecode) without any tampering. Verifiers can then use this attestation to confirm that a TEE’s output is trustworthy. Additionally, TEEs can preserve privacy by keeping sensitive data and execution logic concealed from the system operator and external observers. In other words, TEEs are secure hardware areas that protect sensitive data and computations from tampering or unauthorized access.

## ZKP

A zero-knowledge (ZK) proof is a cryptographic protocol that enables one entity (the prover) to convince another one (the verifier) that a particular claim is true without disclosing any details about the claim itself. ZKPs used in blockchains are additionally succinct, meaning that the work required by the verifier to check the proof is substantially smaller than the work of re-running the computation required to reach the claim independently.

## AVS

[AVS](https://app.eigenlayer.xyz/avs) is a term coined by EigenLayer that refers to services or applications built on top of the Ethereum blockchain and used for security and validation mechanisms. These services could include rollups, DA layers, interoperability protocols, etc. It allows Ethereum validators to use their staked assets to provide security to other applications built on EigenLayer.

## Reth

[Reth](https://github.com/paradigmxyz/reth) (Rust Ethereum) is an Ethereum execution node implementation focused on being user-friendly, modular, and efficient. Reth is an execution client compatible with all Ethereum consensus client implementations that support the Engine API. As a full Ethereum node, Reth will allow users to sync the complete Ethereum blockchain from genesis and interact with it (and its historical state, if in archive mode) once synced.

## Reth ExEx

[Execution Extensions](https://www.paradigm.xyz/2024/05/reth-exex) aka ExEx is a feature of Reth that allows developers to receive comprehensive data about a newly “mined” block in an observer-listener pattern. Thanks to this, developers can perform actions based on certain changes on the blockchain in an efficient and seamless way.

## Real-Time Proving (RTP)

RTP is the ability to prove state transitions in a rollup within one base layer block, which is 12 seconds for Ethereum L1. Real-time proving, for example, allows rollup deposits to be withdrawn immediately (real-time settlement).

## Sequencer

Sequencers are a highly decentralized set of nodes tasked with blindly finalizing the ordering of encrypted transactions in a t1 block. Since Sequencers only order transactions rather than executing them, we can achieve high decentralization and censorship resistance. Sequencers create Sequencing Consensus. [More](https://www.notion.so/t1protocol/Litepaper-9a2cc4d321ce4a08a4905aa809fb436e?source=copy_link#107231194dc380e7a4b2e58c1682a6cd)

## Executor

Executors are a network of TEE-enabled nodes tasked with executing state changes given the ordered sequences of transactions (i.e. bundles) determined by the Sequencers. Executors provide proofs of Execution Consensus. [More](https://www.notion.so/t1protocol/Litepaper-9a2cc4d321ce4a08a4905aa809fb436e?source=copy_link#107231194dc3807b9e31e2a937f8da67)
