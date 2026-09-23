---
id: risk-engine
title: Risk Engine and Liquidation
sidebar_position: 4
---

Programmable custody guarantees that the borrower cannot take the money. It does not, on its own, guarantee that the money survives a bad trade. That is the risk engine's job: watch every open position continuously, and close one before its losses reach the lender's principal.

## Why the risk engine runs in the TEE

An institutional lender will not deploy against a liquidation model they cannot inspect, which argues for putting it on-chain. Four things make that impractical:

- **Real-time position monitoring.** Exposure has to be re-evaluated on every price tick across every venue, not once per block.
- **Dynamic loan-to-value.** The safe leverage on a position depends on the depth of the book behind it, which moves continuously.
- **Cross-chain price feeds.** Prices come from venues on other chains and from off-chain orderbooks with no on-chain representation at all.
- **Liquidation execution.** Unwinding a position means placing orders at a venue, which a contract on another chain cannot do.

Each of those is either impossible or ruinously gas-expensive inside a smart contract. The TEE resolves the tension: the logic runs off-chain at the speed the markets require, and its results are attested on-chain, so lenders get the auditability they would have had from a contract without the constraints.

## How a liquidation happens

A liquidation is not a separate mechanism bolted onto the account. It is a transaction like any other, and it goes through the same signature gate.

1. The engine values every open position against current prices and computes the account's loan-to-value ratio.
2. When that ratio crosses the policy's liquidation threshold, the engine constructs the closing transactions.
3. Those transactions satisfy the policy — closing a position to protect the lender is exactly what the policy is for — so the encumbered key signs them.
4. Proceeds repay the pool's principal and accrued interest. Whatever remains belongs to the borrower.

The borrower cannot block step 3, because the borrower was never the party holding the key. There is no "cooperation" step to fail, which is why the loan can be undercollateralized in the first place.

## What lenders can verify

Liquidations are attested in real time, so a lender does not learn about a close after the fact from a report: the attestation is evidence that a specific, identified binary produced that decision from that state. That is what makes the engine checkable without the lender having to trust an operator's account of it.

Combined with [Real-Time Proving](./rtp.md) on the cross-chain reads the engine consumes, that closes the loop from market state to liquidation decision to repayment, with no step where a lender is asked to take somebody's word for it.

## Residual risk

Undercollateralized lending is not risk-free lending, and t1 does not claim otherwise. A position can gap through its liquidation threshold faster than any engine can close it, and a book can be too thin to absorb the unwind at the price the model assumed. The engine's job is to make that outcome rare and bounded, not impossible; the policy's maximum size and liquidation threshold are the parameters that set how rare and how bounded, and they are the lender's to choose per pool.
