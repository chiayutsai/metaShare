import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_APP_READY = 'SET_APP_READY'

// ------------------------------------
// Actions
// ------------------------------------
export const setAppReady = createAction(SET_APP_READY)
