/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import fs from 'fs'
import path from 'path'
import CompressionPlugin from 'compression-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactDOM from 'react-dom/server'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'
import WebpackAssetsManifest from 'webpack-assets-manifest'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import WebpackBar from 'webpackbar'
import Html from '../src/components/Html'
import environments from './environments.config'

process.traceDeprecation = true

const ROOT_DIR = path.resolve(__dirname, '..')
export const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args)
const SRC_DIR = resolvePath('src')
const BUILD_DIR = resolvePath('build')

const { isDebug, isVerbose, env } = environments
const isAnalyze =
  process.argv.includes('--analyze') || process.argv.includes('--analyse')

const reScript = /\.(js|jsx|mjs)$/
const reStyle = /\.(css|less|styl|scss|sass|sss)$/
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/

const localIdentName = isDebug
  ? '[name]-[local]-[hash:base64:5]'
  : '[hash:base64:5]'

//
// Common configuration chunk to be used for both
// client-side (client.js) bundles
// -----------------------------------------------------------------------------

const config = {
  context: ROOT_DIR,

  mode: isDebug ? 'development' : 'production',

  output: {
    path: resolvePath(
      BUILD_DIR,
      'public',
      environments.publicPath.replace(/^\//, ''),
    ),
    publicPath: environments.publicPath,
    pathinfo: isVerbose,
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug
      ? '[name].chunk.js'
      : '[name].[chunkhash:8].chunk.js',
    assetModuleFilename: isDebug
      ? '[path][name][ext]?[contenthash:8]'
      : '[contenthash:8][ext]',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  resolve: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // Keep in sync with .flowconfig and .eslintrc
    modules: ['node_modules', 'src'],
    symlinks: false,
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    // https://webpack.js.org/configuration/node/
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    fallback: {
      fs: false,
      net: false,
      tls: false,
    },
  },

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // [0] Rules for JS / JSX
      {
        test: reScript,
        include: [SRC_DIR, resolvePath('tools')],
        loader: 'babel-loader',
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          configFile: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: environments.browserslist,
                },
                forceAllTransforms: !isDebug, // for UglifyJS
                modules: false,
                useBuiltIns: false,
                debug: false,
              },
            ],
            // JSX
            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
            [
              '@babel/preset-react',
              { development: isDebug, runtime: 'automatic' },
            ],
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',

            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            ['@babel/plugin-proposal-class-properties', { loose: false }],
            '@babel/plugin-proposal-json-strings',

            '@babel/plugin-proposal-optional-chaining',

            // Treat React JSX elements as value types and hoist them to the highest scope
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
            ...(isDebug
              ? []
              : ['@babel/plugin-transform-react-constant-elements']),
            // Replaces the React.createElement function with one that is more optimized for production
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
            ...(isDebug
              ? []
              : ['@babel/plugin-transform-react-inline-elements']),
            // Remove unnecessary React propTypes from the production build
            // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
            ...(isDebug ? [] : ['transform-react-remove-prop-types']),
          ],
        },
      },

      // [1] Rules for Style Sheets
      {
        test: reStyle,
        exclude: /tailwind/,
        rules: [
          // Convert CSS into JS module
          {
            issuer: { not: [reStyle] },
            use: 'isomorphic-style-loader',
          },

          // Process external/third-party styles
          {
            exclude: SRC_DIR,
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
            },
          },

          // Process internal/project styles (from src folder)
          {
            include: SRC_DIR,
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: isDebug,
              esModule: false,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: {
                localIdentName,
              },
            },
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: './tools/postcss.config.js',
              },
            },
          },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          {
            test: /\.(scss|sass)$/,
            loader: 'sass-loader',
          },
        ],
      },

      // [2] Rules for tailwind
      {
        test: reStyle,
        include: /tailwind/,
        rules: [
          // Convert CSS into JS module
          {
            loader: 'style-loader',
          },

          // Process external/third-party styles
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
            },
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: './tools/postcss.config.js',
              },
            },
          },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          {
            test: /\.(scss|sass)$/,
            loader: 'sass-loader',
          },
        ],
      },

      // [3] Rules for images
      {
        test: reImage,
        type: 'asset',
        oneOf: [
          {
            issuer: reScript,
            oneOf: [
              // convert svg file to react component
              {
                test: /\.svg$/,
                use: ['@svgr/webpack?svgo=false', 'url-loader'],
                type: 'javascript/auto',
              },
            ],
          },
        ],
      },

      // [4] Convert plain text into JS module
      {
        test: /\.txt$/,
        type: 'asset',
      },

      // [5] Convert Markdown into HTML
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './lib/markdown-loader.js'),
      },

      // [6] Return public URL for all assets unless explicitly excluded
      // DO NOT FORGET to update `exclude` list when you adding a new loader
      {
        exclude: [reScript, reStyle, reImage, /\.json$/, /\.txt$/, /\.md$/],
        type: 'asset',
      },

      // Exclude dev modules from production build
      ...(isDebug
        ? []
        : [
            {
              test: resolvePath(
                'node_modules/react-deep-force-update/lib/index.js',
              ),
              loader: 'null-loader',
            },
          ]),
    ],
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug && {
    type: 'filesystem',
  },

  // Specify what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose,
  },

  // Choose a developer tool to enhance debugging
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: false,

  // name: 'client',
  // target: 'web',

  entry: {
    main: ['./src/main.js'],
  },

  plugins: [
    // 0
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      ...environments.globals,
      'process.env.BROWSER': true,
    }),

    // 1
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    // 2
    // Emit a file with assets paths
    // https://github.com/webdeveric/webpack-assets-manifest#options
    new WebpackAssetsManifest({
      output: `${BUILD_DIR}/asset-manifest.json`,
      publicPath: true,
      writeToDisk: true,
      customize: ({ key, value }) => {
        // You can prevent adding items to the manifest by returning false.
        if (key.toLowerCase().endsWith('.map')) return false
        return { key, value }
      },
      done: (manifest, stats) => {
        // Write chunk-manifest.json.json
        const chunkFileName = `${BUILD_DIR}/chunk-manifest.json`
        try {
          const fileFilter = file => !file.endsWith('.map')
          const addPath = file => manifest.getPublicPath(file)
          const chunkFiles = stats.compilation.chunkGroups.reduce((acc, c) => {
            acc[c.name] = [
              ...(acc[c.name] || []),
              ...c.chunks.reduce(
                (files, cc) => [
                  ...files,
                  ...[...cc.files].filter(fileFilter).map(addPath),
                ],
                [],
              ),
            ]
            return acc
          }, Object.create(null))
          fs.writeFileSync(chunkFileName, JSON.stringify(chunkFiles, null, 2))
        } catch (err) {
          console.error(`ERROR: Cannot write ${chunkFileName}: `, err)
          if (!isDebug) process.exit(1)
        }
      },
    }),

    // 3
    new HtmlWebpackPlugin({
      templateContent: () => {
        const data = {
          title: '',
          description: '',
          config: {},
          styles: [],
        }
        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)
        return `<!doctype html>${html}`
      },
      hash: false,
      filename: '../index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),

    // 4
    new StyleLintPlugin({
      emitErrors: false,
    }),

    // 5
    // You can comment the code below due to it severely impacting build times for larger projects.
    // `yarn lint-js` still exists to aid in deploy processes (such as with CI),
    // and it's recommended that you use a linting plugin for your IDE in place of this loader.
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      lintDirtyModulesOnly: true,
      exclude: ['node_modules', 'src/library'],
      threads: true,
    }),

    ...(isDebug
      ? [
          // 6
          new webpack.SourceMapDevToolPlugin({
            exclude: [/src\/library/],
          }),

          // 7
          new WebpackBar({
            profile: true,
            reporters: ['fancy', 'basic', 'profile', 'stats'],
          }),
        ]
      : [
          // 6
          new CompressionPlugin(),

          // 7
          // Webpack Bundle Analyzer
          // https://github.com/th0r/webpack-bundle-analyzer
          ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
        ]),
  ],

  // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
  optimization: {
    minimize: !isDebug,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // Remove commnet
        parallel: true, // Parallel compile
        exclude: /\.min\.js$/, // filter min.js from uglify
        terserOptions: {
          compress: {
            drop_console: env === 'production',
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
        default: false,
        share: {
          minChunks: 2,
          priority: 20,
          reuseExistingChunk: true,
          name: 'share',
        },
      },
    },
  },
}

export default config
