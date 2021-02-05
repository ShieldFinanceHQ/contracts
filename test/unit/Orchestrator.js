// const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const MockDownstream = artifacts.require('MockDownstream.sol')
const MockPolicy = artifacts.require('MockPolicy.sol')
const Orchestrator = artifacts.require('Orchestrator.sol')
const RebaseCallerContract = artifacts.require('RebaseCallerContract.sol')
const ConstructorRebaseCallerContract = artifacts.require('ConstructorRebaseCallerContract.sol')

const BN = web3.utils.BN
const _require = require('app-root-path').require
const BlockchainCaller = _require('/util/blockchain_caller')
const chain = new BlockchainCaller(web3)
const { expectRevert } = require('@openzeppelin/test-helpers')

require('chai')
  .use(require('chai-bn')(BN))
  .should()

let orchestrator, mockPolicy, mockDownstream
let r
let deployer, user

async function setupContracts () {
  // await chain.waitForSomeTime(86400)
  const accounts = await web3.eth.getAccounts()
  deployer = accounts[0]
  user = accounts[1]
  mockPolicy = await MockPolicy.new()
  orchestrator = await Orchestrator.new()
  mockDownstream = await MockDownstream.new()
  await orchestrator.initialize(mockPolicy.address)
  // [mockPolicy.address], { unsafeAllowCustomTypes: true });
}

