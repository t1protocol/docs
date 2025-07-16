---
id: intro
title: Introduction
sidebar_position: 1
---

t1 is the cross-chain application infrastructure that introduces real-time proving and programmability to bring money legos cross-chain. We unlock composable applications across the EVM ecosystem.

- **Real-time proving**: Using Trusted Execution Environments (TEEs), t1 proves its execution integrity to Ethereum in under 12 seconds. By running partner rollup follower nodes within its infrastructure, t1 also aggregates and proves their combined state to Ethereum in 1 L1 block—enabling instant settlement between Ethereum and any partner rollup.
- **Programmability**: t1 smart contracts are able to read from and write to Ethereum and partner rollups.

Composability requires applications to read from and write to each other’s state. Developers can use smart contracts on t1 to:

1.  Use inputs from other rollups (as t1 runs partner rollup full nodes to read their state)
2.  Write to applications on other rollups to update their state.
    These primitives can be used to enhance existing applications that are deployed on multiple chains or build a new generation of cross-chain applications.

First, t1 runs full nodes of partner rollups inside its node infrastructure to read from partner rollups. This allows t1 to prove its or a partner rollups state back to Ethereum in a single L1 block. Second, t1 uses more expressive deposit contracts that are deployed on all partner rollups as well as Ethereum. As a result, t1 can not only read, but also write to partner rollups. Combined, these properties create the needed architecture for cross-chain applications and liquidity hubs.

t1 delivers the missing infrastructure for building cross-chain applications—something not possible today. Currently, apps must deploy on multiple rollups, fragmenting liquidity and user experience. t1 enables cross-chain application workflows such as cross-chain vaults that automate the movement of user funds across different rollups to ensure that the user gets the highest yield in a non-custodial way. With t1, apps can deploy once and serve users anywhere.
