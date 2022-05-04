import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dismissModal } from 'actions/modal'
import PostModal from 'components/PostModal/PostModal'
import POST_MODAL from 'constants/modal'

const ModalMapper = ({ name, ...props }) => {
  switch (name) {
    case POST_MODAL:
      return <PostModal {...props} />
    // case HOTLINE:
    //   return <HotlineModalContainer {...props} />
    // case SETTING:
    //   return <SettingMenuContainer {...props} />
    default:
      return null
  }
}
ModalMapper.propTypes = {
  name: PropTypes.string.isRequired,
}

const Modal = props => {
  const dispatch = useDispatch()
  const onClose = useCallback(() => {
    dispatch(
      dismissModal({
        id: props.id,
      }),
      // TODO: callback?
    )
  }, [dispatch, props.id])

  return ModalMapper({ ...props, onClose })
}

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

const ModalList = () => (
  <>
    {useSelector(({ modals }) => modals || []).map(modal => (
      <Modal {...modal} key={modal.id} />
    ))}
  </>
)

export default ModalList
