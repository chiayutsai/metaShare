/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions'
import { SET_SINGLE_POST } from 'actions/singlePost'
import {
  userLikesPostNotify,
  userCommentPostNotify,
} from 'store/WebSocketService/actions'

const initialState = {}

export default handleActions(
  {
    [SET_SINGLE_POST]: (state, { payload }) => ({ ...state, ...payload }),
    [userLikesPostNotify]: (state, { payload }) => {
      const { _id, likes } = payload
      if (_id === state._id) {
        const newSinglePost = {
          ...state,
          likes,
        }
        return newSinglePost
      }
      return state
    },
    [userCommentPostNotify]: (state, { payload }) => {
      const { post, content, commenter, createdAt } = payload
      const data = {
        content,
        commenter,
        createdAt,
      }
      if (post === state._id) {
        const newSinglePost = {
          ...state,
          comments: [...state.comments, data],
        }
        return newSinglePost
      }
      return state
    },
  },
  initialState,
)
