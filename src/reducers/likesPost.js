/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions'
import { SET_USER_LIKES_POSTS } from 'actions/likesPost'

const initialState = []

export default handleActions(
  {
    [SET_USER_LIKES_POSTS]: (state, { payload }) => payload,
  },
  initialState,
)
