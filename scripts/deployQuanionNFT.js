const quais = require('quais')
const { pollFor } = require('quais-polling')
const QuanionJson = require('../artifacts/contracts/QuanionNFT.sol/QuanionNFT.json')
require('dotenv').config()


async function deployERC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url)
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const QuanionNFT = new quais.ContractFactory(QuanionJson.abi, QuanionJson.bytecode, wallet)

  // Broadcast deploy transaction
  const quanionNFT = await QuanionNFT.deploy({
    gasLimit: 5000000,
  })
  console.log('1 -- Deploy transaction broadcasted: ' + quanionNFT.deployTransaction.hash + '\n2 -- Waiting for transaction to be mined.')

  // Wait for contract to be deployed (using quais-polling)
  const deployReceipt = await pollFor(provider, 'getTransactionReceipt', [quanionNFT.deployTransaction.hash], 1.5, 1)
  console.log('3 -- Transaction mined. QuanionNFT deployed to:', deployReceipt.contractAddress)
  console.log('  -- Gas used:', deployReceipt.cumulativeGasUsed.toString())
}

deployERC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })