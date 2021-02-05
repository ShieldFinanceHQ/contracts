# Shield contract

Shield is a smart contract that compensates your losses from rug pulls.

Learn how it works:

![Shield - How it works](/img/rug-pull.png?raw=true "How it works")

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
