import { createAction } from 'redux-actions'
import { getAllPosts } from 'actions/api/webApi'
import { FILTER_TYPE_MAP } from 'constants/filterType'
// ------------------------------------
// Action Types
// ------------------------------------
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'

// ------------------------------------
// Action Creators
// ------------------------------------
export const setFilterType = createAction(SET_FILTER_TYPE)

export const changeFilterType = filterType => async dispatch => {
  try {
    await dispatch(getAllPosts(`?sort=${FILTER_TYPE_MAP[filterType]}`))
  } catch (error) {
    console.log(error)
  }
  dispatch(setFilterType(filterType))
}
