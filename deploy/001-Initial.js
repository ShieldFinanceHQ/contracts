const { basename } = require('path');

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const tracker = await deploy('Tracker', {
    proxy: true,
    from: deployer,
    args: [],
  });

  const policy = await deploy('Policy', {
    proxy: true,
    from: deployer,
    args: [],
  });

  const orchestrator = await deploy('Orchestrator', {
    proxy: true,
    from: deployer,
    args: [],
  });

  const ignoreErrorIfInitialized = function (error) {
    if (error.message.includes('always failing transaction')) {
      return;
    }
    throw error;
  };

  const trackerInitialize = await execute('Tracker', { from: deployer }, 'initialize', 'FTX Volume Tracker', 'FVT').catch(ignoreErrorIfInitialized);
  const policyInitialize = await execute('Policy', { from: deployer }, 'initialize', tracker.address).catch(ignoreErrorIfInitialized);
  const orchestratorInitialize = await execute('Orchestrator', { from: deployer }, 'initialize', policy.address).catch(ignoreErrorIfInitialized);

  const trackerSetPolicy = await execute('Tracker', { from: deployer }, 'setMonetaryPolicy', policy.address);
  const policySetOrchestrator = await execute('Policy', { from: deployer }, 'setOrchestrator', orchestrator.address);

  console.info(`${basename(__filename)} executed`);
};
