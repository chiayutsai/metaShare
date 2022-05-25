import { createAction } from 'redux-actions'

const getRandomModalId = () => parseInt(Math.random() * 10000, 10)

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CHANNEL = 'SET_CHANNEL'
export const DISMISS_CHANNEL = 'DISMISS_CHANNEL'
export const READ_MESSAGE = 'READ_MESSAGE'
// ------------------------------------
// Actions
// ------------------------------------
export const setChannel = createAction(SET_CHANNEL, payload => ({
  ...payload,
  id: getRandomModalId(),
}))

export const dismissChannel = createAction(DISMISS_CHANNEL)

export const readMessage = createAction(READ_MESSAGE)
