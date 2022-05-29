import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openMobileChat, closeMobileChat } from 'actions/chat'
import { openProfileEdit, setProfileEditInit } from 'actions/profile'
import Avator from 'components/Avator/Avator'
import LightModeToggle from 'components/LightModeToggle/LightModeToggle'
import Link from 'components/Link/Link'
import ScrollView from 'components/ScrollView'
import history from 'history.js'
import { isMobileChatSelector } from 'selectors'
import { profileEditSelector } from 'selectors/profile'
import { noReadMessageTotalCountSelector } from 'store/WebSocketService/selectors'
import BrowserStorage from 'utils/BrowserStorage'
import { ReactComponent as IconChatSvg } from './assets/chat.svg'
import { ReactComponent as IconChatFilledSvg } from './assets/chatFilled.svg'
import { ReactComponent as IconEditSvg } from './assets/edit.svg'
import { ReactComponent as IconFollowSvg } from './assets/follow.svg'
import { ReactComponent as IconFollowFilledSvg } from './assets/followFilled.svg'
import { ReactComponent as IconHomeSvg } from './assets/home.svg'
import { ReactComponent as IconHomeFilledSvg } from './assets/homeFilled.svg'
import { ReactComponent as IconLikeSvg } from './assets/like.svg'
import { ReactComponent as IconLikeFilledSvg } from './assets/likeFilled.svg'
import { ReactComponent as IconLogOutSvg } from './assets/logout.svg'
import styles from './MobileNav.scss'

