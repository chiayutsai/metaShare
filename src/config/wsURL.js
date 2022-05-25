import getEnvConfig from './index'

const dev = 'ws://127.0.0.1:3000'

const production = 'ws://mata-share-backend.herokuapp.com'

const wsURL = getEnvConfig({
  development: __DEV__ && dev,
  production: __PROD__ && production,
})

export default wsURL
