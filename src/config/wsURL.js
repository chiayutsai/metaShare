import getEnvConfig from './index'

const dev = `${window.location.origin.replace('http', 'ws')}/websocket`

const production = 'wss://mata-share-backend.herokuapp.com/websocket'

const wsURL = getEnvConfig({
  development: __DEV__ && dev,
  production: __PROD__ && production,
})

export default wsURL
