import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_APP_READY = 'SET_APP_READY'
export const OPEN_LOADING = 'OPEN_LOADING'
export const CLOSE_LOADING = 'CLOSE_LOADING'
// ------------------------------------
// Actions
// ------------------------------------
export const setAppReady = createAction(SET_APP_READY)
export const openLoading = createAction(OPEN_LOADING)
export const closeLoading = createAction(CLOSE_LOADING)
