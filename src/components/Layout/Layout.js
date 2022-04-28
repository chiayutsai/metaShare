/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// external-global styles must be imported in your JS.
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { appReadySelector } from 'selectors'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import ModalList from '../ModalList/ModalList'
import './tailwind.css'

const Layout = ({ children }) => {
  const appReady = useSelector(appReadySelector)

  return (
    <ErrorBoundary>
      {/* {!appReady && <LoadingLayout />} 全版 */}
      {appReady && (
        <>
          {children}

          <ModalList />
          {/* {loading && <LoadingModal />} 遮罩版 */}
        </>
      )}
    </ErrorBoundary>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
