/* eslint-disable no-underscore-dangle */
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readMessage } from 'actions/channel'
import { closeMobileChat } from 'actions/chat'
import Avator from 'components/Avator/Avator'
import Link from 'components/Link/Link'
import ScrollView from 'components/ScrollView'
import { isMobileChatSelector } from 'selectors'
import { userAvatorSelector, userIdSelector } from 'selectors/user'
import { sendChatMessage } from 'store/WebSocketService/actions'
import {
  channelMessageSelector,
  onlineSelector,
  noReadMessageCountSelector,
} from 'store/WebSocketService/selectors'
import formatDate from 'utils/formatDate'
import { ReactComponent as IconSendSvg } from './assets/send.svg'

const Channel = ({ _id, avator, name, onClose }) => {
  const dispatch = useDispatch()
  const userAvator = useSelector(userAvatorSelector)
  const userId = useSelector(userIdSelector)
  const channelMessage = useSelector(state =>
    channelMessageSelector(state, _id),
  )
  const isMobileChat = useSelector(isMobileChatSelector)

  const noReadMessageCount = useSelector(state =>
    noReadMessageCountSelector(state, _id),
  )
  const online = useSelector(onlineSelector)
  const [chatContent, setChatContent] = useState('')
  const [isSmall, setSmall] = useState(false)
  const [isFocus, setFocus] = useState(false)
  const isOnline = online?.includes(_id)
  const scrollViewRef = useRef()
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const scrollToEnd = useCallback(() => {
    const list = scrollViewRef.current?.view

    if (list) {
      list.scrollTo(0, list.scrollHeight)
    }
  }, [])
  const handleSmallChannel = useCallback(() => {
    setSmall(!isSmall)
  }, [isSmall])

  const handleSendMessage = useCallback(async () => {
    if (!chatContent) {
      return
    }
    try {
      await dispatch(
        sendChatMessage({
          from: userId,
          to: _id,
          message: chatContent,
        }),
      )
      setChatContent('')
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, userId, _id, chatContent])

  useEffect(() => {
    const handleKeydown = event => {
      if (event.key === 'Enter' && isFocus) {
        handleSendMessage()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [handleSendMessage, isFocus])

  useEffect(() => {
    setTimeout(() => {
      scrollToEnd()
    }, 300)
  }, [channelMessage, scrollToEnd])

  useEffect(() => {
    if (noReadMessageCount !== 0 && !isSmall) {
      dispatch(readMessage({ channelId: _id }))
    }
  }, [dispatch, noReadMessageCount, isSmall, _id])

  const handleDesktopChatClose = useCallback(e => {
    e.stopPropagation()
  }, [])

  const handleMobileChatClose = useCallback(() => {
    onClose()
    dispatch(closeMobileChat())
    document.body.classList.remove('Body--Modal-open-disable-scroll')
  }, [onClose, dispatch])
  return (
    <div
      className={classNames(
        'fixed z-30 flex flex-col w-full h-full bottom-0 right-0 md:right-12  md:w-[320px]  md:h-[400px] md:shadow-channel md:rounded-tl-lg md:rounded-tr-lg bg-gray-200 dark:bg-dark-bg',
        {
          'md:h-[52px]': isSmall,
        },
      )}>
      <div
        className="md:absolute shrink-0 top-0 w-full md:h-[52px] flex flex-row-reverse justify-end items-center md:flex-row md:justify-between p-3 md:px-2 md:py-1.5 bg-white dark:bg-dark-primary-500/30 shadow-channel-header md:rounded-tl-lg md:rounded-tr-lg pointer-events-none md:pointer-events-auto"
        role="presentation"
        onClick={handleSmallChannel}>
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-2.5">
            <Avator isRounded avatorUrl={avator} />
            {isOnline && (
              <div className="absolute w-3 h-3 rounded-full -right-1 bottom-0 border-2 border-white bg-[#0dcb24]" />
            )}
          </div>
          <Link
            to={`/metaShare/profile/${_id}`}
            className="hover:text-primary-800 dark:hover:text-primary-400 pointer-events-auto"
            onClick={
              isMobileChat ? handleMobileChatClose : handleDesktopChatClose
            }>
            {name}
          </Link>
          {!!noReadMessageCount && (
            <p className="flex items-center justify-center ml-2 px-1 min-w-[16px] h-4 text-xs  rounded bg-alert text-white">
              {noReadMessageCount > 100 ? '100+' : noReadMessageCount}
            </p>
          )}
        </div>
        <button
          type="button"
          className="relative flex items-center justify-center rounded-full w-6 h-6 md:bg-primary-50 dark:md:bg-dark-primary-500 p-1 pointer-events-auto mr-3 md:mr-0"
          onClick={onClose}>
          <span className="absolute w-4 h-0.5 top-4 md:top-auto bg-primary-900 dark:bg-primary-200 block rotate-45" />
          <span className="absolute w-4 h-0.5 top-1.5 md:top-auto bg-primary-900 dark:bg-primary-200 block rotate-[-45deg]" />
        </button>
      </div>
      <div
        className={classNames(
          'md:absolute  md:top-[52px] w-full h-full md:h-[288px] overflow-hidden',
          {
            'h-0 hidden': isSmall,
          },
        )}>
        <ScrollView
          setRef={setScrollViewRef}
          scrollSmooth
          vertical
          verticalWidth={4}
          initialScrollVToEnd
          verticalHoverWidth={10}
          thumbSizeChangeOnHover>
          <div className="p-3">
            {channelMessage?.map(item => {
              const { createAt, from, message } = item
              if (from === userId) {
                return (
                  <div
                    key={`self${createAt}`}
                    className="flex items-end justify-end mb-2 ml-12 md:ml-0">
                    <div className=" md:max-w-[227px] flex flex-col items-end">
                      <p className="rounded-[12px] break-all rounded-br-none p-2 mb-0.5 bg-primary-50 dark:bg-dark-primary-500/50 shadow-chat text-sm">
                        {message}
                      </p>
                      <p className="text-gray-800 text-xs dark:text-white/40">
                        {formatDate(createAt)}
                      </p>
                    </div>
                    <div className=" w-8 h-8 ml-1 shrink-0">
                      <Avator isRounded avatorUrl={userAvator} />
                    </div>
                  </div>
                )
              }
              return (
                <div
                  key={`other${createAt}`}
                  className="flex items-end mb-2 mr-12 md:mr-0">
                  <div className=" w-8 h-8 mr-1 shrink-0">
                    <Avator isRounded avatorUrl={avator} />
                  </div>
                  <div className="md:max-w-[227px]  flex flex-col items-start">
                    <p className="rounded-[12px] break-all rounded-bl-none p-2 mb-0.5 bg-white dark:bg-dark-primary-500/80 shadow-chat text-sm">
                      {message}
                    </p>
                    <p className="text-gray-800 text-xs dark:text-white/40">
                      {formatDate(createAt)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollView>
      </div>
      <div
        className={classNames(
          'md:absolute shrink-0 bottom-0 w-full h-[60px] p-3 bg-white dark:bg-[#36314b]  overflow-hidden',
          {
            'h-0 hidden': isSmall,
          },
        )}>
        <div
          className="flex w-full h-9 pl-3  pr-1 py-1 bg-gray-200 dark:bg-dark-bg rounded-full"
          role="presentation">
          <input
            className="w-full bg-transparent text-gray-1200 outline-none placeholder:text-gray-700 focus:outline-none"
            value={chatContent}
            onFocus={() => {
              setFocus(true)
            }}
            onBlur={() => {
              setFocus(false)
            }}
            onChange={e => {
              const { value } = e.target
              setChatContent(value)
            }}
          />
          <button
            type="button"
            className=" shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow-3d bg-primary-700 bg-gradient-to-center from-transparent to-button3dGradient hover:bg-primary-600 hover:bg-gradient-to-center-hover hover:to-button3dGradientHover"
            onClick={handleSendMessage}>
            <IconSendSvg className="relative top-[1px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

Channel.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  avator: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
Channel.defaultProps = {
  _id: '',
  name: '',
  avator: '',
}
export default Channel
