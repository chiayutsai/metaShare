/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { setProfileUserId } from 'actions/profile'
import Layout from 'components/Layout/Layout'
import Profile from './Profile'

const action = async ({ store, params }) => {
  const { id } = params
  store.dispatch(setProfileUserId(id))
  return {
    title: '',
    chunks: ['prilfile'],
    needCheckUser: true,
    component: (
      <Layout view="profile">
        <Profile />
      </Layout>
    ),
  }
}

export default action
