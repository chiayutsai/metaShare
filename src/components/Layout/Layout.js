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
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleGetUserFollow } from 'actions/follow'
import ChannelList from 'components/ChannelList/ChannelList'
import Chat from 'components/Chat/Chat'
import LoadingModal from 'components/LoadingModal/LoadingModal'
import LoginCircle from 'components/LoginCircle/LoginCircle'
import { appReadySelector, loadingSelector } from 'selectors'
import { postsWallLoadingSelector } from 'selectors/post'
import {
  userAvatorSelector,
  userNameSelector,
  userIdSelector,
} from 'selectors/user'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import ModalList from '../ModalList/ModalList'
import Navbar from '../Navbar/Navbar'
import PersonCard from '../PersonCard/PersonCard'
import styles from './Layout.scss'

const Layout = ({ view, children }) => {
  const dispatch = useDispatch()
  const appReady = useSelector(appReadySelector)
  const postsWallLoading = useSelector(postsWallLoadingSelector)
  const loading = useSelector(loadingSelector)
  useStyles(styles)
  const userId = useSelector(userIdSelector)
  const userAvator = useSelector(userAvatorSelector)
  const userName = useSelector(userNameSelector)
  const isHome = view === 'home'
  const isLogin = view === 'login'
  const isProfile = view === 'profile'
  const isNotFound = view === 'notFound'
  const isLoading = loading || postsWallLoading
  useEffect(() => {
    ;(async () => {
      if (isHome || isProfile) {
        try {
          await dispatch(handleGetUserFollow({ userId }))
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [dispatch, isHome, isProfile, userId])
  return (
    <ErrorBoundary>
      {/* {!appReady && <LoadingLayout />} 全版 */}
      {appReady && (
        <>
          <div className={styles.bg} />
          {isHome && (
            <>
              <Navbar userId={userId} avatorUrl={userAvator} name={userName} />
              <div className="container mt-[56px] mb-16 pt-7 px-9">
                <div className="flex items-start">
                  <div className=" sticky top-[84px] w-60 shrink-0">
                    <div className="mb-3">
                      <PersonCard
                        userId={userId}
                        avatorUrl={userAvator}
                        name={userName}
                      />
                    </div>
                    <ButtonGroup userId={userId} />
                  </div>
                  <div className="w-full min-w-0 mx-[30px]">{children}</div>
                  <div className="sticky top-[84px] w-[280px] shrink-0 ">
                    <Chat />
                  </div>
                </div>
              </div>
              <ChannelList />
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
                <div className="relative col-span-4 px-24 py-14 ml bg-white shadow-login-card rounded-lg overflow-hidden">
                  {children}
                </div>
              </div>
            </div>
          )}
          {isProfile && (
            <>
              <Navbar userId={userId} avatorUrl={userAvator} name={userName} />
              {children}
            </>
          )}
          {isNotFound && <>{children}</>}

          <ModalList />

          {isLoading && <LoadingModal />}
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
