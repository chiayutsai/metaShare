/* eslint-disable no-underscore-dangle */
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readMessage } from 'actions/channel'
import Avator from 'components/Avator/Avator'
import Link from 'components/Link/Link'
import ScrollView from 'components/ScrollView'
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
  return (
    <div
      className={classNames(
        'fixed z-10 bottom-0 right-12  w-[320px]  h-[400px] shadow-channel rounded-tl-lg rounded-tr-lg bg-gray-200',
        {
          'h-[52px]': isSmall,
        },
      )}>
      <div
        className="absolute top-0 w-full h-[52px] flex items-center justify-between px-2 py-1.5 bg-white shadow-channel-header rounded-tl-lg rounded-tr-lg"
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
            className="hover:text-primary-800">
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
          className="flex items-center justify-center rounded-full w-6 h-6 bg-primary-50 p-1"
          onClick={onClose}>
          <span className="absolute w-4 h-0.5 bg-primary-900 block rotate-45" />
          <span className="absolute w-4 h-0.5 bg-primary-900 block rotate-[-45deg]" />
        </button>
      </div>
      <div
        className={classNames(
          'absolute top-[52px] w-full h-[288px] overflow-hidden',
          {
            'h-0 hidden': isSmall,
          },
        )}>
        <ScrollView
          setRef={setScrollViewRef}
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
                    className="flex items-end justify-end mb-2">
                    <div className="max-w-[227px] flex flex-col items-end">
                      <p className="rounded-[12px] break-all rounded-br-none p-2 mb-0.5 bg-primary-50 shadow-chat text-sm">
                        {message}
                      </p>
                      <p className="text-gray-800 text-xs">
                        {formatDate(createAt)}
                      </p>
                    </div>
                    <div className=" w-8 h-8 ml-1">
                      <Avator isRounded avatorUrl={userAvator} />
                    </div>
                  </div>
                )
              }
              return (
                <div key={`other${createAt}`} className="flex items-end mb-2">
                  <div className=" w-8 h-8 mr-1">
                    <Avator isRounded avatorUrl={avator} />
                  </div>
                  <div className="max-w-[227px]  flex flex-col items-start">
                    <p className="rounded-[12px] break-all rounded-bl-none p-2 mb-0.5 bg-white shadow-chat text-sm">
                      {message}
                    </p>
                    <p className="text-gray-800 text-xs">
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
          'absolute  bottom-0 w-full h-[60px] p-3 bg-white overflow-hidden',
          {
            'h-0 hidden': isSmall,
          },
        )}>
        <div
          className="flex w-full h-9 pl-3  pr-1 py-1 bg-gray-200 rounded-full"
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
