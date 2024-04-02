/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox')
const dotenv = require('dotenv')
dotenv.config();


module.exports = {
  defaultNetwork: 'cyprus1',
  networks: {
    cyprus1: {
      url: `${process.env.CYPRUS1URL}`,
      accounts: [process.env.CYPRUS1PK],
      chainId: Number(process.env.CHAINID),
    }
  },

  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  etherscan: {
    apiKey: {
      cyprus1: 'de93f4fd-6905-458f-a847-85fd90287e9d',
    },
    customChains: [
      {
        network: 'cyprus1',
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: 'https://cyprus1.colosseum.quaiscan.io/api',
          browserURL: 'https://cyprus1.colosseum.quaiscan.io',
        }
      },
    ],
  },

  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
}