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
import LoadingModal from 'components/LoadingModal/LoadingModal'
import LoginCircle from 'components/LoginCircle/LoginCircle'
import { appReadySelector } from 'selectors'
import { postsWallLoadingSelector } from 'selectors/post'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import ModalList from '../ModalList/ModalList'
import Navbar from '../Navbar/Navbar'
import PersonCard from '../PersonCard/PersonCard'
import styles from './Layout.scss'

const Layout = ({ view, children }) => {
  const appReady = useSelector(appReadySelector)
  const loading = useSelector(postsWallLoadingSelector)
  useStyles(styles)
  const isHome = view === 'home'
  const isLogin = view === 'login'
  return (
    <ErrorBoundary>
      {/* {!appReady && <LoadingLayout />} 全版 */}
      {appReady && (
        <>
          <div className={styles.bg} />
          {isHome && (
            <>
              <Navbar />
              <div className="container mt-[56px] pt-7 px-9">
                <div className="flex">
                  <div className="w-60 shrink-0">
                    <PersonCard />
                  </div>
                  <div className="w-full max-w-[788px] mx-[30px]">
                    {children}
                  </div>
                  <div className=" w-[280px] shrink-0 bg-white">聊天室</div>
                </div>
              </div>
            </>
          )}
          {isLogin && (
            <div>
              <div className="relative w-full h-screen grid grid-cols-12 py-9 px-12 items-center">
                <h1 className="absolute top-6 left-9 ">
                  <div className={styles.logo}>MetaShare</div>
                </h1>
                <div className="col-span-7 flex items-center justify-center">
                  <div className="scale-110">
                    <LoginCircle />
                  </div>
                </div>
                <div className="col-span-4 px-24 py-14 ml bg-white/70 shadow-login-card rounded-lg">
                  {children}
                </div>
              </div>
            </div>
          )}
          <ModalList />

          {loading && <LoadingModal />}
        </>
      )}
    </ErrorBoundary>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  view: PropTypes.string,
}

Layout.defaultProps = {
  view: '',
}
export default Layout
