/* eslint-disable no-underscore-dangle */
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Avator from 'components/Avator/Avator'
import Link from 'components/Link/Link'
import ScrollView from 'components/ScrollView'
import { ReactComponent as IconSendSvg } from './assets/send.svg'

const Channel = ({ _id, avator, name, onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()
  const [chatContent, setChatContent] = useState('')
  const [isSmall, setSmall] = useState(false)
  const scrollViewRef = useRef()
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const handleSmallChannel = useCallback(() => {
    setSmall(!isSmall)
  }, [isSmall])

  return (
    <div
      className={classNames(
        'fixed bottom-0 right-12  w-[320px]  h-[400px] shadow-channel rounded-tl-lg rounded-tr-lg bg-gray-200',
        {
          'h-[52px]': isSmall,
        },
      )}>
      <div
        className="absolute top-0 w-full h-[52px] flex items-center justify-between px-2 py-1.5 bg-white shadow-channel-header rounded-tl-lg rounded-tr-lg"
        role="presentation"
        onClick={handleSmallChannel}>
        <div className="flex items-center">
          <div className=" w-10 h-10 mr-2.5">
            <Avator isRounded avatorUrl={avator} />
          </div>
          <Link
            to={`/metaShare/profile/${_id}`}
            className="hover:text-primary-800"
            onClick={e => {
              e.stopPropagation()
              setSmall(true)
            }}>
            {name}
          </Link>
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
          <div className="p-3">聊天內容</div>
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
          className="flex w-full h-9 p-1 bg-gray-200 rounded-full"
          role="presentation">
          <input
            className="w-full bg-transparent text-gray-1200 outline-none placeholder:text-gray-700 focus:outline-none"
            value={chatContent}
            onChange={e => {
              const { value } = e.target
              setChatContent(value)
            }}
          />
          <button
            type="button"
            className=" shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow-3d bg-primary-700 bg-gradient-to-center from-transparent to-button3dGradient hover:bg-primary-600 hover:bg-gradient-to-center-hover hover:to-button3dGradientHover">
            <IconSendSvg className="relative t-[1px]" />
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
