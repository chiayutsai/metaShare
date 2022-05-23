import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dismissModal } from 'actions/modal'
import DeletePostModal from 'components/DeletePostModal/DeletePostModal'
import FollowListModal from 'components/FollowListModal/FollowListModal'
import LikesListModal from 'components/LikesListModal/LikesListModal'
import SinglePostModal from 'components/Post/SinglePostModal'
import CancelPostModal from 'components/PostModal/CancelPostModal/CancelPostModal'
import PostModal from 'components/PostModal/PostModal'
import ProfileFollowListModal from 'components/ProfileFollowListModal/ProfileFollowListModal'
import UnFollowModal from 'components/UnFollowModal/UnFollowModal'
import {
  POST_MODAL,
  SINGLE_POST_MODAL,
  FOLLOW_LIST_MODAL,
  PROFILE_FOLLOW_LIST_MODAL,
  UNFOLLOW_MODAL,
  LIKES_LIST_MODAL,
  CANCEL_POST_MODAL,
  DELETE_POST_MODAL,
} from 'constants/modal'

const ModalMapper = ({ name, ...props }) => {
  switch (name) {
    case POST_MODAL:
      return <PostModal {...props} />
    case SINGLE_POST_MODAL:
      return <SinglePostModal {...props} />
    case FOLLOW_LIST_MODAL:
      return <FollowListModal {...props} />
    case CANCEL_POST_MODAL:
      return <CancelPostModal {...props} />
    case DELETE_POST_MODAL:
      return <DeletePostModal {...props} />
    case UNFOLLOW_MODAL:
      return <UnFollowModal {...props} />
    case LIKES_LIST_MODAL:
      return <LikesListModal {...props} />
    case PROFILE_FOLLOW_LIST_MODAL:
      return <ProfileFollowListModal {...props} />
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
