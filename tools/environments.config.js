import git from 'git-rev-sync'
import pkg from '../package.json'

const env = process.env.NODE_ENV || 'development'
const { name, engines, version, browserslist } = pkg
const gitHash = git.short()
const release = `${version}-${env}-${gitHash}`

// eslint-disable-next-line no-underscore-dangle
const __DEV__ = process.env.DEBUG === 'true' || env === 'development'

// ========================================================
// Default Configuration
// ========================================================
const config = {
  isDebug: false, // Compile optimization
  isVerbose: false, // Prints detailed information to the console
  env,
  name,
  engines,
  version,
  gitHash,
  release,
  browserslist,
  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  port: process.env.PORT || 5000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  publicPath: __DEV__ ? '/assets/' : '/metaShare/assets/',

  cdnUrlPathVariable: 'window.__CDN_URL_PATH__',
}

// ========================================================
// Environment Configuration
// ========================================================
const environments = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: {
    isDebug: true,
    proxies: [],
  },

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: {
    isDebug: process.env.DEBUG === 'true',
    isVerbose: true,
    proxies: [],
  },
}

Object.assign(config, environments[config.env])

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env.NODE_ENV': config.isDebug ? '"development"' : '"production"',
  // 'process.env.BLUEBIRD_DEBUG': 0,
  PORT: config.port,
  // available for both client side and server side
  __ENV__: JSON.stringify(config.env),
  __DEV__,
  __PROD__: config.env === 'production',
  __VERSION__: JSON.stringify(config.version),
  __HASH__: JSON.stringify(config.gitHash),
  __RELEASE__: JSON.stringify(config.release),
  __GA__: config.analytics.googleTrackingId
    ? JSON.stringify(config.analytics.googleTrackingId)
    : '""',
}
export default config
