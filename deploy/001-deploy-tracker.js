const { basename } = require('path');

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const tracker = await deploy('Tracker', {
    proxy: true,
    from: deployer,
    args: [],
  });

  console.info(`${basename(__filename)} executed`);
};
