# Shield Finance

[![Telegram](./img/telegram-fill.svg?raw=true&sanitize=true "Join Telegram")](https://t.me/ShieldFinanceHQ)
[![Twitter](./img/twitter-fill.svg?raw=true&sanitize=true "Follow on Twitter")](https://twitter.com/ShieldFinanceHQ)
[![Discord](./img/discord-fill.svg?raw=true&sanitize=true "Join Discord")](https://discord.gg/vxjTVeesWG)
[![Reddit](./img/reddit-fill.svg?raw=true&sanitize=true "Follow on reddit")](https://www.reddit.com/r/ShieldFinanceHQ)
[![Medium](./img/medium-fill.svg?raw=true&sanitize=true "Join Medium")](https://medium.com/shield-finance-hq)

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

**Note:** README has been released to get feedback, not to sell the token. So please don't buy anything now. If you want to get notified about our token, feel free to [join our Telegram](https://t.me/ShieldFinanceHQ).

Shield can work on every exchange. We’ll implement it for Uniswap first, then Sushiswap, then smaller DEXes.

![Uniswap](./img/uniswap.png?raw=true&sanitize=true "Uniswap")
![Sushiswap](./img/sushiswap.png?raw=true&sanitize=true "Sushiswap")

If you want to be notified when we launch on Uniswap & Sushiswap, please [join our Telegram](https://t.me/ShieldFinanceHQ). 

## Blockchains

Shield can work on every blockchain. We’ll deploy on Ethereum first, then Binance Smart Chain, then Polkadot.

![Ethereum](./img/ethereum.png?raw=true&sanitize=true "Ethereum")
![Binance chain](./img/binance-chain.png?raw=true&sanitize=true "Binance chain")
![Polkadot](./img/polkadot.png?raw=true&sanitize=true "Polkadot")

## Install

```bash
# git clone $REPO_URL
yarn install
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
