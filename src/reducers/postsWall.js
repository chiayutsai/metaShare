import { handleActions } from 'redux-actions'
import { getAllPostsAction } from 'actions/api/webApi'
import { SET_FILTER_TYPE } from 'actions/post'
import { LASTEST_POST } from 'constants/filterType'

const initialState = { isLoading: false, filterType: LASTEST_POST, posts: [] }

export default handleActions(
  {
    [SET_FILTER_TYPE]: (state, { payload }) => ({
      ...state,
      filterType: payload,
    }),
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
