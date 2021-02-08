# Sideshift Volume Tracker

## Purpose

Sideshift Volume Tracker allows traders to bet on the increase of SideShift volume. Its price is programmed to be within 5% of "24h volume on sideshift.ai converted to USD and divided by 1,000,000". Thus, it is different from SAI, which has a freely fluctuating price. See specification to learn more about this token works.

## Specification

* Type: ERC-20 token
* Supply: variable, depending on price
* Price: within 5% of "24h volume on sideshift.ai converted to USD and divided by 1,000,000"
* Rebase period: every 24 hours at 00:05 UTC
* Rebase formula: [see here](#rebase-formula)
* Source code: [Ampleforth](https://github.com/ampleforth/uFragments) fork 

## Rebase formula

```Wallet balance * (Current price - Target price) / (Target price) * 1 / Lag factor```

* `Wallet balance` is how many tokens you have before rebase.
* `Current price` is the price of a single token, calculated as a 24H TWAP equally weighted from [reputable exchanges](#exchanges).
* `Target price` is "24h volume on sideshift.ai converted to USD and divided by 1,000,000"
* `Lag factor` is a variable between 1 and 24, used to protect from abrupt supply changes. Currently, the lag factor is set manually by smart contract owner (this may change in future). A lag factor of 1 means "no lag" (supply is adjusted immediately to cover the difference between the current price and the target price).

## Exchanges

TODO

## Install

```bash
# Install project dependencies
npm install

# Install ethereum local blockchain(s) and associated dependencies
npx setup-local-chains
```

## Test

``` bash
# You can use the following command to start a local blockchain instance
npx start-chain [ganacheUnitTest|gethUnitTest]

# Run all unit tests
npm test

# Run unit tests in isolation
npx truffle --network ganacheUnitTest test test/unit/uFragments.js

# Lint code
npm run lint

# View code coverage
npm run coverage
```

## Addresses (mainnet)

- ERC-20 Token: [TODO](https://etherscan.io/token/TODO)
- Supply Policy: [TODO](https://etherscan.io/address/TODO)
- Orchestrator: [TODO](https://etherscan.io/address/TODO)
- Market Oracle: [TODO](https://etherscan.io/address/TODO)
- CPI Oracle: [TODO](https://etherscan.io/address/TODO)

## Addresses (testnet)

- ERC-20 Token: [TODO](https://kovan.etherscan.io/token/TODO)
- Supply Policy: [TODO](https://kovan.etherscan.io/address/TODO)
- Orchestrator: [TODO](https://kovan.etherscan.io/address/TODO)
- Market Oracle: [TODO](https://kovan.etherscan.io/address/TODO)
- CPI Oracle: [TODO](https://kovan.etherscan.io/address/TODO)

## Notes

* [Avoiding Initial Values in Field Declarations](https://docs.openzeppelin.com/upgrades/2.8/writing-upgradeable#avoid-initial-values-in-field-declarations)
