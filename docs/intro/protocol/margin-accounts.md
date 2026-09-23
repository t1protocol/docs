---
id: margin-accounts
title: Margin Accounts
sidebar_position: 3
---

A margin account is the unit t1 lends into. Each borrower gets one, provisioned by the TEE and governed by an [encumbered key](./programmable-custody.md). It holds the borrower's own deposit and the credit drawn against it, and it is the address that appears at every venue the borrower trades on.

## The loan policy

The policy is the contract between lender and borrower, expressed as code the key obeys rather than as prose someone enforces afterwards. It is set before the key exists and bound to it at creation, so it is immutable for the life of the account.

A policy specifies at minimum:

| Field | Meaning |
| --- | --- |
| **Venues** | Where the capital may be deployed, for example Polymarket and Hyperliquid. A transaction addressed anywhere else is not signed. |
| **Assets** | Which assets may be held or traded, for example USDC. |
| **Maximum size** | The ceiling on notional exposure the account may carry. |
| **Liquidation threshold** | The loan-to-value ratio at which the [risk engine](./risk-engine.md) begins closing the position. |

Policies are per-pool, so a lender who wants tighter venue restrictions or a more conservative threshold creates a pool with those parameters rather than negotiating an exception.

## One account, many venues

A borrower who is long a prediction market on Polymarket and short a perpetual on Hyperliquid has two positions in two systems that share no state and no settlement layer. Their collateral requirement, however, is one number.

t1 resolves this by reading the positions where they live and consolidating them into the account. The TEE runs full nodes for the chains t1 supports and reads off-chain venues through their own interfaces, and [Real-Time Proving](./rtp.md) makes those reads provable rather than merely asserted — a lender can verify the state the account's exposure was computed from.

The practical consequence is that collateral is not fragmented across venues. Margin posted once backs positions everywhere the policy allows, and a gain on one venue offsets a loss on another inside the same account.

## Lifecycle

1. **Provision.** The borrower is issued an account. The TEE generates the key and binds the pool's policy to it.
2. **Deposit.** The borrower funds the account with their own capital, which serves as the margin.
3. **Draw.** Credit is extended from the [lending pool](./lending-pools.md) against that margin, up to the policy's limits.
4. **Trade.** The borrower directs the combined balance across the permitted venues. Every transaction passes the signature gate.
5. **Settle.** Positions close, the loan and accrued interest are repaid to the pool, and the remainder is released to the borrower. If exposure crosses the liquidation threshold first, the [risk engine](./risk-engine.md) closes the position and repayment happens from the proceeds.

At no point in that sequence does the borrower hold the pool's capital, and at no point does the lender hold the borrower's positions.
