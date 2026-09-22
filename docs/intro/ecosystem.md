---
id: ecosystem
title: Ecosystem
sidebar_position: 2
---

t1's credit infrastructure already powers two live applications. Both use the same [margin accounts](./protocol/margin-accounts.md) and the same [risk engine](./protocol/risk-engine.md); they differ in the venue they lend against and the policy their pools run.

## amplifi

**Permissionless prime brokerage for prediction markets and perpDEXs.** Up to **10×** leverage on Polymarket, with no KYC and no custody transfer: a trader deposits margin, draws credit against it, and trades a Polymarket position from an account that cannot pay out to anyone but the pool and themselves.

[amplifi.finance →](https://amplifi.finance/?utm_source=t1-docs&utm_medium=website&utm_campaign=t1docs-credit&utm_content=ecosystem-page&utm_term=10x-polymarket)

## juiced

**Leverage on memecoins before they list on perpDEXs.** Up to **5×** on Robinhood Chain. The interesting case for programmable custody, because these markets have no perpetual venue to borrow against and no on-chain lending market deep enough to collateralize them.

[juiced.exchange →](https://juiced.exchange/?utm_source=t1-docs&utm_medium=website&utm_campaign=t1docs-credit&utm_content=ecosystem-page&utm_term=robinhood-chain)

## Building on t1

The same infrastructure is available to other venues and applications. If you operate a venue and want your users to trade with borrowed capital you never hold, see [Offer Leverage on Your Venue](../integration/leverage.md). If you want to put capital behind a policy, see [Provide Lending Liquidity](../integration/lending.md).
