import { getAllPosts, addPost } from 'actions/api/webApi'
import { dismissModal, setModal } from 'actions/modal'
import { setSearchWord } from 'actions/post'
import { toggleLoading, cleanAllImageUrl } from 'actions/uploadImage'
import { POST_MODAL } from 'constants/modal'
import { postModalSelector } from 'selectors/modal'
import { uploadImageSelector } from 'selectors/uploadImage'
import { userAvatorSelector } from 'selectors/user'

export const dismissPostModal = () => (dispatch, getState) => {
  const state = getState()

  const postModal = postModalSelector(state)

  if (postModal) {
    dispatch(dismissModal({ id: postModal.id }))
  }
}

export const setPostModal = ({ content = '' }) => (dispatch, getState) => {
  const state = getState()
  const avatorUrl = userAvatorSelector(state)
  dispatch(
    setModal({
      name: POST_MODAL,
      content,
      avatorUrl,
    }),
  )
}

export const handleAllPost = data => async (dispatch, getState) => {
  const state = getState()
  const imageArray = uploadImageSelector(state)
  const imageUrls = imageArray.map(img => img.imageUrl)
  const { content } = data
  const postData = {
    content,
    imageUrls,
  }
  try {
    dispatch(toggleLoading())
    await dispatch(addPost(postData))
    dispatch(cleanAllImageUrl())
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(toggleLoading())
  dispatch(dismissPostModal())
  try {
    dispatch(getAllPosts())
    dispatch(setSearchWord(''))
  } catch (error) {
    console.log(error)
    throw error
  }
}
