/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import environments from './environments.config'

const pkg = require('../package.json')

const { isDebug } = environments

// CSS Nano options http://cssnano.co/
const minimizeCssOptions = {
  discardComments: { removeAll: true },
}

module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    require.resolve('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
    // https://github.com/postcss/postcss-custom-properties
    require.resolve('postcss-custom-properties'),
    // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
    // https://github.com/postcss/postcss-custom-media
    require.resolve('postcss-custom-media'),
    // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
    // https://github.com/postcss/postcss-media-minmax
    require.resolve('postcss-media-minmax'),
    // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
    // https://github.com/postcss/postcss-custom-selectors
    require.resolve('postcss-custom-selectors'),
    // W3C calc() function, e.g. div { height: calc(100px - 2em); }
    // https://github.com/postcss/postcss-calc
    require.resolve('postcss-calc'),
    // Allows you to nest one style rule inside another
    // https://github.com/jonathantneal/postcss-nesting
    require.resolve('postcss-nesting'),
    // Unwraps nested rules like how Sass does it
    // https://github.com/postcss/postcss-nested
    require.resolve('postcss-nested'),
    // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
    // https://github.com/iamvdo/pleeease-filters
    require.resolve('pleeease-filters'),
    // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
    // https://github.com/robwierzbowski/node-pixrem
    require.resolve('pixrem'),
    // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
    // https://github.com/postcss/postcss-selector-matches
    require.resolve('postcss-selector-matches'),
    // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
    // https://github.com/postcss/postcss-selector-not
    require.resolve('postcss-selector-not'),
    // Postcss flexbox bug fixer
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    require.resolve('postcss-flexbugs-fixes'),
    // to prevent mobile browsers (mostly iOS) from getting their hover states "stuck" since hover
    // https://github.com/jackburns/postcss-require-hover
    require.resolve('postcss-require-hover'),
    // PostCSS Preset Env, which allows you easily to use all the features in cssdb.
    // See what features in which stage in https://preset-env.cssdb.org/features
    // https://github.com/csstools/postcss-preset-env
    require('postcss-preset-env')({
      stage: 3,
      browsers: pkg.browserslist,
      autoprefixer: { flexbox: 'no-2009' },
    }),
    // CSS Nano http://cssnano.co/
    ...(isDebug
      ? []
      : [
          require('cssnano')({
            preset: ['default', minimizeCssOptions],
          }),
        ]),
  ],
})
