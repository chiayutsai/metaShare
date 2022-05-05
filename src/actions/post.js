import { createAction } from 'redux-actions'
import { getAllPosts } from 'actions/api/webApi'
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
