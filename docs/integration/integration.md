---
title: Integration Overview
sidebar_label: Integration Overview
sidebar_position: 1
---

# Integration Overview

There are two ways to build with t1, depending on what you bring to it.

## Offer leverage to your users

You operate a venue — an exchange, a prediction market, a trading app — and you want your users to trade with borrowed capital without your taking custody of it. t1 issues each of them a [margin account](../intro/protocol/margin-accounts.md) whose key enforces a policy you and your lenders agree on, and handles liquidation itself.

→ [Offer Leverage on Your Venue](./leverage.md)

## Provide lending liquidity

You have capital and want it earning on undercollateralized loans without counterparty exposure, a legal agreement, or a KYC program to administer. Set up a pool with your own parameters, or deposit into an existing one.

→ [Provide Lending Liquidity](./lending.md)

---

t1 also exposes the primitives the credit protocol is built on — [xChainRead](./xChainRead/overview.md), [ERC-7683](./7683/solver-integration.md), and [Docker dApps](./docker/overview.md) — for developers integrating them directly. They are in the sidebar.
