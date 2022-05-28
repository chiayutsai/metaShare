/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions'
import {
  getAllPostsAction,
  updatePostAction,
  deletePostAction,
} from 'actions/api/webApi'
import { SET_FILTER_TYPE, SET_SEARCH_WROD, clearPosts } from 'actions/post'
import { LASTEST_POST } from 'constants/filterType'
import {
  userLikesPostNotify,
  userCommentPostNotify,
} from 'store/WebSocketService/actions'

const initialState = {
  isLoading: false,
  filterType: LASTEST_POST,
  searchWord: '',
  posts: [],
  prevPostsLength: -1,
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
    [clearPosts]: state => ({
      ...state,
      posts: [],
      prevPostsLength: -1,
    }),
    [getAllPostsAction.request]: state => ({
      ...state,
      isLoading: true,
    }),
    [getAllPostsAction.success]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      prevPostsLength: state.posts.length,
      posts: [...state.posts, ...payload.data],
    }),
    [getAllPostsAction.failure]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      posts: payload.data,
    }),
    [deletePostAction.success]: (state, { payload: { data } }) => {
      const { _id } = data
      const { posts } = state
      const newPosts = posts.filter(item => item._id !== _id)
      const newList = {
        ...state,
        posts: newPosts,
      }
      return newList
    },
    [updatePostAction.success]: (state, { payload: { data } }) => {
      const { _id } = data
      const { posts } = state
      const newPosts = posts.reduce((acc, cur) => {
        if (cur._id === _id) {
          return [
            ...acc,
            {
              ...cur,
              content: data.content,
              imageUrls: data.imageUrls,
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
    [userLikesPostNotify]: (state, { payload }) => {
      const { _id, likes } = payload
      const { posts } = state
      const newPosts = posts.reduce((acc, cur) => {
        if (cur._id === _id) {
          return [
            ...acc,
            {
              ...cur,
              likes,
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
    [userCommentPostNotify]: (state, { payload }) => {
      const { post } = payload
      const { posts } = state
      const data = {
        content: payload.content,
        commenter: payload.commenter,
        createdAt: payload.createdAt,
      }
      const newPosts = posts.reduce((acc, cur) => {
        if (cur._id === post) {
          return [
            ...acc,
            {
              ...cur,
              comments: [...cur.comments, data],
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
