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

const title = 'Page Not Found'

const action = () => {
  const hasToken = BrowserStorage.get('token')
  if (hasToken) {
    history.push('/metaShare')
  } else {
    history.push('/metaShare/login')
  }

  return {
    title,
    chunks: ['not-found'],
    component: <div />,
    status: 404,
  }
}

export default action
