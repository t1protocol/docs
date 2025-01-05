---
id: overview
title: API Overview
---

This section explains the t1 Subgraph and how to interact with it. The t1 subgraph indexes data from the t1 contracts over time. It organizes data about pairs, tokens, t1 as a whole, and more. The subgraph updates any time a transaction is made on t1. The subgraph runs on [The Graph](https://thegraph.com/) protocol's hosted service and can be openly queried.

## Resources

[Subgraph Explorer](https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2) - sandbox for querying data and endpoints for developers.

[Uniswap V2 Subgraph](https://github.com/Uniswap/uniswap-v2-subgraph) - source code for deployed subgraph.

## Usage

The subgraph provides a snapshot of the current state of t1 and also tracks historical data. It is currently used to power [uniswap.info](https://uniswap.info/). **It is not intended to be used as a data source for structuring transactions (contracts should be referenced directly for the most reliable live data).**

## Making Queries

To learn more about querying a subgraph refer to [The Graph's documentation](https://thegraph.com/docs/about/introduction).

## Versions

The [Uniswap V2 Subgraph](https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2) only tracks data on t1 V2. For t1 V1 information see the [V1 Subgraph](https://thegraph.com/explorer/subgraph/graphprotocol/uniswap).
