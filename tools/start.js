/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path'
import compress from 'compression'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import clean from './clean'
import environments from './environments.config'
import run, { format } from './run'
import webpackConfig from './webpack.config'

const { proxies, port } = environments

function createCompilationPromise(name, compiler, config) {
  return new Promise((resolve, reject) => {
    let timeStart = new Date()

    compiler.hooks.compile.tap(name, () => {
      timeStart = new Date()
      console.info(`[${format(timeStart)}] Compiling '${name}'...`)
    })

    compiler.hooks.done.tap(name, stats => {
      console.info(stats.toString(config.stats))
      const timeEnd = new Date()
      const time = timeEnd.getTime() - timeStart.getTime()
      if (stats.hasErrors()) {
        console.info(
          `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`,
        )
        reject(new Error('Compilation failed!'))
      } else {
        console.info(
          `[${format(
            timeEnd,
          )}] Finished '${name}' compilation after ${time} ms`,
        )
        resolve(stats)
      }
    })
  })
}

let server

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  if (server) return server
  server = express()
  server.use(errorOverlayMiddleware())

  // Configure client-side hot module replacement
  webpackConfig.entry.main = ['./tools/lib/webpackHotDevClient']
    .concat(webpackConfig.entry.main)
    .sort((a, b) => b.includes('polyfill') - a.includes('polyfill'))
  webpackConfig.output.filename = webpackConfig.output.filename.replace(
    'chunkhash',
    'hash',
  )
  webpackConfig.output.chunkFilename = webpackConfig.output.chunkFilename.replace(
    'chunkhash',
    'hash',
  )
  webpackConfig.module.rules = webpackConfig.module.rules.filter(
    x => x.loader !== 'null-loader',
  )
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.optimization.emitOnErrors = false

  // Configure compilation
  await run(clean)

  const compiler = webpack(webpackConfig)
  const clientPromise = createCompilationPromise(
    'client',
    compiler,
    webpackConfig,
  )

  // Apply gzip compression
  server.use(compress())

  // proxy middleware
  // https://github.com/chimurai/http-proxy-middleware
  const proxySettings = proxies
  if (proxySettings) {
    proxySettings.forEach(proxySetting => {
      const prxOptions = {
        target: proxySetting.endpoint, // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          // '^/api/old-path' : '/api/new-path',     // rewrite path
          // '^/api/remove/path' : '/path'           // remove base path
        },
        router: {
          // when request.headers.host == 'dev.localhost:3000',
          // override target 'http://www.example.org' to 'http://localhost:8000'
          // 'dev.localhost:3000': 'http://localhost:8000',
        },
      }

      // create the proxy (without context)
      const apiProxy = createProxyMiddleware(prxOptions)
      proxySetting.paths.forEach(route => {
        server.use(route, apiProxy)
      })
    })
  }

  // https://github.com/webpack/webpack-dev-middleware
  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath.replace('.', ''),
      stats: {
        chunks: false,
        chunkModules: false,
        colors: true,
      },
    }),
  )

  // https://github.com/glenjamin/webpack-hot-middleware
  // server.use(webpackHotMiddleware(webpackConfig, { log: false }));
  server.use(
    // FIXME: hmr some time request wrong hash chunk
    webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
    }),
  )

  // Wait until bundles are ready
  await clientPromise

  const timeStart = new Date()
  console.info(`[${format(timeStart)}] Launching server...`)

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  server.use(express.static(path.resolve(__dirname, '../public')))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  server.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, '../index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      return res
    })
  })

  server.listen(port)

  const timeEnd = new Date()
  const time = timeEnd.getTime() - timeStart.getTime()
  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`)
  return server
}

export default start
