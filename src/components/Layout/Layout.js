/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// external-global styles must be imported in your JS.
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { appReadySelector } from 'selectors'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import ModalList from '../ModalList/ModalList'
import Navbar from '../Navbar/Navbar'
import PersonCard from '../PersonCard/PersonCard'
import styles from './Layout.scss'

const Layout = ({ children }) => {
  const appReady = useSelector(appReadySelector)
  useStyles(styles)
  return (
    <ErrorBoundary>
      {/* {!appReady && <LoadingLayout />} 全版 */}
      {appReady && (
        <>
          <div className={styles.bg} />
          <Navbar />
          <div className="container mt-[56px] pt-7 px-9">
            <div className="flex">
              <div className="w-60 shrink-0">
                <PersonCard />
              </div>
              <div className="w-full mx-[30px]"> {children}</div>
              <div className=" w-[280px] shrink-0 bg-white">聊天室</div>
            </div>
          </div>

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
