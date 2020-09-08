# Tracker Token

## Overview

Let's say you want to bet that FTX exchange volume will increase. How can you do it?

Well, you can buy the FTX token - but its price has so many variables involved. For example, a whale might dump a lot of tokens at once, momentarily crashing the price. Or they may announce staking for the token, driving it upwards.

**If you want to bet on a specific number going up or down, you need a specialized financial instrument: a tracker token.** 

Tracker token supply depends on an external variable. This way, tracker tokens mimic perpetual swaps, but without the counterparty risk of keeping the funds on exchange. With tracker tokens, you can bet on a specific number going up or down - in a trustless, decentralized way.

## Examples

* [FTX Volume Token](https://medium.com/@dengorbachev/ftx-volume-token-da8f187a3a69)
* ... more tracker tokens coming soon

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

## Addresses (testnet)

- ERC-20 Token: [TODO](https://kovan.etherscan.io/token/TODO)
- Supply Policy: [TODO](https://kovan.etherscan.io/address/TODO)
- Orchestrator: [TODO](https://kovan.etherscan.io/address/TODO)

## Notes

* [Avoiding Initial Values in Field Declarations](https://docs.openzeppelin.com/upgrades/2.8/writing-upgradeable#avoid-initial-values-in-field-declarations)
