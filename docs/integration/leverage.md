---
title: Offer Leverage on Your Venue
sidebar_label: Offer Leverage
sidebar_position: 2
---

# Offer Leverage on Your Venue

Your users trade with borrowed capital on your venue, and you never hold it. t1 issues each of them a [margin account](../intro/protocol/margin-accounts.md) controlled by an encumbered key, extends credit into it from a [lending pool](../intro/protocol/lending-pools.md), and runs liquidation itself.

## What you get

- **Leverage on a venue you already operate.** Users trade with borrowed capital on your venue. You are never the custodian of it and never the lender of record.
- **Margin accounts.** Credit is issued against a policy you help define, with liquidation handled by the protocol rather than by your operations team.
- **Cross-venue and cross-chain collateralization.** One collateral base per user, positions across separate venues and chains. A user's margin on your venue is not stranded there.

## What it means for your users

They keep direction rights over the capital and never get withdrawal rights over it, which is the property that lets the loan be undercollateralized in the first place. They do not hand custody of their own deposit to you, and they do not pass KYC to borrow. See [Programmable Custody](../intro/protocol/programmable-custody.md) for the mechanism.

## What integrating involves

The shape of the work depends on whether your venue settles on-chain or runs an off-chain orderbook, but the pieces are the same in both cases:

1. **Agree the policy.** Which venues and assets the account may touch, the maximum position size, and the liquidation threshold. This is what your lenders are pricing, and it is bound into the account's key at creation.
2. **Connect the venue.** t1's risk engine needs to read positions and prices from your venue, and the encumbered key needs to be able to place and cancel orders on it — both through your existing interfaces.
3. **Point your frontend at the account.** Your users deposit into their margin account and trade from it. The signature gate is transparent to them until it rejects something the policy forbids.
4. **Source the liquidity.** Either bring your own lenders or draw on existing pools.

## Get in touch

There is no self-serve onboarding yet; venue integrations are done with us directly. Join the [Discord](https://discord.com/invite/qVEUA6jmGZ) or email [can@t1protocol.com](mailto:can@t1protocol.com).
