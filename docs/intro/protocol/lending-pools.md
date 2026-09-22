---
id: lending-pools
title: Lending Pools
sidebar_position: 5
---

A lending pool is where credit comes from. Lenders deposit capital into a pool, the pool defines the [loan policy](./margin-accounts.md) that every margin account borrowing from it is bound to, and borrowers draw against that capital to take leveraged positions on the venues the policy allows.

## What a lender sets

A pool is defined by its policy, and the policy is where a lender expresses their risk appetite:

- **Permitted venues and assets** — the surface the capital is allowed to touch.
- **Maximum position size** — the ceiling on notional exposure per account.
- **Liquidation threshold** — the loan-to-value ratio at which the [risk engine](./risk-engine.md) closes a position.
- **Interest terms** — what borrowing from this pool costs.

A lender who wants different parameters creates a different pool. Policies are not renegotiated per borrower, which is what keeps borrowing permissionless: there is nothing to approve, because everything that would have been approved was decided when the pool was created.

## What a lender is and is not exposed to

- **No counterparty exposure.** The borrower is not the counterparty. The margin account is, and it is incapable of absconding with the principal.
- **No legal exposure.** There is no master loan agreement to draft, no jurisdiction to enforce it in, and no debtor to pursue.
- **No KYC to administer.** Borrowers are anonymous by design, so there is no identity programme to run and no obligation inherited from having run one.
- **Market risk remains.** A position can still gap through its liquidation threshold. See [Residual risk](./risk-engine.md#residual-risk).

## Repayment

Repayment is structural rather than behavioral. When a position closes — by the borrower's choice or by liquidation — the proceeds settle through the account, principal and accrued interest return to the pool, and only the remainder is released to the borrower. The encumbered key will not sign a transaction that sends the pool's capital anywhere else, so there is no sequence of borrower actions that results in the pool being shorted while the account is solvent.

## Providing liquidity

Set up your own pool with your own parameters, or deposit into an existing one. Both paths are covered in [Provide Lending Liquidity](../../integration/lending.md).
