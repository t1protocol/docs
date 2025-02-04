---
id: rtp
title: Real-Time Proving
sidebar_position: 2
---

Real-time proving (RTP) enables immediate validation of computations, allowing systems to verify correct execution with minimal latency. This capability is particularly impactful in in blockchain ecosystems such as Ethereum, where the proliferation of layer 2 rollups has led to liquidity fragmentation and overall user experience degredation. RTP enhances composability by allowing chains and rollups to securely and efficiently interact with one another in near real-time, facilitating cross-chain operations such as asset transfers, contract calls, and state updates.

Within a Trusted Execution Environment (TEE), the computation of rollup state transitions can be securely executed, producing cryptographic proofs that attest to the correctness of these transitions. These proofs can be immediately submitted to other chains or Ethereum without requiring the delays associated with traditional mechanisms like ZK rollups or optimistic rollups.

By leveraging TEEs, RTP allows chains and rollups to rely on less trust assumptions while enabling near-instantaneous interaction with other chains. This real-time interaction reduces friction for developers and users, unlocking advanced use cases such as dynamic liquidity provisioning and seamless multi-chain dApp experiences.