/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getAllPosts, updateLikes } from 'actions/api/webApi'

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_SEARCH_WROD = 'SET_SEARCH_WROD'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setFilterType = createAction(SET_FILTER_TYPE)
export const setSearchWord = createAction(SET_SEARCH_WROD)

export const changeFilterType = (filterType, searchWord) => async dispatch => {
  try {
    await dispatch(getAllPosts(filterType, searchWord))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(setFilterType(filterType))
  dispatch(setSearchWord(searchWord))
}

export const handleLikes = ({ postId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const { posts } = state.postsWall

    const { data } = await dispatch(updateLikes({ postId }))
    const [updatePost] = posts.filter(post => post._id === data._id)
    console.log(updatePost)
  } catch (error) {
    console.log(error)
    throw error
  }
}