const MobileNav = ({ userId, avatorUrl, name, lightMode, setLightMode }) => {
  useStyles(styles)
  const dispatch = useDispatch()
  const [page, setPage] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const isEditProfile = useSelector(profileEditSelector)
  const isMobileChat = useSelector(isMobileChatSelector)
  const noReadMessageTotal = useSelector(noReadMessageTotalCountSelector)

  const onLocationChange = () => {
    const url = window.location.pathname.split('/')[2] || 'home'
    setPage(url)
  }

  useEffect(() => {
    onLocationChange()
    const unListen = history.listen(onLocationChange)
    return () => {
      unListen()
    }
  }, [])
  const isHomeActive =
    (page === 'home' || page === 'profile') && !isMobileChat && !showMobileMenu
  const isLikeActive = page === 'likesPost' && !isMobileChat && !showMobileMenu
  const isFollowActive = page === 'follow' && !isMobileChat && !showMobileMenu
  const scrollViewRef = useRef()
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const handleOpenMobileMunu = useCallback(() => {
    if (!showMobileMenu) {
      setShowMobileMenu(true)
    }
    document.body.classList.add('Body--Modal-open-disable-scroll')
    dispatch(closeMobileChat())
  }, [dispatch, showMobileMenu])

  const handleOpenMobileChat = useCallback(() => {
    if (showMobileMenu) {
      setShowMobileMenu(false)
    }
    document.body.classList.add('Body--Modal-open-disable-scroll')
    dispatch(openMobileChat())
  }, [dispatch, showMobileMenu])

  const handleCloseMobileChatAndMenu = useCallback(() => {
    if (showMobileMenu) {
      setShowMobileMenu(false)
    }
    dispatch(closeMobileChat())
    document.body.classList.remove('Body--Modal-open-disable-scroll')
  }, [dispatch, showMobileMenu])
  const handleToPersonProfile = useCallback(() => {
    if (isEditProfile) {
      dispatch(setProfileEditInit())
    }
    setShowMobileMenu(false)
    document.body.classList.remove('Body--Modal-open-disable-scroll')
    history.push(`/metaShare/profile/${userId}`)
  }, [dispatch, isEditProfile, userId])

  const handleToEditProfile = useCallback(() => {
    if (!isEditProfile) {
      dispatch(openProfileEdit())
    }
    setShowMobileMenu(false)
    document.body.classList.remove('Body--Modal-open-disable-scroll')
    history.push(`/metaShare/profile/${userId}`)
  }, [dispatch, isEditProfile, userId])

  const handleLogOut = useCallback(() => {
    BrowserStorage.remove('token')
    window.location = '/metaShare/login'
  }, [])
  return (
    <>
      <div className="md:hidden fixed flex items-center justify-center bottom-0 left-0 z-20 w-full py-2 px-4  bg-white/90 backdrop-blur-md shadow-mobile-nav rounded-tl-[16px] rounded-tr-[16px]">
        <div className="w-[360px] flex items-center justify-between">
          <Link to="/metaShare" onClick={handleCloseMobileChatAndMenu}>
            {isHomeActive && (
              <div className="relative">
                <span className="absolute block w-14 -left-3 -bottom-3 h-[5px] rounded-tl-[6px] rounded-tr-[6px] bg-gradient-to-br from-[#C6BDED] to-[#7C60EF]" />
                <IconHomeFilledSvg />
              </div>
            )}
            {!isHomeActive && <IconHomeSvg />}
          </Link>
          <Link
            to="/metaShare/likesPost"
            onClick={handleCloseMobileChatAndMenu}>
            {isLikeActive && (
              <div className="relative">
                <span className="absolute block w-14 -left-3 -bottom-3 h-[5px] rounded-tl-[6px] rounded-tr-[6px] bg-gradient-to-br from-[#FAAB92] to-[#EB4F4F]" />
                <IconLikeFilledSvg />
              </div>
            )}

            {!isLikeActive && <IconLikeSvg />}
          </Link>
          <Link to="/metaShare/follow" onClick={handleCloseMobileChatAndMenu}>
            {isFollowActive && (
              <div className="relative">
                <span className="absolute block w-14 -left-3 -bottom-3 h-[5px] rounded-tl-[6px] rounded-tr-[6px] bg-gradient-to-br from-[#FFE68F] to-[#FF6B00]" />{' '}
                <IconFollowFilledSvg />
              </div>
            )}

            {!isFollowActive && <IconFollowSvg />}
          </Link>
          <button
            type="button"
            onClick={handleOpenMobileChat}
            className="relative">
            {!!noReadMessageTotal && (
              <p className="absolute z-10 -top-1.5 -right-1.5 flex items-center justify-center px-1 min-w-[16px] h-4 text-xs shrink-0 rounded-full bg-alert text-white">
                {noReadMessageTotal > 100 ? '100+' : noReadMessageTotal}
              </p>
            )}
            {isMobileChat && (
              <div className="relative">
                <span className="absolute block w-14 -left-3 -bottom-3 h-[5px] rounded-tl-[6px] rounded-tr-[6px] bg-gradient-to-br from-[#88C6FF] to-[#1A73E7]" />
                <IconChatFilledSvg />
              </div>
            )}

            {!isMobileChat && <IconChatSvg />}
          </button>
          <button type="button" onClick={handleOpenMobileMunu}>
            <div className="relative">
              {showMobileMenu && (
                <span className="absolute block w-14 -left-2 -bottom-2 h-[5px] rounded-tl-[6px] rounded-tr-[6px] bg-gradient-to-br from-primary-500 to-primary-900" />
              )}

              <div className="w-10 h-10 rounded-full border-2 border-primary-800">
                <Avator avatorUrl={avatorUrl} isRounded />
              </div>
            </div>
          </button>
        </div>
      </div>
      {showMobileMenu && (
        <div
          className={`${styles['bg-img']} fixed top-[60px] left-0 z-10 w-full h-mobile-chat pt-3 pb-16 px-3 sm:px-12`}>
          <div className="flex justify-end sm:hidden items-center mb-3">
            <p className="text-sm text-primary-800 ">淺 / 深色模式 :</p>
            <LightModeToggle
              lightMode={lightMode}
              setLightMode={setLightMode}
            />
          </div>
          <ScrollView
            setRef={setScrollViewRef}
            vertical
            verticalWidth={4}
            verticalHoverWidth={10}
            thumbSizeChangeOnHover>
            <div className="w-full bg-white shadow-card rounded p-2">
              <button
                type="button"
                onClick={handleToPersonProfile}
                className="flex items-center w-full py-2 border-b border-gary-600">
                <div className="w-10 h-10 mr-2 ">
                  <Avator avatorUrl={avatorUrl} isRounded />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-gray-900">查看個人貼文牆</p>
                </div>
              </button>
              <button
                type="button"
                onClick={handleToEditProfile}
                className="flex items-center w-full py-4 border-b border-gary-600">
                <IconEditSvg className="mr-2" />
                <p className="text-gray-1100 font-bold">編輯個人資料</p>
              </button>

              <button
                type="button"
                onClick={handleLogOut}
                className="flex items-center w-full pt-4 pb-2">
                <IconLogOutSvg className="mr-2" />
                <p className="text-gray-1100 font-bold">登出</p>
              </button>
            </div>
          </ScrollView>
        </div>
      )}
    </>
  )
}
MobileNav.propTypes = {
  userId: PropTypes.string,
  avatorUrl: PropTypes.string,
  name: PropTypes.string,
  lightMode: PropTypes.bool,
  setLightMode: PropTypes.func,
}

MobileNav.defaultProps = {
  userId: '',
  avatorUrl: '',
  name: '',
  lightMode: false,
  setLightMode: () => {},
}
export default MobileNav
