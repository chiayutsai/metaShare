/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getAllPosts, getPostLikes } from 'actions/api/webApi'
import { openLoading, closeLoading } from 'actions/loading'
import { setModal } from 'actions/modal'
import { LIKES_LIST_MODAL } from 'constants/modal'
import { LAZY_LOAD_LIMIT } from 'constants/post'
import {
  noMorePostSelector,
  postsSelector,
  postsWallLoadingSelector,
  prevPostsLengthSelector,
} from 'selectors/post'

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_SEARCH_WROD = 'SET_SEARCH_WROD'
export const SET_COMMENTS = 'SET_COMMENTS'
export const CLEAR_POSTS = 'CLEAR_POSTS'
export const SET_NO_MORE_POST = 'SET_NO_MORE_POST'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setFilterType = createAction(SET_FILTER_TYPE)
export const setSearchWord = createAction(SET_SEARCH_WROD)
export const setComments = createAction(SET_COMMENTS)
export const clearPosts = createAction(CLEAR_POSTS)
export const setNoMorePost = createAction(SET_NO_MORE_POST)

export const handleGetAllPosts = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const posts = postsSelector(state)
    const prevPostsLength = prevPostsLengthSelector(state)
    const postsWallLoading = postsWallLoadingSelector(state)

    const skip = posts.length
    const noMorePost =
      (skip > 0 && skip < LAZY_LOAD_LIMIT) || skip === prevPostsLength
    if (postsWallLoading || noMorePost) {
      // 1. loading
      // 2. 貼文數小於第一次載入的, 不會有更多貼文
      // 3. 這次要求的貼文已經和上次拿到的一樣長了, 已經沒有更多貼文
      const storeNoMorePost = noMorePostSelector(state)
      if (!storeNoMorePost && noMorePost) {
        dispatch(setNoMorePost())
      }
      return null
    }

    if (skip === 0) {
      // first time need loading
      dispatch(openLoading())
    }

    const result = await dispatch(getAllPosts())

    dispatch(closeLoading())

    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const changeFilterType = (filterType, searchWord) => async dispatch => {
  try {
    dispatch(clearPosts())
    dispatch(setFilterType(filterType))
    dispatch(setSearchWord(searchWord))
    await dispatch(handleGetAllPosts())
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const openLikesModal = ({ postId }) => async dispatch => {
  try {
    dispatch(openLoading())
    const { data } = await dispatch(getPostLikes({ postId }))

    dispatch(
      setModal({
        name: LIKES_LIST_MODAL,
        likes: data,
      }),
    )
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}
