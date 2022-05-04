import { handleActions } from 'redux-actions'
import { getAllPostsAction } from 'actions/api/webApi'

const initialState = { isLoading: false, filterType: 'news', posts: [] }

export default handleActions(
  {
    [getAllPostsAction.request]: state => ({
      ...state,
      isLoading: true,
    }),
    [getAllPostsAction.success]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      posts: payload.data,
    }),
    [getAllPostsAction.failure]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      posts: payload.data,
    }),
  },
  initialState,
)
