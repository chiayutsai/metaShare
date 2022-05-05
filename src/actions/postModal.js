import { getAllPosts, addPost } from 'actions/api/webApi'
import { dismissModal, setModal } from 'actions/modal'
import { cleanAllImageUrl } from 'actions/uploadImage'
import POST_MODAL from 'constants/modal'
import { postModalSelector } from 'selectors/modal'
import { uploadImageSelector } from 'selectors/uploadImage'

export const dismissPostModal = () => (dispatch, getState) => {
  const state = getState()

  const postModal = postModalSelector(state)

  if (postModal) {
    dispatch(dismissModal({ id: postModal.id }))
  }
}

export const setPostModal = ({ content = '' }) => dispatch => {
  // 取得 avator url
  // const state = getState()
  dispatch(
    setModal({
      name: POST_MODAL,
      content,
    }),
  )
}

export const handleAllPost = data => async (dispatch, getState) => {
  // 取得 avator url
  const state = getState()
  const imageArray = uploadImageSelector(state)
  const imageUrls = imageArray.map(img => img.imageUrl)
  const postData = {
    constent: data,
    imageUrls,
  }
  try {
    await dispatch(addPost(postData))
    dispatch(cleanAllImageUrl())
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(dismissPostModal())

  try {
    dispatch(getAllPosts())
  } catch (error) {
    console.log(error)
    throw error
  }
}
