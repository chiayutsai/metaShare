import { createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_APP_READY = 'SET_APP_READY'

export const SET_LOADING_PROGRESS = '@SET_LOADING_PROGRESS'
export const SET_LOADING_DONE = '@SET_LOADING_DONE'

// ------------------------------------
// Actions
// ------------------------------------
export const setAppReady = createAction(SET_APP_READY)

export const setLoadingProgress = createAction(SET_LOADING_PROGRESS)
export const setLoadingDone = createAction(SET_LOADING_DONE)
