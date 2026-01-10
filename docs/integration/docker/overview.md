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
