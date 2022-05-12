import { createAction } from 'redux-actions'

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_FORGET_PASSWORD_STEP = 'SET_FORGET_PASSWORD_STEP'
export const SET_FORGET_PASSWORD_EMAIL = 'SET_FORGET_PASSWORD_EMAIL'
export const SET_FORGET_PASSWORD_TOKEN = 'SET_FORGET_PASSWORD_TOKEN'

// ------------------------------------
// Action Creators
// ------------------------------------
export const setForgetPasswordStep = createAction(SET_FORGET_PASSWORD_STEP)
export const setForgetPasswordEmail = createAction(SET_FORGET_PASSWORD_EMAIL)
export const setForgetPasswordToken = createAction(SET_FORGET_PASSWORD_TOKEN)
