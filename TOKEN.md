# CoinHunt Token

CoinHunt Token (CHT) is used because Shield is a project of CoinHunt development group.

* Use case: buy & burn CHT using fees from all CoinHunt projects (including Shield).
* Total supply: 1'000'000'000 CHT.

# Locked tokens

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
