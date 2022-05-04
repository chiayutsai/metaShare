import { dismissModal, setModal } from 'actions/modal'
import POST_MODAL from 'constants/modal'
import { postModalSelector } from 'selectors/modal'

export const dismissPostModal = () => (dispatch, getState) => {
  const state = getState()

  const postModal = postModalSelector(state)

  if (postModal) {
    dispatch(dismissModal({ id: postModal.id }))
  }
}

export const setPostModal = ({ content = '', imageUrls = [] }) => dispatch => {
  // 取得 avator url
  // const state = getState()
  dispatch(
    setModal({
      name: POST_MODAL,
      content,
      imageUrls,
    }),
  )
}
