---
id: introduction
title: Introduction
sidebar_position: 1
---

The t1 infrastructure allows developers to build composable appchains across the Ethereum rollup ecosystem, enabling fragmenation-free, interoperable scaling. This is possible thanks to:

- **Real-Time Proving**: Using Trusted Execution Environments (TEEs), t1 instantly proves its execution integrity to Ethereum and rollups.
- **Programmability**: t1 dApps can host arbitrary logic and are able to read from as well as write to Ethereum and rollups.

This allows for seamless cross-chain applications and shared liquidity.

Developers can use smart contracts on t1 to:

1.  Use inputs from other rollups (as t1 runs partner rollup full nodes to read their state)
2.  Write to applications on other rollups to update their state.
    These primitives can be used to enhance existing applications that are deployed on multiple chains or build a new generation of cross-chain applications.

First, t1 runs full nodes of partner rollups inside its node infrastructure to read from partner rollups. This allows t1 to prove its or a partner rollups state back to Ethereum in a single L1 block. Second, t1 uses more expressive deposit contracts that are deployed on all partner rollups as well as Ethereum. As a result, t1 can not only read, but also write to partner rollups. Combined, these properties create the needed architecture for cross-chain applications and liquidity hubs.

t1 delivers the missing infrastructure for building cross-chain applications. So far, apps had to deploy on multiple rollups, fragmenting liquidity and user experience. t1 enables cross-chain application workflows such as cross-chain vaults that automate the movement of user funds across different rollups to ensure that the user gets the highest yield in a non-custodial way. With t1, apps can deploy once and serve users anywhere.
