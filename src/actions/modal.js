import { createAction } from 'redux-actions'

const getRandomModalId = () => parseInt(Math.random() * 10000, 10)

// ------------------------------------
// Constants
// ------------------------------------
export const SET_MODAL = '@SET_MODAL'
export const DISMISS_MODAL = '@DISMISS_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export const setModal = createAction(SET_MODAL, payload => ({
  ...payload,
  id: getRandomModalId(),
}))

export const dismissModal = createAction(DISMISS_MODAL)
