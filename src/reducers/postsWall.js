import { handleActions } from 'redux-actions'
import { getAllPostsAction } from 'actions/api/webApi'

const initialState = { isLoading: false, filterType: 'news', posts: [] }

export default handleActions(
  {
    [getAllPostsAction.success]: (state, { payload }) => ({
      ...state,
      posts: [payload.data],
    }),
  },
  initialState,
)
