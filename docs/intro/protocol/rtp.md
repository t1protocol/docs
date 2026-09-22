---
id: rtp
title: Real-Time Proving
sidebar_position: 7
---

Real-Time Proving (RTP) enables immediate validation of computations, allowing systems to verify correct execution with minimal latency. Within a Trusted Execution Environment, the computation of a state transition can be securely executed, producing cryptographic proofs that attest to its correctness. These proofs can be submitted to Ethereum or another chain immediately, without the delays associated with optimistic or zero-knowledge rollups. Proving via multisigs or proof-of-stake can also be fast, but multisig systems do not provide reliability and proof-of-stake systems are very expensive to run.

## Why credit needs it

A margin account is only useful if its collateral can back positions wherever the borrower wants to trade, and that requires knowing what those positions are worth right now, on chains and venues that do not share a settlement layer.

RTP is what makes that knowledge trustworthy rather than merely asserted:

- **Cross-venue collateral.** Positions held on separate venues resolve into one [margin account](./margin-accounts.md) because the reads behind them are proven, not reported.
- **Risk decisions a lender can check.** The [risk engine](./risk-engine.md) acts on cross-chain state; proving that state is what lets a lender audit a liquidation rather than trust it.
- **Settlement without a delay window.** Repayments and withdrawals do not have to wait out a seven-day challenge period or an hours-long proving queue, so capital returns to the pool at the speed the position closed.

## Beyond credit

The same primitive is what enhances composability generally, letting chains and rollups interact securely in near real time for asset transfers, contract calls, and state updates. t1 exposes it directly to developers as [xChainRead](../../integration/xChainRead/overview.md), a cross-chain read verification primitive that any contract can call.
