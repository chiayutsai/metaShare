/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// external-global styles must be imported in your JS.
import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleGetUserFollow } from 'actions/follow'
import ChannelList from 'components/ChannelList/ChannelList'
import Chat from 'components/Chat/Chat'
import LoadingModal from 'components/LoadingModal/LoadingModal'
import LoginCircle from 'components/LoginCircle/LoginCircle'
import {
  appReadySelector,
  loadingSelector,
  isMobileChatSelector,
} from 'selectors'
import {
  userAvatorSelector,
  userNameSelector,
  userIdSelector,
} from 'selectors/user'
import BrowserStorage from 'utils/BrowserStorage'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import MobileNav from '../MobileNav/MobileNav'
import ModalList from '../ModalList/ModalList'
import Navbar from '../Navbar/Navbar'
import PersonCard from '../PersonCard/PersonCard'
import styles from './Layout.scss'

const Layout = ({ view, children }) => {
  const dispatch = useDispatch()
  const appReady = useSelector(appReadySelector)
  const loading = useSelector(loadingSelector)
  useStyles(styles)
  const userId = useSelector(userIdSelector)
  const userAvator = useSelector(userAvatorSelector)
  const userName = useSelector(userNameSelector)
  const isMobileChat = useSelector(isMobileChatSelector)
  const isHome = view === 'home'
  const isLogin = view === 'login'
  const isProfile = view === 'profile'
  const isNotFound = view === 'notFound'
  const isLoading = loading
  const isFirstTimeUse = !BrowserStorage.get('token')
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
              <div className="container max-w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mt-[60px] md:mt-[56px] mb-16 pt-7 px-4 2xl:px-9 ">
                <div className="flex items-start">
                  <div className="hidden xl:block sticky top-[84px] w-60 shrink-0">
                    <div className="mb-3">
                      <PersonCard
                        userId={userId}
                        avatorUrl={userAvator}
                        name={userName}
                      />
                    </div>
                    <ButtonGroup userId={userId} />
                  </div>
                  <div className="w-full min-w-0 md:mr-6 xl:mx-[30px]">
                    {children}
                  </div>
                  <div className="hidden md:block sticky top-[84px] w-60  lg:w-[280px] shrink-0 ">
                    <div className="mb-3">
                      <Chat />
                    </div>
                    <div className="block xl:hidden">
                      <ButtonGroup userId={userId} />
                    </div>
                  </div>
                </div>
              </div>

              <MobileNav
                userId={userId}
                avatorUrl={userAvator}
                name={userName}
              />
            </>
          )}
          {isLogin && (
            <div>
              <h1 className="relative flex justify-center mt-6 top-0 left-0 sm:mt-0 sm:absolute z-20 sm:top-6 sm:left-9 ">
                <div className={styles.logo}>MetaShare</div>
              </h1>
              <div className="relative w-full min-h-mobile sm:min-h-screen flex flex-col justify-center xl:grid grid-cols-12 p-6 sm:py-9 sm:px-12 items-center">
                <div
                  className={classNames(
                    '!flex sm:static sm:w-full sm:h-auto sm:!bg-none xl:col-span-6 3xl:col-span-7 items-center justify-center sm:!animate-none pointer-events-none',
                    {
                      'absolute z-10 w-screen h-screen': isFirstTimeUse,
                      hidden: !isFirstTimeUse,
                      [styles['bg-img']]: isFirstTimeUse,
                      [styles['fade-out']]: isFirstTimeUse,
                    },
                  )}>
                  <div
                    className={classNames(
                      'sm:!animate-none scale-75 xl:scale-95 2xl:scale-100',
                      {
                        [styles['fade-in']]: isFirstTimeUse,
                      },
                    )}>
                    <LoginCircle />
                  </div>
                </div>
                <div
                  className={classNames(
                    'relative sm:!animate-none w-full md:w-4/5 lg:w-8/12 xl:w-auto xl:col-span-6 2xl:col-span-5 3xl:col-span-4 p-6 xs:px-12 xs:py-6 xl:px-16 xl:py-14 ml bg-white shadow-login-card rounded-lg overflow-hidden',
                    { [styles.show]: isFirstTimeUse },
                  )}>
                  {children}
                </div>
              </div>
            </div>
          )}
          {isProfile && (
            <>
              <Navbar userId={userId} avatorUrl={userAvator} name={userName} />
              {children}

              <MobileNav
                userId={userId}
                avatorUrl={userAvator}
                name={userName}
              />
            </>
          )}
          {isNotFound && <>{children}</>}

          <ModalList />
          {!isLogin && (
            <>
              {isMobileChat && (
                <div
                  className={`${styles['bg-img']} fixed w-full h-mobile-chat top-14  z-10 left-0`}>
                  <Chat />
                </div>
              )}

              <ChannelList />
            </>
          )}

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
