/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getUserFollow, updateUserFollow } from 'actions/api/webApi'
import { openLoading, closeLoading } from 'actions/loading'
// ------------------------------------
// Action Types
// ------------------------------------

export const SET_FOLLOW = 'SET_FOLLOW'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setFollow = createAction(SET_FOLLOW)

export const handleGetUserFollow = ({ userId }) => async dispatch => {
  try {
    dispatch(openLoading())
    const {
      data: { following, follower },
    } = await dispatch(getUserFollow({ userId }))
    dispatch(setFollow({ following, follower }))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}

export const handleUpdateUserFollow = ({ userId }) => async dispatch => {
  try {
    dispatch(openLoading())
    const {
      data: { adminFollow },
    } = await dispatch(updateUserFollow({ userId }))
    dispatch(
      setFollow({
        following: adminFollow.following,
        follower: adminFollow.follower,
      }),
    )
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}
