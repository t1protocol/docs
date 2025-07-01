---
id: tee
title: TEE
sidebar_position: 2
---

Trusted Execution Environments (TEEs) are specialized hardware-based environments that isolate sensitive computations and data from the rest of the system, ensuring that data is processed correctly and privately. In particular, TEEs provide verifiable computation guarantees through a process called “Remote Attestation”, which proves to external parties that the TEE is running a specific, unmodified piece of software (bytecode) without any tampering. Verifiers can then use this proof to confirm that the TEE and its output is trustworthy. Additionally, TEEs can preserve privacy by keeping sensitive data and execution logic concealed from the system operator and external observers. In other words, TEEs are secure hardware areas that protect sensitive data and computations from tampering or unauthorized access.

Two key requirements for achieving full unification of Ethereum and the rollup ecosystem, without reorg risks and asynchrony at all, are shared sequencing across all chains and real-time proving (RTP). At t1, we are working on RTP by employing TEEs. However, TEEs also help with cross-chain composability by enabling lightclients in t1 to reliably read data from and write data to partner rollups. This setup allows t1 to effectively aggregate the state of Ethereum and partner rollups. Our current design, which does not rely on shared sequencing, enables t1 to have as low as a single-block asynchrony window (12 seconds) with Ethereum—a substantial improvement over the current seven-day window in Optimistic Rollups and hours-long window in Zero-Knowledge Rollups.

In addition to RTP and cross-chain communication, TEEs allow t1 to offer an encrypted mempool. An encrypted mempool prevents adversarial reordering, such as sandwich attacks, where an attacker observes a pending transaction and places trades before (front-running) and after (back-running) it, profiting at the expense of regular users. Sandwich attacks cost Ethereum users over [$100mn every year](https://eigenphi.io/mev/ethereum/sandwich). An encrypted mempool also facilitates use cases like sealed-bid auctions and information-incomplete games.
