import { createAction } from 'redux-actions'

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_DARK_MODE = 'SET_DARK_MODE'

// ------------------------------------
// Action Creators
// ------------------------------------
export const setDarkMode = createAction(SET_DARK_MODE)
