import getEnvConfig from './index'

const dev = 'http://127.0.0.1:3000'

const production = 'https://mata-share-backend.herokuapp.com'

const baseURL = getEnvConfig({
  development: __DEV__ && dev,
  production: __PROD__ && production,
})

export default baseURL
