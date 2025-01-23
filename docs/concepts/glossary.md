---
id: glossary
title: Glossary
sidebar_position: 5
---

## TEE
Trusted Execution Environments (TEEs) are specialized hardware-based environments that isolate sensitive computations and data from the rest of the system, ensuring that data is processed correctly and privately. In particular, TEEs provide verifiable computation guarantees through a process called “Remote Attestation”, which proves to external parties that the TEE is running a specific, unmodified piece of software (bytecode) without any tampering. Verifiers can then use this proof to confirm that the TEE and its output is trustworthy. Additionally, TEEs can preserve privacy by keeping sensitive data and execution logic concealed from the system operator and external observers. In other words, TEEs are secure hardware areas that protect sensitive data and computations from tampering or unauthorized access.

## ZKP
A zero-knowledge (ZK) proof is a cryptographic protocol that enables one person (the prover) to convince another (the verifier) that a particular claim is true without disclosing any details about the claim itself.

## AVS
[AVS](https://app.eigenlayer.xyz/avs) (Actively Validated Service) is a term coined by EigenLayer that refers to services or applications built on top of the Ethereum blockchain and used for security and validation mechanisms. These services could include rollups, DA layers, interoperability protocols, etc. It allows Ethereum validators to use their staked assets to provide security to other applications built on EigenLayer.

## Sequencer
Sequencers are a highly decentralized set of nodes tasked with blindly finalizing the ordering of encrypted transactions in a 𝚝𝟷 block. Since Sequencers only order transactions rather than executing them, we can achieve high decentralization and censorship resistance. Sequencers create Sequencing Consensus.

## Executor
Executors are a network of TEE-enabled nodes tasked with executing state changes given the finalized sequences of transactions (i.e. blocks) determined by the Sequencers. Executors provide proofs of Execution Consensus.

## Reth
[Reth](https://github.com/paradigmxyz/reth) (Rust Ethereum) is an Ethereum full-node implementation focused on being user-friendly, modular, fast, and efficient. Reth is an execution client compatible with all Ethereum consensus client implementations that support the Engine API. As a full Ethereum node, Reth will allow users to sync the complete Ethereum blockchain from genesis and interact with it (and its historical state, if in archive mode) once synced.

## ExEx
[Execution Extensions](https://www.paradigm.xyz/2024/05/reth-exex) (or ExExes, for short) allow developers to build their own infrastructure that relies on Reth as a base for driving the 𝚝𝟷 chain forward.