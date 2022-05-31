/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChannel } from 'actions/channel'
import Avator from 'components/Avator/Avator'
import { userIdSelector } from 'selectors/user'
import { getChannelHistory } from 'store/WebSocketService/actions'
import { getChannelHistorySelector } from 'store/WebSocketService/selectors'

const ChatCard = ({ _id, name, avator, isOnline, noRead }) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const isGetChannelHistory = useSelector(state =>
    getChannelHistorySelector(state, _id),
  )
  const openChannel = useCallback(() => {
    if (!isGetChannelHistory) {
      dispatch(getChannelHistory({ to: _id, userId }))
    }
    dispatch(
      setChannel({
        _id,
        name,
        avator,
      }),
    )
  }, [dispatch, _id, name, avator, userId, isGetChannelHistory])
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between p-1 mb-2 rounded hover:bg-white md:hover:bg-primary-50 dark:hover:bg-dark-primary-500/50"
      onClick={openChannel}>
      <div className="flex items-center">
        <div className="relative w-10 h-10 mr-2">
          <Avator avatorUrl={avator} isRounded />
          {isOnline && (
            <div className="absolute w-3 h-3 rounded-full -right-1 bottom-0 border-2 border-white bg-[#0dcb24]" />
          )}
        </div>
        <p>{name}</p>
      </div>
      {!!noRead && (
        <p className="flex items-center justify-center px-1 min-w-[16px] h-4 text-xs shrink-0 rounded bg-alert text-white">
          {noRead > 100 ? '100+' : noRead}
        </p>
      )}
    </button>
  )
}
ChatCard.propTypes = {
  _id: PropTypes.string,
  avator: PropTypes.string,
  name: PropTypes.string,
  isOnline: PropTypes.bool,
  noRead: PropTypes.number,
}
ChatCard.defaultProps = {
  _id: '',
  avator: '',
  name: '',
  isOnline: false,
  noRead: 0,
}
export default ChatCard
