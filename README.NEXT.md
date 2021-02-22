# Shield Finance (next version)

We're working on a **new version** of Shield Finance contracts. It will cover all price drops, including price drops from rug pulls, hacks or exploits (earlier we covered only rug pulls, but decided to expand our value proposition). This text explains how the new contracts will work.

When designing a new version, we've had the following thoughts:
1. Investors want to receive a compensation for their losses. Ideally, they want to cover their losses completely.
1. However, large coverage = high price. In other words, the more protection the investor wants to buy, the more he has to pay.
1. So, we have to balance the price of protection VS the coverage of protection.

In order for a deal to happen, both sides (investors & protectors) should see the deal as a no-brainer. It should make sense for investor to buy protection at that price, and it should make sense for protector to sell protection at the same price. This is only possible if investor & protector have different information about the market (i.e. there is information asymmetry). 

Options:
* Get paid a fixed sum if the price drops below a fixed point. Example: Get paid 100 ETH if ABC token price drops below 0.0001 ETH.
* Get paid a linearly increasing sum if the price drops below a fixed point. Example: Get paid 0.1 ETH per each 0.00000001 ETH / ABC price drop. This is how regular options work.
* Get paid a fixed sum if the price drops 50% in 24 hours. Example: Get paid 100 ETH if ABC token price drops 50% in 24 hours. This allows to capture the rug pulls, hacks & exploits.
