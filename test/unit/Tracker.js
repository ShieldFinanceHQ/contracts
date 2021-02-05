const Tracker = artifacts.require('Tracker.sol')
const _require = require('app-root-path').require
const BlockchainCaller = _require('/util/blockchain_caller')
const chain = new BlockchainCaller(web3)
const BN = web3.utils.BN
const encodeCall = require('zos-lib/lib/helpers/encodeCall').default

require('chai')
  .use(require('chai-bn')(BN))
  .should()

function toUFrgDenomination (x) {
  return new BN(x).mul(10 ** DECIMALS)
}
const DECIMALS = 9
const INTIAL_SUPPLY = toUFrgDenomination(50 * 10 ** 6)
const transferAmount = toUFrgDenomination(10)
const unitTokenAmount = toUFrgDenomination(1)
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

let tracker, b, r, deployer, user, initialSupply
async function setupContracts () {
  const accounts = await web3.eth.getAccounts()
  deployer = accounts[0]
  user = accounts[1]
  tracker = await Tracker.new()
  r = await tracker.sendTransaction({
    data: encodeCall('initialize', ['address'], [deployer]),
    from: deployer,
  })
  initialSupply = await tracker.totalSupply.call()
}

contract('Tracker', function (accounts) {
  beforeEach('setup Tracker contract', setupContracts)

  it('should reject any ether sent to it', async function () {
    expect(
      await chain.isEthException(tracker.sendTransaction({ from: user, value: 1 })),
    ).to.be.true
  })
})

contract('Tracker:Initialization', function (accounts) {
  beforeEach('setup Tracker contract', setupContracts)

  it('should transfer 50M tracker to the deployer', async function () {
    (await tracker.balanceOf.call(deployer)).should.be.bignumber.eq(INTIAL_SUPPLY)
    const log = r.logs[0]
    expect(log).to.exist
    expect(log.event).to.eq('Transfer')
    expect(log.args.from).to.eq(ZERO_ADDRESS)
    expect(log.args.to).to.eq(deployer)
    log.args.value.should.be.bignumber.eq(INTIAL_SUPPLY)
  })

  it('should set the totalSupply to 50M', async function () {
    initialSupply.should.be.bignumber.eq(INTIAL_SUPPLY)
  })

  it('should set the owner', async function () {
    expect(await tracker.owner.call()).to.eq(deployer)
  })

  it('should set detailed ERC20 parameters', async function () {
    expect(await tracker.name.call()).to.eq('Ampleforth')
    expect(await tracker.symbol.call()).to.eq('AMPL');
    (await tracker.decimals.call()).should.be.bignumber.eq(DECIMALS)
  })

  it('should have 9 decimals', async function () {
    const decimals = await tracker.decimals.call()
    decimals.should.be.bignumber.eq(DECIMALS)
  })

  it('should have AMPL symbol', async function () {
    const symbol = await tracker.symbol.call()
    symbol.should.be.eq('AMPL')
  })
})

contract('Tracker:setPolicy', function (accounts) {
  const policy = accounts[1]

  beforeEach('setup Tracker contract', setupContracts)

  it('should set reference to policy contract', async function () {
    await tracker.setPolicy(policy, { from: deployer })
    expect(await tracker.policy.call()).to.eq(policy)
  })

  it('should emit policy updated event', async function () {
    const r = await tracker.setPolicy(policy, { from: deployer })
    const log = r.logs[0]
    expect(log).to.exist
    expect(log.event).to.eq('LogPolicyUpdated')
    expect(log.args.policy).to.eq(policy)
  })
})

contract('Tracker:setPolicy:accessControl', function (accounts) {
  const policy = accounts[1]

  beforeEach('setup Tracker contract', setupContracts)

  it('should be callable by owner', async function () {
    expect(
      await chain.isEthException(tracker.setPolicy(policy, { from: deployer })),
    ).to.be.false
  })
})

contract('Tracker:setPolicy:accessControl', function (accounts) {
  const policy = accounts[1]
  const user = accounts[2]

  beforeEach('setup Tracker contract', setupContracts)

  it('should NOT be callable by non-owner', async function () {
    expect(
      await chain.isEthException(tracker.setPolicy(policy, { from: user })),
    ).to.be.true
  })
})

contract('Tracker:Rebase:accessControl', function (accounts) {
  beforeEach('setup Tracker contract', async function () {
    await setupContracts()
    await tracker.setPolicy(user, { from: deployer })
  })

  it('should be callable by monetary policy', async function () {
    expect(
      await chain.isEthException(tracker.rebase(1, transferAmount, { from: user })),
    ).to.be.false
  })

  it('should not be callable by others', async function () {
    expect(
      await chain.isEthException(tracker.rebase(1, transferAmount, { from: deployer })),
    ).to.be.true
  })
})

