---
title: Sample dApp Flow
sidebar_label: Sample dApp Flow
sidebar_position: 3
---

# Sample `t1-dApp` Flow

Consider [Yild]("https://yild.it"), a cross-chain yield optimization dApp. The flow in Docker terms is:

1. Yild's developer submits the Docker image with Yild's logic for t1 to pull and run, as a `t1-dapp` TEE-co-located with `t1-core`.
2. The newly started Yild container proceeds to call `initIdentity(callbackOnDeposit)` on `t1-core`, where `callbackOnDeposit` is Yild's handler that will determine how to treat deposits (e.g. credit a user, supply to a new yield source, withdraw to a user).
3. Furthermore, Yild will call `registerCallbackOnTransaction(chainId, address, callback)` for each chain where Yild users should be able to withdraw to, with the respective Yild ERC-20 share token contract address and a handler.
4. Now, upon a new user deposit, `t1-core` will invoke the previously registered `callbackOnDeposit` handler and pass metadata such as chain ID, sender address, or deposited amount to the Yild `t1-dapp` container.
5. Yild will then run its logic to determine the deposit type ("credit a user"), update its cross-chain global ledger, mint new Yild share tokens to the user, and determine which yield source to direct the new funds to.
6. For example, Yild might proceed to call `sendTx(chainId, payload, callback)` with a payload constructed to mean opening a bridge intent from the deposit chain to the chain with the best yield source.
7. Upon `t1-core`'s subsequent invocation of the Yild-provided `callback` will the Yild `t1-dapp` decode the callback parameters to determine whether the transaction was sent correctly, and may decide to retry etc.
8. Once a solver fills the intent on the target chain to Yild's initialized identity, will `t1-core` invoke `callbackOnDeposit`, as always—but this time, Yild will decode the callback parameters to interpret this deposit as a bridge (cross-chain optimization) transaction. It will therefore NOT credit these funds to a user, but instead call `sendTx` again, with a payload instructing `t1-core` to supply the newly arrived funds to a yield source on the new chain.
9. If a user wishes to withdraw, they will burn their Yild share tokens. This will result in `t1-core` invoking the callback on `t1-dapp` from the previously registered watcher (via `registerCallbackOnTransaction`) on said share token address. Therefore, `t1-dapp` will be able to process the withdrawal request, update its ledger, and use `sendTx` calls to withdraw the calculated amount of funds from a yield source, bridge them if needed, and finally send them to the requesting user.
