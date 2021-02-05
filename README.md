# Shield Finance

[![Telegram](./img/telegram-fill.svg?raw=true&sanitize=true "Join Telegram")](https://t.me/ShieldFinanceHQ)
[![Twitter](./img/twitter-fill.svg?raw=true&sanitize=true "Follow on Twitter")](https://twitter.com/ShieldFinanceHQ)
[![Discord](./img/discord-fill.svg?raw=true&sanitize=true "Join Discord")](https://discord.gg/vxjTVeesWG)
[![Reddit](./img/reddit-fill.svg?raw=true&sanitize=true "Follow on reddit")](https://www.reddit.com/r/ShieldFinanceHQ)
[![Medium](./img/medium-fill.svg?raw=true&sanitize=true "Join Medium")](https://medium.com/shield-finance-hq)

Shield is a smart contract that compensates your losses from rug pulls.

[Jump to contents](#contents) or see here's how it works:

![Shield - How it works](img/example.png?raw=true "How it works")

## Contents

* [How it works](#how-it-works)
* [Exchanges](#exchanges)
* [Blockchains](#blockchains)
* [Technical documentation](#technical-documentation)

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

## Technical documentation

### Deployment

* Anybody can deploy a new Shield contract.
* Anybody can call public methods of a new Shield contract.

### Usage

* Call [initialize](#initialize-method) method after deployment to activate the Shield contract.
* Call [deposit](#deposit-method) method as Trader to receive the right for compensation in future (if you think rug pull is likely to happen).
* Call [deposit](#deposit-method) method as Protector to receive the right for premium in future (if you think rug pull is unlikely to happen). 
* Call [withdraw](#withdraw-method) method as Trader to receive compensation (if rug pull happens).
* Call [withdraw](#withdraw-method) method as Protector to receive premium (if rug pull doesn't happen).

#### initialize method

Parameters:

* [Liquidity pool address](#liquidity-pool-address)
* [Deposit deadline block number](#deposit-deadline-block-number)
* [Withdraw deadline block number](#withdraw-deadline-block-number)


#### deposit method

Parameters:

* Is a Trader (boolean: true for Traders, false for Protectors)

deposit method allows the user to fund the contract. By funding the contract, the user secures the right to receive the compensation (for Traders) or premium (for Protectors) by calling the "[withdraw](#withdraw-method)" method later.

Notes:

* deposit method must be called individually by each user.
* deposit method can be called multiple times by each user.
* deposit method can be called with a different "Is a Trader" parameter by each user ([see FAQ](#faq)).
* deposit method must be called with some ETH (will be added to Traders fund or Protectors fund, depending on "Is a Trader" parameter).
* deposit method must be called before the [Deposit deadline block number](#deposit-deadline-block-number) by both Traders and Protectors.

#### withdraw method

Parameters: none

withdraw method allows to receive the compensation (for Traders) or premium (for Protectors):

For Traders:

* `your_compensation = your_share * protectors_fund`
* `your_share = your_deposit / traders_fund`
* `traders_fund = sum(traders_deposits)`
* `protectors_fund = sum(protectors_deposits)`

For Protectors:

* `your_premium = your_share * traders_fund`
* `your_share = your_deposit / protectors_fund`
* `traders_fund = sum(traders_deposits)`
* `protectors_fund = sum(protectors_deposits)`

Notes:

* `withdraw` method must be called from the same address as the "[deposit](#deposit-method)" method.
* `withdraw` method must be called before the [Withdraw deadline block number](#withdraw-deadline-block-number) by Traders.
* `withdraw` method must be called after the [Withdraw deadline block number](#withdraw-deadline-block-number) by Protectors.


#### Liquidity pool address

Examples:

* 0xa7e6b2ce535b83e82ab598e9e432705f8d7ce929 ([CHT-ETH pool on Uniswap](https://info.uniswap.org/token/0xa7e6b2ce535b83e82ab598e9e432705f8d7ce929))
* 0xd3d2e2692501a5c9ca623199d38826e513033a17 ([UNI-ETH pool on Uniswap](https://info.uniswap.org/pair/0xd3d2e2692501a5c9ca623199d38826e513033a17))
* 0x795065dcc9f64b5614c407a6efdc400da6221fb0 ([SUSHI-ETH pool on Sushiswap](https://www.sushiswap.fi/pair/0x795065dcc9f64b5614c407a6efdc400da6221fb0))

A single Shield contract protects a single liquidity pool.

It is possible to deploy multiple Shield contracts that protect the same liquidity pool, because they can have different deadlines ([Deposit deadline block number](#deposit-deadline-block-number) and [Withdraw deadline block number](#withdraw-deadline-block-number))

#### Deposit deadline block number

Examples:

* 11781922 (Ethereum block #11781922, [already mined](https://etherscan.io/block/11781922))
* 118000000 (Ethereum block #118000000, not mined yet)
* 118293934 (Ethereum block #118293934, not mined yet)

Deposit deadline motivates the Traders & Protectors to fund the contract. They should only send funds to the contract before the Deposit deadline. If anybody sends the funds to the contract after the Deposit deadline, the transaction will be reverted.

Deposit deadline must be at least ~1 day in future (5760 blocks in future) from when the contract is deployed.

#### Withdraw deadline block number

* 118000000 (Ethereum block #118000000, not mined yet)
* 118293934 (Ethereum block #118293934, not mined yet)
* 119483848 (Ethereum block #119483848, not mined yet)

Withdraw deadline prevents the Protectors from withdrawing their money too early. It provides time for Traders to withdraw their compensation if the rug pull actually happens. Note that Traders can withdraw only if the rug pull happens on the liquidity pool that is protected by that specific Shield contract (because a single Shield contract protects a single liquidity pool).

### FAQ

**What if the user deposits 10 ETH as a Trader, then deposits 100 ETH as a Protector?**

There is no conflict:

* If rug pull happens, the user will receive his compensation as a Trader
* If rug pull doesn’t happen, the user will receive his premium as a Protector

Of course, if the user makes a double-sided deposit, he will lose some of his money anyway (because he’s betting on two exclusive outcomes at the same time, and there are other Traders / Protectors who will receive a part of one of his deposits).

### Events

* Deploy shield contract
* Deposit into shield contract as a trader
* Deposit into shield contract as a protector
* Withdraw from shield contract as a trader (if rug pull happens)
* Withdraw from shield contract as a protector (if rug pull doesn't happen)
* Pull the rug as malicious actor
* Advance time past deposit deadline
* Advance time past withdraw deadline

## Install

```bash
# git clone $REPO_URL
yarn install
```

## Credits

* [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
* [Hardhat development environment](https://hardhat.org/)
* [Ampleforth Contracts](https://www.ampleforth.org/)
* [Remix icons](https://remixicon.com/)
