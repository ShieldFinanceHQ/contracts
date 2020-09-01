// Required by @openzeppelin/upgrades when running from truffle
global.artifacts = artifacts;
global.web3 = web3;

const BigNumber = web3.utils.BN;
const DECIMALS = new BigNumber(1e18);

// Import dependencies from OpenZeppelin SDK programmatic library
const { Contracts, ProxyAdminProject, SimpleProject, ZWeb3 } = require('@openzeppelin/upgrades');

async function main(UFragmentsInstanceAddress, UFragmentsPolicyInstanceAddress, OrchestratorInstanceAddress, currentRate, targetRate) {
  /* Initialize OpenZeppelin's Web3 provider. */
  ZWeb3.initialize(web3.currentProvider);

  /* Retrieve a couple of addresses to interact with the contracts. */
  const [creatorAddress] = await ZWeb3.eth.getAccounts();

  /* Create a SimpleProject to interact with OpenZeppelin programmatically. */
  const project = new ProxyAdminProject('MyProject', null, null, { from: creatorAddress });

  const UFragments = Contracts.getFromLocal('UFragments');
  const UFragmentsPolicy = Contracts.getFromLocal('UFragmentsPolicy');
  const Orchestrator = Contracts.getFromLocal('Orchestrator');

  const UFragmentsInstance = UFragments.at(UFragmentsInstanceAddress);
  const UFragmentsPolicyInstance = UFragments.at(UFragmentsPolicyInstanceAddress);
  const OrchestratorInstance = Orchestrator.at(OrchestratorInstanceAddress);

  await OrchestratorInstance.methods.rebase(currentRate.toString(), targetRate.toString()).send({ from: creatorAddress });
  // const rebaseResult = await OrchestratorInstance.methods.rebase(currentRate.toString(), targetRate.toString()).send({ from: creatorAddress });

  // console.info('Rebase result', rebaseResult);
  console.log('Total supply', await UFragmentsInstance.methods.totalSupply().call({ from: creatorAddress }));

  // const UFragmentsInstance = await project.createProxy(UFragments, { initArgs: [creatorAddress] });
  // const UFragmentsPolicyInstance = await project.createProxy(UFragmentsPolicy, { initArgs: [creatorAddress, UFragmentsInstance.options.address] });
  // const OrchestratorInstance = await project.createProxy(Orchestrator, { initArgs: [creatorAddress, UFragmentsPolicyInstance.options.address] });
  // const setOrchestratorResult = await UFragmentsPolicyInstance.methods.setOrchestrator(OrchestratorInstance.options.address).send({ from: creatorAddress });
  //
  // console.info('UFragments', UFragmentsInstance.options.address);
  // console.info('UFragmentsPolicy', UFragmentsPolicyInstance.options.address);
  // console.info('Orchestrator', OrchestratorInstance.options.address);
}

// For truffle exec
module.exports = function (callback) {
  const argv = process.argv.slice(0);
  let i = 5;
  const UFragmentsInstanceAddress = argv[argv.length - i--];
  const UFragmentsPolicyInstanceAddress = argv[argv.length - i--];
  const OrchestratorInstanceAddress = argv[argv.length - i--];
  const currentRate = new BigNumber(argv[argv.length - i--]).mul(DECIMALS);
  const targetRate = new BigNumber(argv[argv.length - i--]).mul(DECIMALS);
  main(UFragmentsInstanceAddress, UFragmentsPolicyInstanceAddress, OrchestratorInstanceAddress, currentRate, targetRate).then(() => callback()).catch(err => callback(err));
};
