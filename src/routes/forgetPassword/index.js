/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Layout from 'components/Layout/Layout'
import ForgetPassword from './ForgetPassword'

const action = async () => ({
  title: 'metaShare',
  chunks: ['forgetPassword'],
  component: (
    <Layout view="login">
      <ForgetPassword />
    </Layout>
  ),
})

export default action
