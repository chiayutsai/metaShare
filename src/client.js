/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import '@babel/polyfill'
import 'whatwg-fetch'
import FastClick from 'fastclick'
import { createPath } from 'history'
import queryString from 'query-string'
import deepForceUpdate from 'react-deep-force-update'
import ReactDOM from 'react-dom'
import App from 'components/App'
import history from 'history.js'
import router from 'router'
import configureStore from 'store/configureStore'
import { injectReducer } from 'store/makeRootReducer'
import { updateMeta } from 'utils/domUtils'
import insertCss from 'utils/insertCss'

console.info('__DEV__:', __DEV__)
console.info('__PROD__:', __PROD__)
console.info('__VERSION__:', __VERSION__)

// FastClick Setup
FastClick.attach(document.body)

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Initialize a new Redux store
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: configureStore({}, { history }),
  injectReducer,
}

const container = document.getElementById('app')
let currentLocation = history.location
let appInstance

const scrollPositionsHistory = {}

// Re-render the app when window.location changes
const onLocationChange = async ({ location, action }) => {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  }
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }
  currentLocation = location

  const isInitialRender = !action
  try {
    context.pathname = location.pathname
    context.query = queryString.parse(location.search)

    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context)

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return
    }

    if (route.redirect) {
      history.replace(route.redirect)
      return
    }

    if (route.next) {
      history.push(route.next)
      return
    }

    // eslint-disable-next-line react/no-render-return-value
    appInstance = ReactDOM.render(
      <App context={context} insertCss={insertCss}>
        {route.component}
      </App>,
      container,
      () => {
        if (isInitialRender) {
          // Switch off the native scroll restoration behavior and handle it manually
          // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
          }

          const elem = document.getElementById('css')
          if (elem) elem.parentNode.removeChild(elem)
          return
        }

        document.title = route.title

        updateMeta('description', route.description)
        // Update necessary tags in <head> at runtime here, ie:
        // updateMeta('keywords', route.keywords);
        // updateCustomMeta('og:url', route.canonicalUrl);
        // updateCustomMeta('og:image', route.imageUrl);
        // updateLink('canonical', route.canonicalUrl);
        // etc.

        let scrollX = 0
        let scrollY = 0
        const pos = scrollPositionsHistory[location.key]
        if (pos) {
          scrollX = pos.scrollX
          scrollY = pos.scrollY
        } else {
          const targetHash = location.hash.substr(1)
          if (targetHash) {
            const target = document.getElementById(targetHash)
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY)

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
          window.ga('send', 'pageview', createPath(location))
        }
      },
    )
  } catch (error) {
    if (__DEV__) {
      throw error
    }

    console.error(error)

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('RSK will reload your page after error')
      window.location.reload()
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange)
onLocationChange({ location: currentLocation })

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance)
    }

    onLocationChange({ location: currentLocation })
  })
}
