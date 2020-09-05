const { basename } = require('path');

module.exports = async ({ getNamedAccounts, deployments, getChainId, network }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const policy = await deploy('Policy', {
    proxy: true,
    from: deployer,
    args: [],
  });

  let domain = `${network.name === 'mainnet' ? '' : (network.name + '.')}etherscan.io`;
  console.info('Policy:', `https://${domain}/address/${policy.address}`);
  console.info(`${basename(__filename)} executed`);
};
