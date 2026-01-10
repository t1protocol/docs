---
title: Docker Overview
sidebar_label: Docker Overview
sidebar_position: 1
---

# Docker dApps Overview

t1 lets developers run their own Docker-packaged code as a dApp and benefit from t1's secured TEE architecture as well as its dedicated cross-chain capabilities.

_Warning: This is an early feature which is under heavy development and should not be used in production._

Moreover, sharing liquidity between such dApps will be possible natively soon.

## How t1 Supports Docker

A t1 TEE node is always running a `t1-core` Docker image which exposes dedicated endpoints for cross-chain interactions.

A third-party developer is able to have t1 pull a `t1-dapp` Docker image prepared by them and run it within the same TEE.

Therefore, such third-party dApp becomes co-located with `t1-core` and allowed to call its predefined methods via regular Docker-to-Docker communication.

## Endpoints Provided

Once your `t1-dapp` is deployed to t1, it can call the following predefined methods exposed by the TEE-co-located `t1-core`:

- `initIdentity(callbackOnDeposit)`
  - Initializes a TEE-controlled multi-chain EOA identity which can accept user deposits and act on users' behalf
  - Accepts one parameter: A function which shall be called on `t1-dapp` whenever there is a deposit into the initialized identity
- `sendTx(chainId, payload, callback)`
  - Instructs the TEE-controlled identity to request a transaction to be sent to a chain
  - Accepts a chain ID, a transaction payload, and a function to be called on `t1-dapp` after the transaction action
- `selfdestruct(fundsRecipient)`
  - Unallocates the identity and returns funds
  - Accepts one multi-chain address
