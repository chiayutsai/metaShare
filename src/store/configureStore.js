import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { registerSelectors, getStateWith } from 'reselect-tools'
import * as selectors from 'selectors'
import { makeRootReducer } from 'store/makeRootReducer'
import pkg from '../../package.json'
import createHelpers from './createHelpers'

const { name, version } = pkg
const configureStore = (initialState, helpersConfig) => {
  const helpers = createHelpers(helpersConfig)
  const middleware = [thunk.withExtraArgument(helpers)]

  let enhancer

  if (__DEV__) {
    // eslint-disable-next-line global-require
    const createLogger = require('./logger').default
    middleware.push(createLogger())

    // https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production
    const composeEnhancers = composeWithDevTools({
      // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
      name: `${name}@${version}`,
      trace: true,
    })

    // https://redux.js.org/docs/api/applyMiddleware.html
    enhancer = composeEnhancers(applyMiddleware(...middleware))

    registerSelectors(selectors)
  } else {
    enhancer = applyMiddleware(...middleware)
  }

  // https://redux.js.org/docs/api/createStore.html
  const store = createStore(makeRootReducer(), initialState, enhancer)
  store.asyncReducers = {}

  if (__DEV__) {
    getStateWith(() => store.getState())
  }

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const reducers = require('store/makeRootReducer').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default configureStore
