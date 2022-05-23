/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getUserLikesPosts, updateLikes } from 'actions/api/webApi'
import { openLoading, closeLoading } from 'actions/loading'

// ------------------------------------
// Action Types
// ------------------------------------

export const SET_USER_LIKES_POSTS = 'SET_USER_LIKES_POSTS'
export const DELETE_LIKES_POSTS = 'DELETE_LIKES_POSTS'
export const UPDATE_LIKES_POSTS = 'UPDATE_LIKES_POSTS'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setUserLikesPosts = createAction(SET_USER_LIKES_POSTS)
export const deleteLikesPosts = createAction(DELETE_LIKES_POSTS)
export const updateLikesPosts = createAction(UPDATE_LIKES_POSTS)
export const handleGetUserLikesPosts = () => async dispatch => {
  try {
    dispatch(openLoading())
    const { data } = await dispatch(getUserLikesPosts())
    dispatch(setUserLikesPosts(data))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}

export const handleRemoveLikes = ({ postId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const { likesPost } = state
    dispatch(openLoading())
    const { data } = await dispatch(updateLikes({ postId }))
    const newLikesPost = likesPost.filter(post => post._id !== data._id)
    dispatch(setUserLikesPosts(newLikesPost))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}
