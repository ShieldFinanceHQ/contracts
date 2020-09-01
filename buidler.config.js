usePlugin("@nomiclabs/buidler-truffle5");
// usePlugin('@nomiclabs/buidler-waffle');
// usePlugin('@nomiclabs/buidler-ethers');
usePlugin('@openzeppelin/buidler-upgrades');
// usePlugin('buidler-spdx-license-identifier');

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solc: {
    version: '0.6.12',
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  }
};

// Old Truffle config:
//
// const connectionConfig = require('frg-ethereum-runners/config/network_config.json');
//
// module.exports = {
//   networks: {
//     ganacheUnitTest: connectionConfig.ganacheUnitTest,
//     gethUnitTest: connectionConfig.gethUnitTest,
//     testrpcCoverage: connectionConfig.testrpcCoverage
//   },
//   compilers: {
//     solc: {
//       version: '0.4.24',
//       settings: {
//         optimizer: {
//           enabled: false
//         }
//       }
//     }
//   },
//   mocha: {
//     enableTimeouts: false
//   }
// };
