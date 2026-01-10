---
id: tee
title: TEE
sidebar_position: 3
---

Trusted Execution Environments (TEEs) are specialized hardware-based environments that isolate sensitive computations and data from the rest of the system, ensuring that data is processed correctly and privately. In particular, TEEs provide verifiable computation guarantees through a process called “Remote Attestation”, which proves to external parties that the TEE is running a specific, unmodified piece of software (bytecode) without any tampering. Verifiers can then use this proof to confirm that the TEE and its output is trustworthy. Additionally, TEEs can preserve privacy by keeping sensitive data and execution logic concealed from the system operator and external observers. In other words, TEEs are secure hardware areas that protect sensitive data and computations from tampering or unauthorized access.

At t1, we are using TEEs to enable Real-Time Priving. t1 architecture enable cross-chain composability by leveraging TEEs that:
- reliably read data from partner rollups by running fullnodes in t1 node infrastructure
- prove t1 dApp execution to Ethereum and supported rollups in real-time
This architecture enables us to achieve single block asynchrony window with Ethereum (12 seconds) and supported rollup. This approach is a substantial improvement over the current seven-day window in Optimistic Rollups and hours-long window in Zero-Knowledge Rollups and synchronous composability approaches that require shared sequencing across rollups.

In addition to RTP and cross-chain communication, TEEs allow t1 to offer an encrypted inputs. An encrypted mempool prevents adversarial reordering, such as sandwich attacks, where an attacker observes a pending transaction and places trades before (front-running) and after (back-running) it, profiting at the expense of regular users. Sandwich attacks cost Ethereum users over [$100mn every year](https://eigenphi.io/mev/ethereum/sandwich). An encrypted mempool also facilitates use cases like sealed-bid auctions and information-incomplete games.
