const { basename } = require('path');

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { get, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const tracker = await get('Tracker');
  const policy = await get('Policy');
  const orchestrator = await get('Orchestrator');

  // TODO: Maybe this will make me pay for redeployment each time this code is executed (if 'always failing transaction' still consumes gas - most likely it does not)
  const trackerInitialize = await execute('Tracker', { from: deployer }, 'initialize', 'FTX Volume Tracker', 'FVT').catch(ignoreErrorIfInitialized);
  const policyInitialize = await execute('Policy', { from: deployer }, 'initialize', tracker.address).catch(ignoreErrorIfInitialized);
  const orchestratorInitialize = await execute('Orchestrator', { from: deployer }, 'initialize', policy.address).catch(ignoreErrorIfInitialized);

  // Not needed: the higher-order contracts call set* methods on their subordinates
  // const trackerSetPolicy = await execute('Tracker', { from: deployer }, 'setPolicy', policy.address);
  // const policySetOrchestrator = await execute('Policy', { from: deployer }, 'setOrchestrator', orchestrator.address);

  // const result = await read('Tracker', { from: deployer }, 'policy');
  // console.log('result', result);

  console.info(`${basename(__filename)} executed`);
};

function ignoreErrorIfInitialized (error) {
  if (error.message.includes('always failing transaction')) {
    return;
  }
  throw error;
}
