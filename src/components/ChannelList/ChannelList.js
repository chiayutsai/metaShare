import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dismissChannel } from 'actions/channel'
import Channel from 'components/Channel/Channel'
import channelSelector from 'selectors/channel'

const ChannelBox = props => {
  const dispatch = useDispatch()
  const onClose = useCallback(() => {
    dispatch(
      dismissChannel({
        id: props.id,
      }),
      // TODO: callback?
    )
  }, [dispatch, props.id])

  return Channel({ ...props, onClose })
}

ChannelBox.propTypes = {
  id: PropTypes.number.isRequired,
}

const ChannelList = () => {
  const channel = useSelector(channelSelector)

  return (
    <>
      {channel?.map(item => (
        <ChannelBox {...item} key={item.id} />
      ))}
    </>
  )
}

export default ChannelList
