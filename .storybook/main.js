/* eslint-disable no-param-reassign */
require('@babel/register')
const path = require('path')
const globalWebpackConfig = require('../tools/webpack.config').default
const { resolvePath } = require('../tools/webpack.config')

module.exports = {
  features: {
    storyStoreV7: true,
  },

  staticDirs: [
    path.join(__dirname, '..', 'src/stories/assets').replace(/\\/g, '/'),
  ],

  stories: [
    path.join(__dirname, '..', 'src/**/*.stories.js').replace(/\\/g, '/'),
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-toolbars',
    'storybook-css-modules-preset',
  ],
  // Export a function. Accept the base config as the only param.

  core: {
    builder: 'webpack5',
  },
  webpackFinal: async config => {
    // TODO: decide if enable output setting later
    // config.output = {
    //   ...config.output,
    //   filename: globalWebpackConfig.output.filename,
    //   chunkFilename: globalWebpackConfig.output.chunkFilename,
    // }

    /*
     * resolve.modules
     */
    config.resolve.modules = globalWebpackConfig.resolve.modules

    /*
     * module.strictExportPresence
     */
    config.module.strictExportPresence =
      globalWebpackConfig.module.strictExportPresence

    /*
     * module.rules
     */
    // remove storybook image rule
    // storybook default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    config.module.rules = config.module.rules.filter(
      rule => !rule.test.test('.svg'),
    )

    config.module.rules.push(
      // script rule
      globalWebpackConfig.module.rules[0],
      // style rule
      globalWebpackConfig.module.rules[1],
      // tailwind rule
      globalWebpackConfig.module.rules[2],
      // svg rule
      globalWebpackConfig.module.rules[3],
      // txt rule
      globalWebpackConfig.module.rules[4],
      // markdown rule
      globalWebpackConfig.module.rules[5],
      // fallback rule
      // globalWebpackConfig.module.rules[6],
    )

    /*
     * cache
     */
    config.cache = globalWebpackConfig.cache
    config.cache.cacheDirectory = resolvePath(
      'node_modules/.cache/storybooks-webpack',
    )

    /*
     * plugins
     */
    config.plugins.push(
      // webpack.DefinePlugin
      globalWebpackConfig.plugins[0],

      // StyleLintPlugin
      globalWebpackConfig.plugins[4],

      // ESLintPlugin
      globalWebpackConfig.plugins[5],
    )

    // TODO: decide if enable splitChunks setting later
    // config.optimization.splitChunks =
    //   globalWebpackConfig.optimization.splitChunks

    // Return the altered config
    return config
  },
}
