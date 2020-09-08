const { basename } = require('path');

module.exports = async ({ getNamedAccounts, deployments, getChainId, network }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const tracker = await deploy('Tracker', {
    proxy: true,
    from: deployer,
    args: [],
    log: true
  });

  const domain = `${network.name === 'mainnet' ? '' : (network.name + '.')}etherscan.io`;
  console.info('Tracker:', `https://${domain}/address/${tracker.address}`);
  console.info(`${basename(__filename)} executed`);
};
