# Shield Finance Smart Contracts

## Overview

Shield is a smart contract that provides “liquidity options” — a new instrument to protect your investments from downside risk.

* 🛡 Buy insurance against rug pulls
* 💰 Receive payout if your token is rugged

Read the [Medium article](https://medium.com/@coin-hunt-group/rugshield-defi-liquidity-options-4d942c0210b5) to learn how it works.

## Install

```bash
# Install project dependencies
yarn install
```

## Test

``` bash
# Run all unit tests
yarn test

# Lint code
yarn lint

# View code coverage
yarn coverage
```

## Technical documentation

### Events

* Deploy shield contract
* Deposit into shield contract as a trader
* Deposit into shield contract as a protector
* Withdraw from shield contract as a trader (if rug pull happens)
* Withdraw from shield contract as a protector (if rug pull doesn't happen)
* Pull the rug as malicious actor
* Advance time past deposit deadline
* Advance time past withdraw deadline
