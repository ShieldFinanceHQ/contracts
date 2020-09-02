/*
  In this truffle script,
  During every iteration:
  * We double the total fragments supply.
  * We test the following guarantee:
      - the difference in totalSupply() before and after the rebase(+1) should be exactly 1.

  USAGE:
  npx truffle --network ganacheUnitTest exec ./test/simulation/supply_precision.js
*/

const expect = require('chai').expect;
const Tracker = artifacts.require('Tracker.sol');
const _require = require('app-root-path').require;
const BlockchainCaller = _require('/util/blockchain_caller');
const chain = new BlockchainCaller(web3);
const encodeCall = require('zos-lib/lib/helpers/encodeCall').default;
const BigNumber = web3.utils.BN;

console.log('web3.utils.BN', web3.utils.BN);

const endSupply = new BigNumber('2').pow(new BigNumber(128)).minus(new BigNumber(1));

let tracker, preRebaseSupply, postRebaseSupply;
preRebaseSupply = new BigNumber(0);
postRebaseSupply = new BigNumber(0);

async function exec () {
  const accounts = await chain.getUserAccounts();
  const deployer = accounts[0];
  tracker = await Tracker.new();
  await tracker.sendTransaction({
    data: encodeCall('initialize', ['address'], [deployer]),
    from: deployer
  });
  await tracker.setPolicy(deployer, {from: deployer});

  let i = 0;
  do {
    console.log('Iteration', i + 1);

    preRebaseSupply = await tracker.totalSupply.call();
    await tracker.rebase(2 * i, 1, {from: deployer});
    postRebaseSupply = await tracker.totalSupply.call();
    console.log('Rebased by 1 AMPL');
    console.log('Total supply is now', postRebaseSupply.toString(), 'AMPL');

    console.log('Testing precision of supply');
    expect(postRebaseSupply.minus(preRebaseSupply).toNumber()).to.eq(1);

    console.log('Doubling supply');
    await tracker.rebase(2 * i + 1, postRebaseSupply, {from: deployer});
    i++;
  } while ((await tracker.totalSupply.call()).lt(endSupply));
}

module.exports = function (done) {
  exec().then(done).catch(e => {
    console.error(e);
    process.exit(1);
  });
};
