import { combineReducers } from 'redux'
import majorReducers from '../reducers'

/**
 * react-redux-starter-kit version
 * https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js
 */
export const makeRootReducer = asyncReducers =>
  combineReducers({ ...majorReducers, ...asyncReducers })

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