contract('Orchestrator', function (accounts) {
  // NOTE: The deployed contracts are reused (before function runs only once)
  beforeEach('setup Orchestrator contract', setupContracts)

  describe('when sent ether', async function () {
    it('should reject', async function () {
      expect(
        await chain.isEthException(orchestrator.sendTransaction({ from: user, value: 1 })),
      ).to.be.true
    })
  })

  describe('when rebase called by a contract', function () {
    it('should fail', async function () {
      const rebaseCallerContract = await RebaseCallerContract.new()
      expect(
        await chain.isEthException(rebaseCallerContract.callRebase(orchestrator.address)),
      ).to.be.true
    })
  })

  describe('when rebase called by a contract which is being constructed', function () {
    it('should fail', async function () {
      expect(
        await chain.isEthException(ConstructorRebaseCallerContract.new(orchestrator.address)),
      ).to.be.true
    })
  })

  describe('when transaction list is empty', async function () {
    beforeEach('calling rebase', async function () {
      r = await orchestrator.rebase(new BN('653313740501264965'), new BN('653313740501264965'))
    })

    it('should have no transactions', async function () {
      (await orchestrator.transactionsLength.call()).should.be.bignumber.eq('0')
    })

    it('should call rebase on policy', async function () {
      const events = await mockPolicy.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('Policy')
      expect(events[0].returnValues.functionName).to.eq('rebase')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
    })

    it('should not have any subsequent logs', async function () {
      expect(r.receipt.rawLogs.length).to.eq(1)
    })
  })

  describe('when there is a single transaction', async function () {
    beforeEach('adding a transaction', async function () {
      const updateOneArgEncoded = mockDownstream.contract.methods.updateOneArg(12345).encodeABI()
      orchestrator.addTransaction(mockDownstream.address, updateOneArgEncoded, { from: deployer })
      r = await orchestrator.rebase(new BN('653313740501264965'), new BN('653313740501264965'))
    })

    it('should have 1 transaction', async function () {
      (await orchestrator.transactionsLength.call()).should.be.bignumber.eq('1')
    })

    it('should call rebase on policy', async function () {
      const events = await mockPolicy.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('Policy')
      expect(events[0].returnValues.functionName).to.eq('rebase')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
    })

    it('should call the transaction', async function () {
      const events = await mockDownstream.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('MockDownstream')
      expect(events[0].returnValues.functionName).to.eq('updateOneArg')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
      expect(events[1].event).to.eq('FunctionArguments')
      expect(events[1].returnValues.uintVals).to.deep.eq(['12345'])
      expect(events[1].returnValues.intVals).to.deep.eq([])
    })

    it('should not have any subsequent logs', async function () {
      expect(r.receipt.rawLogs.length).to.eq(3)
    })
  })

  describe('when there are two transactions', async function () {
    beforeEach('adding a transaction', async function () {
      const updateOneArgEncoded = mockDownstream.contract.methods.updateOneArg(12345).encodeABI()
      orchestrator.addTransaction(mockDownstream.address, updateOneArgEncoded, { from: deployer })
      const updateTwoArgsEncoded = mockDownstream.contract.methods.updateTwoArgs(12345, 23456).encodeABI()
      orchestrator.addTransaction(mockDownstream.address, updateTwoArgsEncoded, { from: deployer })
      r = await orchestrator.rebase(new BN('653313740501264965'), new BN('653313740501264965'))
    })

    it('should have 2 transactions', async function () {
      (await orchestrator.transactionsLength.call()).should.be.bignumber.eq('2')
    })

    it('should call rebase on policy', async function () {
      const events = await mockPolicy.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('Policy')
      expect(events[0].returnValues.functionName).to.eq('rebase')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
    })

    it('should call both transactions', async function () {
      const events = await mockDownstream.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('MockDownstream')
      expect(events[0].returnValues.functionName).to.eq('updateOneArg')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
      expect(events[1].event).to.eq('FunctionArguments')
      expect(events[1].returnValues.uintVals).to.deep.eq(['12345'])
      expect(events[1].returnValues.intVals).to.deep.eq([])

      expect(events[2].event).to.eq('FunctionCalled')
      expect(events[2].returnValues.instanceName).to.eq('MockDownstream')
      expect(events[2].returnValues.functionName).to.eq('updateTwoArgs')
      expect(events[2].returnValues.caller).to.eq(orchestrator.address)
      expect(events[3].event).to.eq('FunctionArguments')
      expect(events[3].returnValues.uintVals).to.deep.eq(['12345'])
      expect(events[3].returnValues.intVals).to.deep.eq(['23456'])
    })

    it('should not have any subsequent logs', async function () {
      expect(r.receipt.rawLogs.length).to.eq(5)
    })
  })

  describe('when 1st transaction is disabled', async function () {
    beforeEach('disabling a transaction', async function () {
      const updateOneArgEncoded = mockDownstream.contract.methods.updateOneArg(12345).encodeABI()
      await orchestrator.addTransaction(mockDownstream.address, updateOneArgEncoded, { from: deployer })
      const updateTwoArgsEncoded = mockDownstream.contract.methods.updateTwoArgs(12345, 23456).encodeABI()
      await orchestrator.addTransaction(mockDownstream.address, updateTwoArgsEncoded, { from: deployer })
      await orchestrator.setTransactionEnabled(0, false)
      r = await orchestrator.rebase(new BN('653313740501264965'), new BN('653313740501264965'))
    })

    it('should have 2 transactions', async function () {
      (await orchestrator.transactionsLength.call()).should.be.bignumber.eq('2')
    })

    it('should call rebase on policy', async function () {
      const events = await mockPolicy.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('Policy')
      expect(events[0].returnValues.functionName).to.eq('rebase')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
    })

    it('should call second transaction', async function () {
      const events = await mockDownstream.contract.getPastEvents()

      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('MockDownstream')
      expect(events[0].returnValues.functionName).to.eq('updateTwoArgs')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)

      expect(events[1].event).to.eq('FunctionArguments')
      expect(events[1].returnValues.uintVals).to.deep.eq(['12345'])
      expect(events[1].returnValues.intVals).to.deep.eq(['23456'])
    })

    it('should not have any subsequent logs', async function () {
      expect(r.receipt.rawLogs.length).to.eq(3)
    })
  })

  describe('when a transaction is removed', async function () {
    beforeEach('removing 1st transaction', async function () {
      const updateOneArgEncoded = mockDownstream.contract.methods.updateOneArg(12345).encodeABI()
      orchestrator.addTransaction(mockDownstream.address, updateOneArgEncoded, { from: deployer })
      const updateTwoArgsEncoded = mockDownstream.contract.methods.updateTwoArgs(12345, 23456).encodeABI()
      orchestrator.addTransaction(mockDownstream.address, updateTwoArgsEncoded, { from: deployer })
      await orchestrator.removeTransaction(0)
      r = await orchestrator.rebase(new BN('653313740501264965'), new BN('653313740501264965'))
    })

    it('should have 1 transaction', async function () {
      (await orchestrator.transactionsLength.call()).should.be.bignumber.eq('1')
    })

    it('should call rebase on policy', async function () {
      const events = await mockPolicy.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('Policy')
      expect(events[0].returnValues.functionName).to.eq('rebase')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
    })

    it('should call the transaction', async function () {
      const events = await mockDownstream.contract.getPastEvents()

      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('MockDownstream')
      expect(events[0].returnValues.functionName).to.eq('updateTwoArgs')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)

      expect(events[1].event).to.eq('FunctionArguments')
      expect(events[1].returnValues.uintVals).to.deep.eq(['12345'])
      expect(events[1].returnValues.intVals).to.deep.eq(['23456'])
    })

    it('should not have any subsequent logs', async function () {
      expect(r.receipt.rawLogs.length).to.eq(3)
    })
  })

  describe('when all transactions are removed', async function () {
    beforeEach('removing 1st transaction', async function () {
      // orchestrator.removeTransaction(0);
      r = await orchestrator.rebase(new BN('653313740501264965'), new BN('653313740501264965'))
    })

    it('should have 0 transactions', async function () {
      (await orchestrator.transactionsLength.call()).should.be.bignumber.eq('0')
    })

    it('should call rebase on policy', async function () {
      const events = await mockPolicy.contract.getPastEvents()
      expect(events[0].event).to.eq('FunctionCalled')
      expect(events[0].returnValues.instanceName).to.eq('Policy')
      expect(events[0].returnValues.functionName).to.eq('rebase')
      expect(events[0].returnValues.caller).to.eq(orchestrator.address)
    })

    it('should not have any subsequent logs', async function () {
      expect(r.receipt.rawLogs.length).to.eq(1)
    })
  })

  describe('when a transaction reverts', async function () {
    beforeEach('adding 3 transactions', async function () {
      const updateOneArgEncoded = mockDownstream.contract.methods.updateOneArg(123).encodeABI()
      orchestrator.addTransaction(mockDownstream.address, updateOneArgEncoded, { from: deployer })

      const revertsEncoded = mockDownstream.contract.methods.reverts().encodeABI()
      orchestrator.addTransaction(mockDownstream.address, revertsEncoded, { from: deployer })

      const updateTwoArgsEncoded = mockDownstream.contract.methods.updateTwoArgs(12345, 23456).encodeABI()
      orchestrator.addTransaction(mockDownstream.address, updateTwoArgsEncoded, { from: deployer })
      await expectRevert.unspecified(orchestrator.rebase(new BN('653313740501264965'), new BN('653313740501264965')))
    })

    it('should have 3 transactions', async function () {
      (await orchestrator.transactionsLength.call()).should.be.bignumber.eq('3')
    })
  })

  describe('Access Control', function () {
    describe('addTransaction', async function () {
      it('should be callable by owner', async function () {
        const updateNoArgEncoded = mockDownstream.contract.methods.updateNoArg().encodeABI()
        expect(
          await chain.isEthException(
            orchestrator.addTransaction(mockDownstream.address, updateNoArgEncoded, { from: deployer }),
          ),
        ).to.be.false
      })

      it('should be not be callable by others', async function () {
        const updateNoArgEncoded = mockDownstream.contract.methods.updateNoArg().encodeABI()
        expect(
          await chain.isEthException(
            orchestrator.addTransaction(mockDownstream.address, updateNoArgEncoded, { from: user }),
          ),
        ).to.be.true
      })
    })

    describe('setTransactionEnabled', async function () {
      it('should be callable by owner', async function () {
        const updateNoArgEncoded = mockDownstream.contract.methods.updateNoArg().encodeABI()
        expect(
          await chain.isEthException(
            orchestrator.addTransaction(mockDownstream.address, updateNoArgEncoded, { from: deployer }),
          ),
        ).to.be.false;
        (await orchestrator.transactionsLength.call()).should.be.bignumber.gt('0')
        expect(
          await chain.isEthException(
            orchestrator.setTransactionEnabled(0, true, { from: deployer }),
          ),
        ).to.be.false
      })

      it('should be not be callable by others', async function () {
        const updateNoArgEncoded = mockDownstream.contract.methods.updateNoArg().encodeABI()
        expect(
          await chain.isEthException(
            orchestrator.addTransaction(mockDownstream.address, updateNoArgEncoded, { from: deployer }),
          ),
        ).to.be.false;
        (await orchestrator.transactionsLength.call()).should.be.bignumber.gt('0')
        expect(
          await chain.isEthException(
            orchestrator.setTransactionEnabled(0, true, { from: user }),
          ),
        ).to.be.true
      })
    })

    describe('removeTransaction', async function () {
      it('should be not be callable by others', async function () {
        const updateNoArgEncoded = mockDownstream.contract.methods.updateNoArg().encodeABI()
        expect(
          await chain.isEthException(
            orchestrator.addTransaction(mockDownstream.address, updateNoArgEncoded, { from: deployer }),
          ),
        ).to.be.false;
        (await orchestrator.transactionsLength.call()).should.be.bignumber.gt('0')
        expect(
          await chain.isEthException(
            orchestrator.removeTransaction(0, { from: user }),
          ),
        ).to.be.true
      })

      it('should be callable by owner', async function () {
        const updateNoArgEncoded = mockDownstream.contract.methods.updateNoArg().encodeABI()
        expect(
          await chain.isEthException(
            orchestrator.addTransaction(mockDownstream.address, updateNoArgEncoded, { from: deployer }),
          ),
        ).to.be.false;
        (await orchestrator.transactionsLength.call()).should.be.bignumber.gt('0')
        expect(
          await chain.isEthException(
            orchestrator.removeTransaction(0, { from: deployer }),
          ),
        ).to.be.false
      })
    })

    describe('transferOwnership', async function () {
      it('should transfer ownership', async function () {
        (await orchestrator.owner.call()).should.equal(deployer)
        await orchestrator.transferOwnership(user);
        (await orchestrator.owner.call()).should.equal(user)
      })
    })
  })
})
