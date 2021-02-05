# Shield contract

[![Telegram](./img/telegram-fill.svg?raw=true&sanitize=true "Join Telegram")](https://t.me/ShieldFinanceHQ)
[![Twitter](./img/twitter-fill.svg?raw=true&sanitize=true "Follow on Twitter")](https://twitter.com/ShieldFinanceHQ)
[![Discord](./img/discord-fill.svg?raw=true&sanitize=true "Join Discord")](https://discord.gg/vxjTVeesWG)
[![Medium](./img/medium-fill.svg?raw=true&sanitize=true "Join Medium")](https://medium.com/shield-finance-hq)
[![Website](./img/global-fill.svg?raw=true&sanitize=true "Open website")](http://shieldfinance.net/)

Shield is a smart contract that compensates your losses from rug pulls.

Here's how it works:

![Shield - How it works](./img/rug-pull.png?raw=true "How it works")

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

## Copyright

* [Remix icons](https://remixicon.com/)
