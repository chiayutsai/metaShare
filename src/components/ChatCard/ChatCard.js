/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setChannel } from 'actions/channel'
import Avator from 'components/Avator/Avator'

const ChatCard = ({ _id, name, avator }) => {
  console.log(_id)
  const dispatch = useDispatch()
  const openChannel = useCallback(() => {
    dispatch(
      setChannel({
        _id,
        name,
        avator,
      }),
    )
  }, [dispatch, _id, name, avator])
  return (
    <button
      type="button"
      className="w-full flex items-center p-1 mb-2 rounded hover:bg-primary-50"
      onClick={openChannel}>
      <div className=" w-10 h-10 mr-2">
        <Avator avatorUrl={avator} isRounded />
      </div>
      <p>{name}</p>
    </button>
  )
}
ChatCard.propTypes = {
  _id: PropTypes.string,
  avator: PropTypes.string,
  name: PropTypes.string,
}
ChatCard.defaultProps = {
  _id: '',
  avator: '',
  name: '',
}
export default ChatCard
