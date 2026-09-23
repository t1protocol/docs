---
title: Integration Overview
sidebar_label: Integration Overview
sidebar_position: 1
---

# Integration Overview

There are three ways to build with t1, depending on what you bring to it.

## Offer leverage to your users

You operate a venue — an exchange, a prediction market, a trading app — and you want your users to trade with borrowed capital without your taking custody of it. t1 issues each of them a [margin account](../intro/protocol/margin-accounts.md) whose key enforces a policy you and your lenders agree on, and handles liquidation itself.

→ [Offer Leverage on Your Venue](./leverage.md)

## Provide lending liquidity

You have capital and want it earning on undercollateralized loans without counterparty exposure, a legal agreement, or a KYC program to administer. Set up a pool with your own parameters, or deposit into an existing one.

→ [Provide Lending Liquidity](./lending.md)

## Use the underlying primitives

The credit protocol is built on primitives t1 exposes directly, and they are useful on their own:

- **[xChainRead](./xChainRead/overview.md)** — call a view function on another chain and verify the result in your contract. This is how positions held on separate venues resolve into one margin account, and it works for anything else that needs proven cross-chain state.
- **[ERC-7683](./7683/solver-integration.md)** — t1's intent protocol, where real-time proof of a fill lets solvers be repaid in under ten seconds instead of waiting out a challenge window.
- **[Docker dApps](./docker/overview.md)** — run your own Docker-packaged code inside t1's TEE, co-located with `t1-core`, with access to TEE-controlled multi-chain identities.
