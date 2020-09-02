const { basename } = require('path');

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const policy = await deploy('Policy', {
    proxy: true,
    from: deployer,
    args: [],
  });

  console.info(`${basename(__filename)} executed`);
};
