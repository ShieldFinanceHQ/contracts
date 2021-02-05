# Shield Finance

[![Telegram](./img/telegram-fill.svg?raw=true&sanitize=true "Join Telegram")](https://t.me/ShieldFinanceHQ)
[![Twitter](./img/twitter-fill.svg?raw=true&sanitize=true "Follow on Twitter")](https://twitter.com/ShieldFinanceHQ)
[![Discord](./img/discord-fill.svg?raw=true&sanitize=true "Join Discord")](https://discord.gg/vxjTVeesWG)
[![Medium](./img/medium-fill.svg?raw=true&sanitize=true "Join Medium")](https://medium.com/shield-finance-hq)
[![Website](./img/global-fill.svg?raw=true&sanitize=true "Open website")](http://shieldfinance.net/)

Shield is a smart contract that compensates your losses from rug pulls.

Here's how it works:

![Shield - How it works](img/example.png?raw=true "How it works")

## How it works

**Shield contract** is a bet between two groups: **Traders** and **Protectors**.

* **Traders** get money from Protectors if rug pull happens.
* **Protectors** get money from Traders if rug pull doesn’t happen.

:gorilla: Traders think that a rug pull is possible. Therefore, they are willing to pay a small premium to receive a big compensation if rug pull does actually happen.

:whale2: Protectors think that a rug pull is unlikely. Maybe they are developers who control the liquidity tokens, or maybe they are insiders who know more than the general public. Anyway, they are willing to stake a big compensation to receive a small premium if rug pull doesn’t actually happen.

**If rug pull happens:**

* Traders get their money back + split Protectors’ money proportionally.
* Protectors don’t get their money back.

**If rug pull doesn’t happen:**

* Traders don’t get their money back.
* Protectors get their money back + split Traders’ money proportionally.

## Exchanges

**Note:** this is a list of exchanges where the Shield contract can protect investors. If you want to trade our token, use [CHT-ETH market](https://info.uniswap.org/token/0xa7e6b2ce535b83e82ab598e9e432705f8d7ce929) (also see "[Why CoinHunt token?](#why-coinhunt-token)").

Shield can work on every exchange. We’ll implement it for Uniswap first, then Sushiswap, then smaller DEXes.

![Uniswap](./img/uniswap.png?raw=true&sanitize=true "Uniswap")
![Sushiswap](./img/sushiswap.png?raw=true&sanitize=true "Sushiswap")

If you want to be notified when we launch on Uniswap & Sushiswap, please [join our Telegram](https://t.me/ShieldFinanceHQ). 

## Why CoinHunt Token?

CoinHunt Token (CHT) is used because Shield is a project of CoinHunt development group. We are looking forward to releasing more projects that buy & burn CHT.

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

## Credits

* [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
* [Hardhat development environment](https://hardhat.org/)
* [Ampleforth Contracts](https://www.ampleforth.org/)
* [Remix icons](https://remixicon.com/)
