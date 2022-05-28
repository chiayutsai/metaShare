/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getSinglePost, updateLikes, updateComments } from 'actions/api/webApi'
import { setUserLikesPosts } from 'actions/likesPost'
import { openLoading, closeLoading } from 'actions/loading'
import { setModal } from 'actions/modal'
import { SINGLE_POST_MODAL } from 'constants/modal'

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_SINGLE_POST = 'SET_SINGLE_POST'
export const SET_SINGLE_POST_COMMENTS = 'SET_SINGLE_POST_COMMENTS'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setSinglePost = createAction(SET_SINGLE_POST)
export const setSinglePostComments = createAction(SET_SINGLE_POST_COMMENTS)
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
    dispatch(setSinglePost({ likes }))
    let newLikesPost = []

    if (likes.includes(userId)) {
      newLikesPost = [...likesPost, singlePost]
    } else {
      newLikesPost = likesPost.filter(post => post._id !== _id)
    }
    console.log(newLikesPost)
    dispatch(setUserLikesPosts(newLikesPost))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const handleSinglePostComment = ({
  postId,
  content,
}) => async dispatch => {
  try {
    const { data } = await dispatch(updateComments({ postId, content }))
    dispatch(setSinglePostComments(data))
  } catch (error) {
    console.log(error)
    throw error
  }
}
