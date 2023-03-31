import getEnvConfig from './index'

const dev = ''

const production = 'http://34.80.94.59'

const baseURL = getEnvConfig({
  development: __DEV__ && dev,
  production: __PROD__ && production,
})

export default baseURL