contract('Tracker:Rebase:Expansion', function (accounts) {
  // Rebase +5M (10%), with starting balances A:750 and B:250.
  const A = accounts[2]
  const B = accounts[3]
  const policy = accounts[1]
  const rebaseAmt = INTIAL_SUPPLY / 10

  beforeEach('setup Tracker contract', async function () {
    await setupContracts()
    await tracker.setPolicy(policy, { from: deployer })
    await tracker.transfer(A, toUFrgDenomination(750), { from: deployer })
    await tracker.transfer(B, toUFrgDenomination(250), { from: deployer })
    r = await tracker.rebase(1, rebaseAmt, { from: policy })
  })

  it('should increase the totalSupply', async function () {
    b = await tracker.totalSupply.call()
    b.should.be.bignumber.eq(initialSupply.plus(rebaseAmt))
  })

  it('should increase individual balances', async function () {
    b = await tracker.balanceOf.call(A)
    b.should.be.bignumber.eq(toUFrgDenomination(825))

    b = await tracker.balanceOf.call(B)
    b.should.be.bignumber.eq(toUFrgDenomination(275))
  })

  it('should emit Rebase', async function () {
    const log = r.logs[0]
    expect(log).to.exist
    expect(log.event).to.eq('LogRebase')
    log.args.epoch.should.be.bignumber.eq('1')
    log.args.totalSupply.should.be.bignumber.eq(initialSupply.plus(rebaseAmt))
  })

  it('should return the new supply', async function () {
    const returnVal = await tracker.rebase.call(2, rebaseAmt, { from: policy })
    await tracker.rebase(2, rebaseAmt, { from: policy })
    const supply = await tracker.totalSupply.call()
    returnVal.should.be.bignumber.eq(supply)
  })
})

contract('Tracker:Rebase:Expansion', function (accounts) {
  const policy = accounts[1]
  const MAX_SUPPLY = new BN(2).pow(128).minus(1)

  describe('when totalSupply is less than MAX_SUPPLY and expands beyond', function () {
    beforeEach('setup Tracker contract', async function () {
      await setupContracts()
      await tracker.setPolicy(policy, { from: deployer })
      const totalSupply = await tracker.totalSupply.call()
      await tracker.rebase(1, MAX_SUPPLY.minus(totalSupply).minus(toUFrgDenomination(1)), { from: policy })
      r = await tracker.rebase(2, toUFrgDenomination(2), { from: policy })
    })

    it('should increase the totalSupply to MAX_SUPPLY', async function () {
      b = await tracker.totalSupply.call()
      b.should.be.bignumber.eq(MAX_SUPPLY)
    })

    it('should emit Rebase', async function () {
      const log = r.logs[0]
      expect(log).to.exist
      expect(log.event).to.eq('LogRebase')
      expect(log.args.epoch.toNumber()).to.eq(2)
      log.args.totalSupply.should.be.bignumber.eq(MAX_SUPPLY)
    })
  })

  describe('when totalSupply is MAX_SUPPLY and expands', function () {
    beforeEach(async function () {
      b = await tracker.totalSupply.call()
      b.should.be.bignumber.eq(MAX_SUPPLY)
      r = await tracker.rebase(3, toUFrgDenomination(2), { from: policy })
    })

    it('should NOT change the totalSupply', async function () {
      b = await tracker.totalSupply.call()
      b.should.be.bignumber.eq(MAX_SUPPLY)
    })

    it('should emit Rebase', async function () {
      const log = r.logs[0]
      expect(log).to.exist
      expect(log.event).to.eq('LogRebase')
      expect(log.args.epoch.toNumber()).to.eq(3)
      log.args.totalSupply.should.be.bignumber.eq(MAX_SUPPLY)
    })
  })
})

contract('Tracker:Rebase:NoChange', function (accounts) {
  // Rebase (0%), with starting balances A:750 and B:250.
  const A = accounts[2]
  const B = accounts[3]
  const policy = accounts[1]

  beforeEach('setup Tracker contract', async function () {
    await setupContracts()
    await tracker.setPolicy(policy, { from: deployer })
    await tracker.transfer(A, toUFrgDenomination(750), { from: deployer })
    await tracker.transfer(B, toUFrgDenomination(250), { from: deployer })
    r = await tracker.rebase(1, 0, { from: policy })
  })

  it('should NOT CHANGE the totalSupply', async function () {
    b = await tracker.totalSupply.call()
    b.should.be.bignumber.eq(initialSupply)
  })

  it('should NOT CHANGE individual balances', async function () {
    b = await tracker.balanceOf.call(A)
    b.should.be.bignumber.eq(toUFrgDenomination(750))

    b = await tracker.balanceOf.call(B)
    b.should.be.bignumber.eq(toUFrgDenomination(250))
  })

  it('should emit Rebase', async function () {
    const log = r.logs[0]
    expect(log).to.exist
    expect(log.event).to.eq('LogRebase')
    log.args.epoch.should.be.bignumber.eq('1')
    log.args.totalSupply.should.be.bignumber.eq(initialSupply)
  })
})

