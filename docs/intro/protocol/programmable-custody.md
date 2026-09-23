---
id: programmable-custody
title: Programmable Custody
sidebar_position: 2
---

Programmable custody is the primitive the rest of t1 is built on. A margin account's private key lives inside a Trusted Execution Environment, bound at the moment of its creation to a loan policy it can never escape. The key will sign a transaction that satisfies the policy and will not sign one that does not. No party, t1 included, can direct the key outside the policy without running different code inside the enclave, which changes the attestation measurement any lender can check.

The academic name for a key that cannot be used freely by the party holding it is **private key encumbrance**. We call the applied form of it programmable custody.

## How an account is created

### 1. The policy is set

A lender agrees to a loan policy — the permitted uses of funds and the conditions under which a position is liquidated — and deposits capital into a [lending pool](./lending-pools.md). The policy lives inside the TEE, not in a document and not in a contract someone can upgrade.

### 2. An encumbered key is created

The TEE generates a fresh keypair and binds the policy to it at creation. The private half never leaves the enclave. The binding cannot be redone: there is no code path that re-points an existing key at a different policy, so the policy a borrower agreed to is the policy that governs the account for its whole life.

[Remote attestation](./tee.md) proves which code is running inside the enclave. A lender does not have to take t1's word for what the enforcement logic does; they can verify the measurement of the binary that holds the key.

### 3. The borrower trades, the key enforces

Every transaction the borrower wants — opening a position, closing one, moving collateral between venues — is presented to the key. So is every liquidation. The key signs the ones the policy permits.

## The signature gate

This is the entire enforcement surface, and it is worth being concrete about it. Two transactions arrive at the same account holding the same funds:

| Transaction | Outcome |
| --- | --- |
| Open 5× long on Polymarket | **Signed** — the venue, the asset, and the resulting exposure all satisfy the policy. |
| Transfer 250,000 USDC to an external address | **Rejected** — no signature is ever produced. |

The first is a use of funds the lender priced and agreed to. The second is the borrower walking off with the loan, and there is no version of the account that produces a signature for it.

This is why the borrower can be anonymous, with no KYC. The lender is not extending trust to a person; they are extending capital into an account whose behavior is fixed in advance.

## Why this cannot be a smart contract

The obvious objection is that a smart contract could hold the funds and check the same conditions. It could — but only inside its own execution environment, and that is not where trading happens anymore.

Polymarket, Hyperliquid, and Lighter all run off-chain orderbooks. A position on any of them is not a state change a contract on some other chain can inspect, gate, or unwind. A smart contract asked to collateralize such a position can do one of two things: take custody of the funds and hand them to the venue (which is custodial leverage, with all of its risk), or refuse.

A key does not have this limitation. It sits in front of the transaction rather than inside the destination, so the same enforcement works for an on-chain AMM swap, an off-chain orderbook order, and a transfer to a venue on a chain t1 does not control. One account, one policy, every venue.

## What the borrower gets, and does not get

- **Direction rights.** The borrower decides what the capital does: which venue, which market, which side, when to close.
- **No withdrawal rights.** The borrower cannot move the capital to an address they control: there is no transaction they can submit, and no request they can make, that produces that signature.

Profit realized inside the account is theirs, and is released to them through the policy's own settlement path once the loan and its interest are covered. The principal is never at their disposal.
