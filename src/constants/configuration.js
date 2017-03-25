import R from 'ramda'
import dotenv from 'dotenv'

dotenv.config()

const defaultConfig = {
  DOUBAN: {
    CLIENT_ID: process.env.DOUBAN_CLIENT_ID,
    CLIENT_SECRET: process.env.DOUBAN_CLIENT_SECRET,
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
