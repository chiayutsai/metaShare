/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  ignorePatterns: ['!**/.*'],

  parser: 'babel-eslint',

  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:css-modules/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
  ],

  plugins: ['css-modules', 'prettier', 'import', 'babel'],

  globals: {
    PORT: false,
    __ENV__: false,
    __DEV__: false,
    __PROD__: false,
    __VERSION__: false,
    __HASH__: false,
    __RELEASE__: false,
    __GA__: false,
  },

  env: {
    browser: true,
  },

  rules: {
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
        ],
      },
    ],

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],

    'no-underscore-dangle': [2, { allow: ['__REDUX_DEVTOOLS_EXTENSION__'] }],

    'no-console': 'off',

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // Ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    // Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
    'jsx-a11y/click-events-have-key-events': 'off',

    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    // Functional and class components are equivalent from React’s point of view
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',

    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': 'error',

    // overwrite prettier setting
    'arrow-body-style': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 0,

    'react/jsx-props-no-spreading': 0,

    // https://github.com/babel/eslint-plugin-babel/issues/185#issuecomment-569996329
    'no-unused-expressions': 'off',

    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // TODO: fix babel/no-unused-expressions when using optional chaining
    'babel/no-unused-expressions': 'warn',
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
