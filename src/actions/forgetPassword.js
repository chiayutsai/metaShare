import { createAction } from 'redux-actions'

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_FORGET_PASSWORD_STEP = 'SET_FORGET_PASSWORD_STEP'

// ------------------------------------
// Action Creators
// ------------------------------------
export const setForgetPasswordStep = createAction(SET_FORGET_PASSWORD_STEP)
