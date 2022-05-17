/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions'
import { getAllPostsAction, updateLikesAction } from 'actions/api/webApi'
import { SET_FILTER_TYPE, SET_SEARCH_WROD, SET_COMMENTS } from 'actions/post'
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
    [updateLikesAction.success]: (state, { payload: { data } }) => {
      const { _id } = data
      const { posts } = state
      const newPosts = posts.reduce((acc, cur) => {
        if (cur._id === _id) {
          return [
            ...acc,
            {
              ...cur,
              likes: data.likes,
            },
          ]
        }

        return [...acc, cur]
      }, [])
      const newList = {
        ...state,
        posts: newPosts,
      }
      return newList
    },
    [SET_COMMENTS]: (state, { payload }) => {
      const { _id } = payload
      const { posts } = state
      const newPosts = posts.reduce((acc, cur) => {
        if (cur._id === _id) {
          return [
            ...acc,
            {
              ...cur,
              comments: payload.comments,
            },
          ]
        }

        return [...acc, cur]
      }, [])
      const newList = {
        ...state,
        posts: newPosts,
      }
      return newList
    },
  },
  initialState,
)
