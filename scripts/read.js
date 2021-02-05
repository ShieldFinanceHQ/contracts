// We require the hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the hardhat
// Runtime Environment's members available in the global scope.
const bre = require('@nomiclabs/hardhat')
const { deployments, getNamedAccounts } = bre

async function main () {
  const { read, execute } = deployments
  const { user } = await getNamedAccounts()

  const name = await read('Tracker', { from: user }, 'name')
  console.info('Name: ', name)

  const symbol = await read('Tracker', { from: user }, 'symbol')
  console.info('Symbol: ', symbol)

  const totalSupply = await read('Tracker', { from: user }, 'totalSupply')
  console.info('Total supply: ', totalSupply.toString())

  // // We get the contract to deploy
  // const Greeter = await ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, hardhat!");
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
    console.error(error)
    process.exit(1)
  })
