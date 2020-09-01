// We require the Buidler Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `buidler run <script>` you'll find the Buidler
// Runtime Environment's members available in the global scope.
const bre = require('@nomiclabs/buidler');
const { deployments, getNamedAccounts } = bre;
const { BN } = require('ethereumjs-util');

async function main () {
  const { read, execute } = deployments;
  const { deployer, user } = await getNamedAccounts();
  const storedCurrentRate = process.argv[process.argv.length - 2];
  const storedTargetRate = process.argv[process.argv.length - 1];

  const result = await execute('Orchestrator', { from: deployer }, 'rebase', '653313740501264965', '326656870250632482');
  console.info('Result: ', result);

  const totalSupply = await read('Tracker', { from: user }, 'totalSupply');
  console.info('Total supply: ', totalSupply.toString());

  // // We get the contract to deploy
  // const Greeter = await ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Buidler!");
  //
  // await greeter.deployed();
  //
  // console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
