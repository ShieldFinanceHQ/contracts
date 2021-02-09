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
* [How much money can you get](#how-much-money-will-i-get)
* [Exchanges](#exchanges)
* [Blockchains](#blockchains)
* [CoinHunt token](#coinhunt-token)
* [Technical documentation](#technical-documentation)

## How it works

**Shield contract** is a bet between two groups: **Traders** and **Protectors**.

* **Traders** get money from Protectors if rug pull happens.
* **Protectors** get money from Traders if rug pull doesn’t happen.

:gorilla: Traders think that a rug pull is possible. Therefore, they are willing to pay a small premium to receive a big compensation if rug pull does actually happen.

:whale2: Protectors think that a rug pull is unlikely. Maybe they are developers who control the liquidity tokens, or maybe they are insiders who know more than the general public. Anyway, they are willing to stake a big compensation to receive a small premium if rug pull doesn’t actually happen.

**If rug pull happens:**

* Traders get their money back + split Protectors’ money.
* Protectors don’t get their money back.

**If rug pull doesn’t happen:**

* Traders don’t get their money back.
* Protectors get their money back + split Traders’ money.

## How much money can you get

* Traders receive **3x their deposit** if rug pull happens.
* Protectors receive **1.5x their deposit** if rug pull doesn't happen.

*Notes:*
* This calculation is using the default payout coefficient (2:1). The payout coefficient is a parameter that is set only once during the Shield contract deployment.
* Payouts are made from one group to another group:
  * If rug pull happens: Protectors pay Traders.
  * If rug pull doesn't happen: Traders pay Protectors.
* Payouts are limited by the opposite group fund size:
  * If rug pull happens: Traders will receive payouts up to Protectors fund size.
  * If rug pull doesn't happen: Protectors will receive payouts up to Traders fund size.
* Payouts are sorted by deposit timestamp (deposit early if you want to ensure payout).
* Those users who don't receive payouts will receive full refunds of the original deposit.

## Exchanges

**Note:** We have a [Uniswap market](https://info.uniswap.org/token/0xa7e6b2ce535b83e82ab598e9e432705f8d7ce929) for people who want to trade the CoinHunt token ([why CoinHunt?](#coinhunt-token)). This section describes the exchanges where Shield can be used to protect other liquidity pools (not only traded).

Shield can work on every exchange. We’ll implement it for Uniswap first, then Sushiswap, then smaller DEXes.

![Uniswap](./img/uniswap.png?raw=true&sanitize=true "Uniswap")
![Sushiswap](./img/sushiswap.png?raw=true&sanitize=true "Sushiswap")

If you want to be notified when we launch on Uniswap & Sushiswap, please [join our Telegram](https://t.me/ShieldFinanceHQ). 

## Blockchains

Shield can work on every blockchain. We’ll deploy on Ethereum first, then Binance Smart Chain, then Polkadot.

![Ethereum](./img/ethereum.png?raw=true&sanitize=true "Ethereum")
![Binance chain](./img/binance-chain.png?raw=true&sanitize=true "Binance chain")
![Polkadot](./img/polkadot.png?raw=true&sanitize=true "Polkadot")

## CoinHunt Token

CoinHunt Token (CHT) is used because Shield is a project of CoinHunt development group.

* Use case: buy & burn CHT using fees from Shield project.
* Total supply: 1'000'000'000 CHT.

We may migrate the token to a new contract in future to support [locked tokens](#locked-tokens). Get notified by [joining our Telegram](https://t.me/ShieldFinanceHQ). 

### Locked tokens

* We plan to lock >90% of CHT supply.
* Locked tokens can't be transferred.
* Locked tokens can't participate in buy & burn (only free tokens on the open market can be bought & burned)
* Locked tokens **can be traded**, but only under specific rules within our smart contract:
  * Price of locked tokens is fixed at 24H average price of free tokens (if free tokens price goes up, then locked tokens price goes up too)
  * Sellers can place only limit orders (delayed sells).
  * Buyers can place only market orders (instant buys).
  * Sell orders are sorted by placement time & filled one after another (early sells are filled earlier).
  * Sellers don't need to modify the price on their orders (the price is adjusted automatically to 24H average price of free tokens).
  * Sellers can cancel their orders.
  * Sellers can decrease the amount on their orders.
  * Sellers can't increase the amount on their orders.
  * Buyers receive purchased locked tokens instantly.

This mechanism allows the locked tokens to be traded without affecting the free token market.

The fixed price removes slippage & prevents dumping.

The strict order queue ensures fair participation for every holder.

## Technical documentation

### Deployment

* Anybody can deploy a new Shield contract.
* Anybody can call public methods of a new Shield contract.

### Usage

* Call [initialize method](#initialize-method) after deployment to activate the Shield contract.
* Call [deposit method](#deposit-method) as Trader to receive the right for compensation in future (if you think rug pull is likely).
* Call [deposit method](#deposit-method) as Protector to receive the right for premium in future (if you think rug pull is unlikely).
* Call [refund method](#refund-method) as Trader to receive the unused deposit back (if Trader side is overfunded).
* Call [refund method](#refund-method) as Protector to receive the unused deposit back (if Protector side is overfunded).
* Call [withdraw method](#withdraw-method) as Trader to receive compensation (if rug pull happens).
* Call [withdraw method](#withdraw-method) as Protector to receive premium (if rug pull doesn't happen).

#### Initialize method

Parameters:

* [Payout coefficient](#payout-coefficient)
* [Liquidity pool address](#liquidity-pool-address)
* [Deposit deadline block number](#deposit-deadline-block-number)
* [Withdraw deadline block number](#withdraw-deadline-block-number)
* [Unlock deadline block number](#unlock-deadline-block-number)

`initialize` method activates the Shield contract by providing required parameters. 

#### Deposit method

Parameters:

* Is a Trader (boolean: true for Traders, false for Protectors)

`deposit` method allows the user to fund the contract. By funding the contract, the user secures the right to receive the compensation (for Traders) or premium (for Protectors) by calling the [withdraw method](#withdraw-method) later.

Notes:

* `deposit` method must be called individually by each user.
* `deposit` method can be called multiple times by each user.
* `deposit` method can be called with a different "Is a Trader" parameter by each user ([see FAQ](#faq)).
* `deposit` method must be called with some ETH (will be added to Traders fund or Protectors fund, depending on "Is a Trader" parameter).
* `deposit` method must be called before the [deposit deadline block number](#deposit-deadline-block-number) by both Traders and Protectors.

#### Withdraw method

Parameters: none

`withdraw` method allows to receive the compensation (for Traders) or premium (for Protectors) depending on [payout coefficient](#payout-coefficient).

* For Traders (if rug pull happens): `your_compensation = your_deposit * (1 + payout_coefficient)`
* For Protectors (if rug pull doesn't happen): `your_premium = your_deposit * (1 + (1 / payout_coefficient))`

Note: the formulas above are valid after [refunding](#refunding).

Notes:

* `withdraw` method must be called from the same address as the [deposit method](#deposit-method).
* `withdraw` method must be called before the [withdraw deadline block number](#withdraw-deadline-block-number) by Traders.
* `withdraw` method must be called after the [withdraw deadline block number](#withdraw-deadline-block-number) by Protectors.

##### Refund method

Parameters: none

`refund` method allows to return unused deposits back to your wallet. This becomes necessary if Traders or Protectors deposit more ETH than necessary.

Example for Traders:

* Traders deposit 10 ETH total.
* Protectors deposit 2 ETH total.
* Payout coefficient is 2.

In this case, only 1 ETH from Traders become eligible for payouts. The remaining 9 ETH are not used, and can be refunded back to Traders anytime after [deposit deadline](#deposit-deadline-block-number).

Example for Protectors:

* Traders deposit 2 ETH total.
* Protectors deposit 10 ETH total.
* Payout coefficient is 2.

In this case, only 4 ETH from Protectors become eligible for payouts. The remaining 6 ETH are not used, and can be refunded back to Protectors anytime after [deposit deadline](#deposit-deadline-block-number).

**Note:** Refunds are normal, because neither side knows how much the other side will deposit before [deposit deadline](#deposit-deadline-block-number):
* Traders don't know how much Protectors will deposit.
* Protectors don't know how much Traders will deposit.

In this case, it makes sense for every user to deposit as much as they want as soon as they decide to participate, then wait for the other side to deposit. The user who deposits first will receive the payout first. The user who deposits last can always receive a refund (if nobody else deposits on the other side).

#### Payout coefficient

Examples:

* 2 (default)
* 3
* 5

Payout coefficient is used to calculate payouts for Traders & Protectors.

If rug pull happens:
* Each trader receives `his_deposit + payout_coefficient * his_deposit`
* Each protector receives nothing.

If rug pull doesn't happen:
* Each trader receives nothing.
* Each protector receives `his_deposit + (1 / payout_coefficient) * his_deposit`.

You can also think of payout coefficient as ideal "fund ratio" = `protector_fund_size / trader_fund_size`.

Note: formulas above are applied after [refunds](#refunding)

#### Liquidity pool address

Examples:

* 0xa7e6b2ce535b83e82ab598e9e432705f8d7ce929 ([CHT-ETH pool on Uniswap](https://info.uniswap.org/token/0xa7e6b2ce535b83e82ab598e9e432705f8d7ce929))
* 0xd3d2e2692501a5c9ca623199d38826e513033a17 ([UNI-ETH pool on Uniswap](https://info.uniswap.org/pair/0xd3d2e2692501a5c9ca623199d38826e513033a17))
* 0x795065dcc9f64b5614c407a6efdc400da6221fb0 ([SUSHI-ETH pool on Sushiswap](https://www.sushiswap.fi/pair/0x795065dcc9f64b5614c407a6efdc400da6221fb0))

A single Shield contract protects a single liquidity pool.

It is possible to deploy multiple Shield contracts that protect the same liquidity pool, because they can have different deadlines ([deposit deadline block number](#deposit-deadline-block-number) and [withdraw deadline block number](#withdraw-deadline-block-number))

#### Deposit deadline block number

Examples:

* 11781922 (Ethereum block #11781922)
* 11800000 (Ethereum block #11800000)
* 11829393 (Ethereum block #11829393)

Deposit deadline motivates the Traders & Protectors to fund the contract. They should only send funds to the contract before the Deposit deadline. If anybody sends the funds to the contract after the Deposit deadline, the transaction will be reverted.

Deposit deadline must be at least ~1 day in future (5760 blocks in future) from when the contract is deployed.

#### Withdraw deadline block number

Examples:

* 11800000 (Ethereum block #11800000)
* 11829393 (Ethereum block #11829393)
* 11948384 (Ethereum block #11948384)

Withdraw deadline prevents the Protectors from withdrawing their money too early. It provides time for Traders to withdraw their compensation if the rug pull actually happens. Note that Traders can withdraw only if the rug pull happens on the liquidity pool that is protected by that specific Shield contract (because a single Shield contract protects a single liquidity pool).

#### Unlock deadline block number

Examples:

* 11900000 (Ethereum block #11900000)
* 11983438 (Ethereum block #11983438)
* 12064854 (Ethereum block #12064854)

Unlock deadline allows to withdraw stuck deposits. For example:
* Trader deposits 1 ETH.
* Protector deposits 2 ETH.
* Rug pull doesn't happen.
* Protector receives the right to withdraw both his & traders' deposit, but can't it (because he lost his private key).
* Trader can't withdraw either (because rug pull didn't happen)
* Trader realizes that his deposit is stuck.
* Trader waits until "Unlock deadline block number".
* Trader withdraws his deposit ("un-stucks" it).

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
* Rug pull (done by a malicious actor)
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
