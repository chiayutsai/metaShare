import getEnvConfig from './index'

const dev = ''

const production = 'https://mata-share-backend.herokuapp.com'

const baseURL = getEnvConfig({
  development: __DEV__ && dev,
  production: __PROD__ && production,
})

export default baseURL
