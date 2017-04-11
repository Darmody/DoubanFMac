import R from 'ramda'

let env = {}

if (process.env.NODE_ENV === 'production') {
  env = require('./.env.json')
} else {
  require('dotenv').config()
  env = process.env
}

const defaultConfig = {
  DOUBAN: {
    CLIENT_ID: env.DOUBAN_CLIENT_ID,
    CLIENT_SECRET: env.DOUBAN_CLIENT_SECRET,
  },
}

const createConfig = config => R.merge(defaultConfig, config)

const configuration = {
  development: createConfig({
  }),
  production: createConfig({
  }),
  test: createConfig({
  }),
}

export default configuration[process.env.NODE_ENV || 'development']
