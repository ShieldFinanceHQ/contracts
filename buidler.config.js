require('dotenv').config();

usePlugin('@nomiclabs/buidler-truffle5');
// usePlugin('@nomiclabs/buidler-waffle');
// usePlugin('@nomiclabs/buidler-ethers');
usePlugin('@openzeppelin/buidler-upgrades');
// usePlugin('buidler-spdx-license-identifier');
usePlugin('buidler-deploy');

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
  networks: {
    buidlerevm: {},
    ropsten: {
      url: process.env.ROPSTEN_URL,
      from: process.env.ROPSTEN_FROM,
      accounts: process.env.ROPSTEN_PRIVATE_KEYS.split(',')
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      from: process.env.MAINNET_FROM,
      accounts: process.env.MAINNET_PRIVATE_KEYS.split(',')
    }
  },
  solc: {
    version: '0.6.12',
    optimizer: { enabled: true, runs: 200 }
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true
  },
  namedAccounts: {
    deployer: {
      default: 0 // here this will by default take the first account as deployer
      // 4: '0xffffeffffff', // but for rinkeby it will be a specific address
      // "specialnetwork": "0xf34e...", //it can also specify a specific netwotk name (specified in buidler.config.js)
    },
    user: {
      default: 1 // here this will by default take the second account as user (so in the test this will be a different account than the deployer)
      //   1: '0xffffeaaa', // on the mainnet the user could be a multi sig
      //   4: '0xaaaeffffff', // on rinkeby it could be another account
    }
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
