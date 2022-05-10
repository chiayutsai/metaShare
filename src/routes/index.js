/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route

const routes = {
  path: '/metaShare',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/register',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/forgetPassword',
      load: () =>
        import(/* webpackChunkName: 'forgetPassword' */ './ForgetPassword'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],
  async action({ next, route: contextRoute, store, query }) {
    /*
     * config() can block whole app render
     * request() wont block
     *
     * because component rendering need i18n initialize,
     *
     */
    // Execute each child route until one of them return the result
    if (contextRoute.config) {
      const result = await contextRoute.config(store, query)
      // https://juejin.im/post/5d59fd7ff265da03f233cc4b
      contextRoute.config = undefined // eslint-disable-line no-param-reassign
      if (result) return result
    }

    // Execute each child route until one of them return the result
    const route = await next()

    ;(async () => {
      if (contextRoute.request) {
        await contextRoute.request(store, query)
        // https://juejin.im/post/5d59fd7ff265da03f233cc4b
        contextRoute.request = undefined // eslint-disable-line no-param-reassign
      }
    })()

    // Provide default values for title, description etc.
    route.title = `${route.title || ''}`
    route.description = route.description || ''

    return route
  },
}

export default routes
