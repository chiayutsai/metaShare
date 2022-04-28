/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import StyleContext from 'isomorphic-style-loader/StyleContext'
import PropTypes from 'prop-types'
import { Children } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context} insertCss={() => {}}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */

const App = ({ context, insertCss, children }) => (
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.
  <StyleContext.Provider value={{ insertCss }}>
    <ReduxProvider store={context.store}>
      {Children.only(children)}
    </ReduxProvider>
  </StyleContext.Provider>
)

App.propTypes = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  context: PropTypes.shape({
    // Inject reducer everywhere
    injectReducer: PropTypes.func.isRequired,
    // Universal HTTP client
    pathname: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    query: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    store: PropTypes.object,
    // Integrate Redux
    // http://redux.js.org/docs/basics/UsageWithReact.html
    ...ReduxProvider.childContextTypes,
  }).isRequired,
  children: PropTypes.element.isRequired,
}

export default App
