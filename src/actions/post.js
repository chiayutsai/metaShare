/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getAllPosts, getPostLikes, updateComments } from 'actions/api/webApi'
import { openLoading, closeLoading } from 'actions/loading'
import { setModal } from 'actions/modal'
import { LIKES_LIST_MODAL } from 'constants/modal'
// ------------------------------------
// Action Types
// ------------------------------------
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_SEARCH_WROD = 'SET_SEARCH_WROD'
export const SET_COMMENTS = 'SET_COMMENTS'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setFilterType = createAction(SET_FILTER_TYPE)
export const setSearchWord = createAction(SET_SEARCH_WROD)
export const setComments = createAction(SET_COMMENTS)

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

export const handleComments = ({ postId, content }) => async dispatch => {
  try {
    const { data } = await dispatch(updateComments({ postId, content }))
    dispatch(setComments(data))
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
