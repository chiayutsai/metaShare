/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { cleanDir } from './lib/fs'

/**
 * Cleans up the cache directory.
 */
function cleanCache() {
  return Promise.all([
    cleanDir('node_modules/.cache', {
      nosort: true,
      dot: true,
    }),
  ])
}

export default cleanCache
