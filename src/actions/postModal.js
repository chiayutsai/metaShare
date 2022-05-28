import { addPost, updatePost } from 'actions/api/webApi'
import { updateLikesPosts } from 'actions/likesPost'
import { dismissModal, setModal } from 'actions/modal'
import {
  setSearchWord,
  setFilterType,
  clearPosts,
  handleGetAllPosts,
} from 'actions/post'
import { setSinglePost } from 'actions/singlePost'
import {
  toggleLoading,
  cleanAllImageUrl,
  addImageUrl,
} from 'actions/uploadImage'
import { LASTEST_POST } from 'constants/filterType'
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

export const setUpdatePostModal = ({ _id, content, imageUrls }) => (
  dispatch,
  getState,
) => {
  const state = getState()
  const avatorUrl = userAvatorSelector(state)
  imageUrls.forEach(item => {
    dispatch(addImageUrl({ imageUrl: item }))
  })
  dispatch(
    setModal({
      name: POST_MODAL,
      postId: _id,
      content,
      avatorUrl,
      type: 'update',
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
    dispatch(setSearchWord(''))
    dispatch(setFilterType(LASTEST_POST))
    dispatch(clearPosts())
    dispatch(handleGetAllPosts())
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const handleUpdatePost = ({ postId, content }) => async (
  dispatch,
  getState,
) => {
  const state = getState()
  const imageArray = uploadImageSelector(state)
  const imageUrls = imageArray.map(img => img.imageUrl)

  try {
    dispatch(toggleLoading())
    const { data } = await dispatch(updatePost({ postId, content, imageUrls }))
    dispatch(cleanAllImageUrl())
    dispatch(
      setSinglePost({ content: data.content, imageUrls: data.imageUrls }),
    )
    dispatch(updateLikesPosts(data))
    console.log(data)
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(toggleLoading())
  dispatch(dismissPostModal())
}
