// Required by @openzeppelin/upgrades when running from truffle
global.artifacts = artifacts;
global.web3 = web3;

const BigNumber = web3.utils.BN;

// Import dependencies from OpenZeppelin SDK programmatic library
const { Contracts, ProxyAdminProject, SimpleProject, ZWeb3 } = require('@openzeppelin/upgrades');

async function main(UFragmentsInstanceAddress, UFragmentsPolicyInstanceAddress, OrchestratorInstanceAddress) {
  /* Initialize OpenZeppelin's Web3 provider. */
  ZWeb3.initialize(web3.currentProvider);

  /* Retrieve a couple of addresses to interact with the contracts. */
  const [creatorAddress] = await ZWeb3.eth.getAccounts();

  /* Create a SimpleProject to interact with OpenZeppelin programmatically. */
  const project = new ProxyAdminProject('MyProject', null, null, { from: creatorAddress });

  const UFragments = Contracts.getFromLocal('UFragments');
  const UFragmentsPolicy = Contracts.getFromLocal('UFragmentsPolicy');
  const Orchestrator = Contracts.getFromLocal('Orchestrator');

  console.log('Name', await UFragments.at(UFragmentsInstanceAddress).methods.name().call({ from: creatorAddress }));
  console.log('Symbol', await UFragments.at(UFragmentsInstanceAddress).methods.symbol().call({ from: creatorAddress }));
  console.log('Total supply', await UFragments.at(UFragmentsInstanceAddress).methods.totalSupply().call({ from: creatorAddress }));

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
  const UFragmentsInstanceAddress = argv[argv.length - 3];
  const UFragmentsPolicyInstanceAddress = argv[argv.length - 2];
  const OrchestratorInstanceAddress = argv[argv.length - 1];
  main(UFragmentsInstanceAddress, UFragmentsPolicyInstanceAddress, OrchestratorInstanceAddress).then(() => callback()).catch(err => callback(err));
};
