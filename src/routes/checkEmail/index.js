/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Layout from 'components/Layout/Layout'

const action = async () => ({
  title: '',
  chunks: ['checkEmail'],
  component: <Layout view="login">checkEmail</Layout>,
})

export default action
