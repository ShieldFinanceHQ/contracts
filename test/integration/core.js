import { DeployCommand } from '../support/DeployCommand.js'

const { deployments, getNamedAccounts } = require('hardhat')
const { fixture, get, read, execute } = deployments
const fc = require('fast-check')

/**
 * It should not allow the user to create a pool with overlapping dates (?)
 * It should not allow the user to claim protection if the liquidity has not been withdrawn
 * It should be able to calculate the high water mark from on-chain events
 * It should not allow to fund the contract past funding deadline
 * It should allow to claim protection before claiming deadline (?)
 * It should not allow to claim protection after claiming deadline
 * It should not allow to claim premium before claiming deadline
 */

/**
 * TODO: Allow the contract owner to withdraw stuck deposits after unlock_deadline + 6 months
 */

const BN = web3.utils.BN

require('chai')
  .use(require('chai-bn')(BN))
  .should()

describe('Shield', () => {
  beforeEach(async () => {
    await fixture()
  })

  it('should ', async function () {
    const allCommands = [
      // fc.integer().map(v => new PushCommand(v)),
      fc.constant(new DeployCommand()),
      // fc.constant(new SizeCommand())
    ]

    await fc.assert(
      fc.asyncProperty(fc.commands(allCommands, { maxCommands: 100 }), commands => {
        const state = async () => ({
          model: {},
          real: {},
        })
        return fc.asyncModelRun(state, commands)
      }),
    )

    // const { deployer, user } = await getNamedAccounts()
    // const tracker = await get('Tracker');
    // const orchestrator = await get('Orchestrator');

    // const totalSupplyBeforeRebase = await read('Tracker', { from: user }, 'totalSupply')
    // const rebaseResult = await execute('Orchestrator', { from: deployer }, 'rebase', '653313740501264965', '653313740501264965')
    // const totalSupplyAfterRebase = await read('Tracker', { from: user }, 'totalSupply')
    //
    // totalSupplyAfterRebase.should.be.deep.eq(totalSupplyBeforeRebase)
  })
})
