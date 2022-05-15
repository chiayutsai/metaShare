import { handleActions } from 'redux-actions'
import { getAllPostsAction } from 'actions/api/webApi'
import { SET_FILTER_TYPE, SET_SEARCH_WROD } from 'actions/post'
import { LASTEST_POST } from 'constants/filterType'

const initialState = {
  isLoading: false,
  filterType: LASTEST_POST,
  searchWord: '',
  posts: [],
}

export default handleActions(
  {
    [SET_FILTER_TYPE]: (state, { payload }) => ({
      ...state,
      filterType: payload,
    }),
    [SET_SEARCH_WROD]: (state, { payload }) => ({
      ...state,
      searchWord: payload,
    }),
    [getAllPostsAction.request]: state => ({
      filterType: state.filterType,
      searchWord: state.searchWord,
      isLoading: true,
      posts: [],
    }),
    [getAllPostsAction.success]: (state, { payload }) => ({
      filterType: state.filterType,
      searchWord: state.searchWord,
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
