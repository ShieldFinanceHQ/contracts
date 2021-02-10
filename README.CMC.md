## What is Shield?

Shield contract is a bet between two groups: Traders and Protectors.

* Traders get money from Protectors if rug pull happens.
* Protectors get money from Traders if rug pull doesn’t happen.

Traders think that a rug pull is possible. Therefore, they are willing to pay a small premium to receive a big compensation if rug pull does actually happen.

Protectors think that a rug pull is unlikely. Maybe they are developers who control the liquidity tokens, or maybe they are insiders who know more than the general public. Anyway, they are willing to stake a big compensation to receive a small premium if rug pull doesn't actually happen.

If rug pull happens:

* Traders get 3x their deposit.
* Protectors get nothing.

If rug pull doesn’t happen:

* Traders get nothing.
* Protectors get 1.5x their deposit.

Notes:

* The calculations above are using the default payout coefficient (2:1). The payout coefficient is a parameter that is set only once during the Shield contract deployment.
* Payouts are made from one group to another group:
  * If rug pull happens: Protectors pay Traders.
  * If rug pull doesn't happen: Traders pay Protectors.
* Payouts are limited by the opposite group fund size:
  * If rug pull happens: Traders will receive payouts up to Protectors fund size.
  * If rug pull doesn't happen: Protectors will receive payouts up to Traders fund size.
* Payouts are sorted by deposit timestamp (deposit early if you want to ensure payout).
* Those users who don't receive payouts will receive full refunds of the original deposit.

## CoinHunt Token

CoinHunt Token (CHT) is used because Shield is a project of CoinHunt development group.

* Use case: buy & burn CHT using fees from Shield project.
* Total supply: 1'000'000'000 CHT.
* Markets: [Uniswap](https://info.uniswap.org/token/0xa7e6b2ce535b83e82ab598e9e432705f8d7ce929).

## Team

* Denis Gorbachev, CEO
* TDG, Community Manager

Denis started programming at the age of 14, had fun with C++ & WASM, then shifted towards higher-level languages like Elixir, Python & JavaScript / Solidity. He loves the challenge of programming smart contracts - the gas optimization tricks, the extra security testing & the deep understanding of finance that is necessary to build real products.

TDG is a community leader who helped bootstrap multiple crypto projects. He’s also a trader & a user of other DeFi projects. After seeing a lot of rug pulls, he became interested in Shield as a solution to this problem, and decided to help Denis (the developer) to reach a broader audience.

## Demo

We have a [demo version](https://shield-demo.glideapp.io/) of the user interface. Please note that this is not a complete product - it will change in future.

## Resources

* [Website](http://shieldfinance.net/)
* [Telegram](https://t.me/ShieldFinanceHQ)
* [Twitter](https://twitter.com/ShieldFinanceHQ)
* [Discord](https://discord.gg/vxjTVeesWG)
* [Reddit](https://www.reddit.com/r/ShieldFinanceHQ)
* [Medium](https://medium.com/shield-finance-hq)
