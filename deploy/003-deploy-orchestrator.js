const { basename } = require('path');

module.exports = async ({ getNamedAccounts, deployments, getChainId, network }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const orchestrator = await deploy('Orchestrator', {
    proxy: true,
    from: deployer,
    args: [],
  });

  let domain = `${network.name === 'mainnet' ? '' : (network.name + '.')}etherscan.io`;
  console.info('Orchestrator:', `https://${domain}/address/${orchestrator.address}`);
  console.info(`${basename(__filename)} executed`);
};

module.exports.tags = ['Orchestrator'];
