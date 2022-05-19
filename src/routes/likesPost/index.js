/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Layout from 'components/Layout/Layout'
import LikesPost from './LikesPost'

const action = async () => ({
  title: 'metaShare',
  chunks: ['likesPost'],
  needCheckUser: true,
  component: (
    <Layout view="home">
      <LikesPost />
    </Layout>
  ),
})

export default action
