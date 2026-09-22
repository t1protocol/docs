---
title: Provide Lending Liquidity
sidebar_label: Provide Liquidity
sidebar_position: 3
---

# Provide Lending Liquidity

Deposit capital into a t1 [lending pool](../intro/protocol/lending-pools.md) and it is lent to borrowers on undercollateralized terms. Repayment is enforced by the borrower's [margin account](../intro/protocol/margin-accounts.md), not promised by the borrower.

## What you are relying on

- **Open-source risk engine.** The liquidation logic is published; you can read it rather than infer it from a term sheet.
- **Liquidations attested in real time.** Each decision is attested by the enclave that made it, so you can verify a close rather than receive a report of one.
- **Risk parameters customizable per pool.** Venues, assets, maximum position size, liquidation threshold, and interest terms are yours to set.
- **No counterparty legal exposure.** The margin account is the counterparty, so there is no agreement to draft and no debtor to pursue.
- **Permissionless borrowers, no KYC to administer.** Borrowers are anonymous by design; you run no identity programme and inherit no obligation from having run one.

What you are still exposed to is market risk: a position can gap through its liquidation threshold, or the book behind it can be too thin to unwind at the modeled price. [Residual risk](../intro/protocol/risk-engine.md#residual-risk) covers this, and the maximum size and liquidation threshold you set are the levers over it.

## Two ways in

**Deposit into an existing pool.** Fastest path. You accept the pool's policy as written and start earning on its terms.

**Set up your own pool.** You define the policy — which venues the capital may reach, how much exposure a single account may carry, where liquidation triggers, and what borrowing costs. Every margin account that borrows from your pool is bound to that policy at the moment its key is created, and the binding cannot be changed afterwards.

## Get in touch

Pool creation and institutional deposits are handled with us directly. Join the [Discord](https://discord.com/invite/qVEUA6jmGZ) or email [can@t1protocol.com](mailto:can@t1protocol.com).
