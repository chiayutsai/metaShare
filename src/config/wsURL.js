import getEnvConfig from './index'

const dev = `${window.location.origin.replace('http', 'ws')}/websocket`

const production = 'ws://34.80.94.59/websocket'

const wsURL = getEnvConfig({
  development: __DEV__ && dev,
  production: __PROD__ && production,
})

export default wsURL
