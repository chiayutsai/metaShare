/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Layout from 'components/Layout/Layout'
import Follow from './Follow'

const action = async () => ({
  title: 'metaShare',
  chunks: ['follow'],
  needCheckUser: true,
  component: (
    <Layout view="home">
      <Follow />
    </Layout>
  ),
})

export default action
