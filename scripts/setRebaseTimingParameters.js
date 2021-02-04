#!/usr/bin/env node

const argv = require('yargs') // eslint-disable-line
  .option('minRebaseTimeIntervalSec', {
    type: 'string',
    demandOption: true,
  })
  .option('rebaseWindowOffsetSec', {
    type: 'string',
    demandOption: true,
  })
  .option('rebaseWindowLengthSec', {
    type: 'string',
    demandOption: true,
  })
  .option('network', {
    alias: 'n',
    type: 'string',
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    default: false,
    description: 'Run with verbose logging',
  })
  .argv;

process.env.hardhat_NETWORK = argv['network'];
process.env.hardhat_SHOW_STACK_TRACES = true;
process.env.hardhat_VERBOSE = argv['verbose'];

// We require the hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the hardhat
// Runtime Environment's members available in the global scope.
const bre = require('@nomiclabs/hardhat');
const { deployments, getNamedAccounts } = bre;
const { BN } = require('ethereumjs-util');

async function main() {
  await bre.run('compile');

  const { read, execute } = deployments;
  const { deployer, user } = await getNamedAccounts();

  const receipt = await execute('Policy', { from: deployer }, 'setRebaseTimingParameters', argv['minRebaseTimeIntervalSec'], argv['rebaseWindowOffsetSec'], argv['rebaseWindowLengthSec']);
  console.info('TX: ', `https://etherscan.io/tx/${receipt.transactionHash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
