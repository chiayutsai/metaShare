/*  main.js 會掛在 index.html 上面當作入口.
    client.js 再拆出 chunk,
    client.js 之後的檔案就可以指定 cdn 加載的位置.
 */

// environments.config.js / cdnUrlPathVariable
// eslint-disable-next-line camelcase, no-undef, no-underscore-dangle
__webpack_public_path__ = window.__CDN_URL_PATH__

import(/* webpackChunkName: "client" */ './client')
