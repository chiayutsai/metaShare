import { handleActions } from 'redux-actions'
import { SET_SINGLE_POST, SET_SINGLE_POST_COMMENTS } from 'actions/singlePost'

const initialState = {}

export default handleActions(
  {
    [SET_SINGLE_POST]: (state, { payload }) => ({ ...state, ...payload }),
    [SET_SINGLE_POST_COMMENTS]: (state, { payload }) => {
      const { content, commenter, createdAt } = payload
      const data = {
        content,
        commenter,
        createdAt,
      }
      const newSinglePost = {
        ...state,
        comments: [...state.comments, data],
      }
      return newSinglePost
    },
  },
  initialState,
)
