const { deployments, getNamedAccounts } = require('@nomiclabs/buidler');
const { fixture, get, read, execute } = deployments;

/**
 * It should not allow the user to create a pool with overlapping dates (?)
 * It should not allow the user to claim protection if the liquidity has not been withdrawn
 * It should be able to calculate the high water mark from on-chain events
 * It should not allow to fund the contract past funding deadline
 * It should allow to claim protection before claiming deadline (?)
 * It should not allow to claim protection after claiming deadline
 * It should not allow to claim premium before claiming deadline
 */

const BN = web3.utils.BN;

require('chai')
  .use(require('chai-bn')(BN))
  .should();

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe('Rebase', () => {
  beforeEach(async () => {
    await fixture();
  });

  it('should not change supply if rebase arguments are the same', async function () {
    const { deployer, user } = await getNamedAccounts();
    // const tracker = await get('Tracker');
    // const orchestrator = await get('Orchestrator');

    const totalSupplyBeforeRebase = await read('Tracker', { from: user }, 'totalSupply');
    const rebaseResult = await execute('Orchestrator', { from: deployer }, 'rebase', '653313740501264965', '653313740501264965');
    const totalSupplyAfterRebase = await read('Tracker', { from: user }, 'totalSupply');

    totalSupplyAfterRebase.should.be.deep.eq(totalSupplyBeforeRebase);
  });

  it('should change supply if rebase arguments are the same', async function () {
    const { deployer, user } = await getNamedAccounts();

    const totalSupplyBeforeRebase = await read('Tracker', { from: user }, 'totalSupply');
    const rebaseResult = await execute('Orchestrator', { from: deployer }, 'rebase', '653313740501264965', '326656870250632482');
    const totalSupplyAfterRebase = await read('Tracker', { from: user }, 'totalSupply');

    totalSupplyAfterRebase.should.be.deep.eq(totalSupplyBeforeRebase);
  });

  /*
 * it 'changes supply after rebase'
 * deploy contracts
 * rebase
 * assert totalSupply changed
 */

  /*
   * it 'upgrades contracts'
   * Change contract code
   *    Multiple totalSupply by 2 after rebase
   * Switch to the upgradable version
   * Rebase
   * assert totalSupply
   */

  /*
   * it 'doesn't change state if paused'
   * Pause
   * For every function
   *  call function
   *  assert transaction reverts
   */
});
