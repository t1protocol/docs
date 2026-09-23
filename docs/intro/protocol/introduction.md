---
id: introduction
title: Introduction
sidebar_position: 1
---

t1 is the permissionless credit protocol for DeFi. It lets a lender extend an undercollateralized loan to a borrower they have never met and have no way to sue, and still be repaid — without a legal agreement, without taking custody, and without demanding that the borrower post more collateral than they want to borrow.

The mechanism is **programmable custody**. t1 provisions a margin account for each borrower, controlled by a Trusted Execution Environment (TEE). Verifiable code inside the TEE holds the account's private key and enforces the loan policy the lender set. The key signs a transaction only if that transaction satisfies the policy. The margin account, not the borrower, becomes the counterparty to the loan.

The borrower gets direction rights over the capital and never gets withdrawal rights over it. That asymmetry is the whole protocol.

## Permissionless credit has not been possible before

On-chain lending has had three answers to the problem of trusting a borrower, and each one costs something:

| Approach | What it costs |
| --- | --- |
| **Overcollateralized lending** (Aave, Morpho) | Capital sits idle to buy trust. To borrow, you must already have more than you want to borrow. |
| **Permissioned credit** | Replicates the traditional rails on-chain: master loan agreements, KYC, and a counterparty the lender can take to court. |
| **Custodial leverage** | The borrower hands over their assets, and the venue's solvency becomes their risk. |

Each one is a tax on capital efficiency, and each one closes the door on permissionless users. Programmable custody removes the need to trust the borrower at all, so none of the three prices has to be paid.

## Leverage on anything

Because enforcement lives in the key rather than in a smart contract, a t1 margin account is not confined to one execution environment. Smart-contract collateral can only be policed where a smart contract runs. A TEE-held key can be presented with any transaction, for any venue, and simply refuse to sign it.

That matters because most of the interesting leverage now lives off-chain or on chains of its own:

- Prediction markets — Polymarket
- Perpetual futures — Hyperliquid, Lighter
- Spot and memecoins — Robinhood Chain, on-chain AMMs

Positions opened on separate venues and separate chains resolve into one margin account, because t1 also proves state across chains in real time. [Real-Time Proving](./rtp.md) is what makes a single collateral base legible to venues that never talk to each other.

## What runs on it today

t1's credit infrastructure already powers two applications: **amplifi**, a permissionless prime brokerage for prediction markets and perpDEXs offering 10× leverage on Polymarket, and **juiced**, which offers 5× leverage on memecoins before they list on perpDEXs. See [Ecosystem](../ecosystem.md).

## Where to go next

- [Programmable Custody](./programmable-custody.md) — how an encumbered key enforces a loan policy, and why a smart contract cannot.
- [Margin Accounts](./margin-accounts.md) — what a loan policy contains and how cross-venue positions consolidate.
- [Risk Engine and Liquidation](./risk-engine.md) — how exposure is monitored and how a position is closed.
- [Lending Pools](./lending-pools.md) — how capital is put behind a policy.
- [Offer leverage on your venue](../../integration/leverage.md) — for builders.
