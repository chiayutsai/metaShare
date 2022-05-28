/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getSinglePost, updateLikes } from 'actions/api/webApi'
import { setUserLikesPosts } from 'actions/likesPost'
import { openLoading, closeLoading } from 'actions/loading'
import { setModal } from 'actions/modal'
import { SINGLE_POST_MODAL } from 'constants/modal'

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_SINGLE_POST = 'SET_SINGLE_POST'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setSinglePost = createAction(SET_SINGLE_POST)
export const handleShowPost = ({ postId }) => async dispatch => {
  try {
    dispatch(openLoading())
    const { data } = await dispatch(getSinglePost({ postId }))
    dispatch(setSinglePost(data))
    dispatch(
      setModal({
        name: SINGLE_POST_MODAL,
      }),
    )
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}

export const handleSinglePostLike = ({ postId, userId }) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState()
    const { likesPost, singlePost } = state
    const {
      data: { _id, likes },
    } = await dispatch(updateLikes({ postId }))
    let newLikesPost = []

    if (likes.includes(userId)) {
      newLikesPost = [...likesPost, singlePost]
    } else {
      newLikesPost = likesPost.filter(post => post._id !== _id)
    }
    dispatch(setUserLikesPosts(newLikesPost))
  } catch (error) {
    console.log(error)
    throw error
  }
}
