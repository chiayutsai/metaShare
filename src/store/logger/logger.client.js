import { createLogger as reduxLogger } from 'redux-logger'

const createLogger = () =>
  // https://github.com/evgenyrodionov/redux-logger#options
  reduxLogger({
    collapsed: true,
  })

export default createLogger
