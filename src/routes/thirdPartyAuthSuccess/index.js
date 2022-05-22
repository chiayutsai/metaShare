/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import history from 'history.js'
import BrowserStorage from 'utils/BrowserStorage'

const action = async ({ query }) => {
  BrowserStorage.set('token', query.token)
  history.push({
    pathname: '/metaShare',
    search: '',
  })

  return {
    component: <div />,
  }
}

export default action