contract('Tracker:Rebase:Contraction', function (accounts) {
  // Rebase -5M (-10%), with starting balances A:750 and B:250.
  const A = accounts[2]
  const B = accounts[3]
  const policy = accounts[1]
  const rebaseAmt = INTIAL_SUPPLY / 10

  beforeEach('setup Tracker contract', async function () {
    await setupContracts()
    await tracker.setPolicy(policy, { from: deployer })
    await tracker.transfer(A, toUFrgDenomination(750), { from: deployer })
    await tracker.transfer(B, toUFrgDenomination(250), { from: deployer })
    r = await tracker.rebase(1, -rebaseAmt, { from: policy })
  })

  it('should decrease the totalSupply', async function () {
    b = await tracker.totalSupply.call()
    b.should.be.bignumber.eq(initialSupply.minus(rebaseAmt))
  })

  it('should decrease individual balances', async function () {
    b = await tracker.balanceOf.call(A)
    b.should.be.bignumber.eq(toUFrgDenomination(675))

    b = await tracker.balanceOf.call(B)
    b.should.be.bignumber.eq(toUFrgDenomination(225))
  })

  it('should emit Rebase', async function () {
    const log = r.logs[0]
    expect(log).to.exist
    expect(log.event).to.eq('LogRebase')
    log.args.epoch.should.be.bignumber.eq('1')
    log.args.totalSupply.should.be.bignumber.eq(initialSupply.minus(rebaseAmt))
  })
})

contract('Tracker:Transfer', function (accounts) {
  const A = accounts[2]
  const B = accounts[3]
  const C = accounts[4]

  beforeEach('setup Tracker contract', setupContracts)

  describe('deployer transfers 12 to A', function () {
    it('should have correct balances', async function () {
      const deployerBefore = await tracker.balanceOf.call(deployer)
      await tracker.transfer(A, toUFrgDenomination(12), { from: deployer })
      b = await tracker.balanceOf.call(deployer)
      b.should.be.bignumber.eq(deployerBefore.minus(toUFrgDenomination(12)))
      b = await tracker.balanceOf.call(A)
      b.should.be.bignumber.eq(toUFrgDenomination(12))
    })
  })

  describe('deployer transfers 15 to B', async function () {
    it('should have balances [973,15]', async function () {
      const deployerBefore = await tracker.balanceOf.call(deployer)
      await tracker.transfer(B, toUFrgDenomination(15), { from: deployer })
      b = await tracker.balanceOf.call(deployer)
      b.should.be.bignumber.eq(deployerBefore.minus(toUFrgDenomination(15)))
      b = await tracker.balanceOf.call(B)
      b.should.be.bignumber.eq(toUFrgDenomination(15))
    })
  })

  describe('deployer transfers the rest to C', async function () {
    it('should have balances [0,973]', async function () {
      const deployerBefore = await tracker.balanceOf.call(deployer)
      await tracker.transfer(C, deployerBefore, { from: deployer })
      b = await tracker.balanceOf.call(deployer)
      b.should.be.bignumber.eq('0')
      b = await tracker.balanceOf.call(C)
      b.should.be.bignumber.eq(deployerBefore)
    })
  })

  describe('when the recipient address is the contract address', function () {
    const owner = A

    it('reverts on transfer', async function () {
      expect(
        await chain.isEthException(tracker.transfer(tracker.address, unitTokenAmount, { from: owner })),
      ).to.be.true
    })

    it('reverts on transferFrom', async function () {
      expect(
        await chain.isEthException(tracker.transferFrom(owner, tracker.address, unitTokenAmount, { from: owner })),
      ).to.be.true
    })
  })

  describe('when the recipient is the zero address', function () {
    const owner = A

    beforeEach(async function () {
      r = await tracker.approve(ZERO_ADDRESS, transferAmount, { from: owner })
    })
    it('emits an approval event', async function () {
      expect(r.logs.length).to.eq(1)
      expect(r.logs[0].event).to.eq('Approval')
      expect(r.logs[0].args.owner).to.eq(owner)
      expect(r.logs[0].args.spender).to.eq(ZERO_ADDRESS)
      r.logs[0].args.value.should.be.bignumber.eq(transferAmount)
    })

    it('transferFrom should fail', async function () {
      expect(
        await chain.isEthException(tracker.transferFrom(owner, ZERO_ADDRESS, transferAmount, { from: C })),
      ).to.be.true
    })
  })
})
