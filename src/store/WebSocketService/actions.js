import { createAction as createActionOrigin } from 'redux-actions'
import createApiActions from 'utils/createApiActions'

export const PREFIX = ''

export const actionsMap = {}

const createAction = type => createActionOrigin(`${PREFIX}${type}`)
const createActions = type => {
  const actions = createApiActions(`${PREFIX}${type}`)

  actionsMap[type] = actions

  return actions
}

// ------------------------------------
// Base Type
// ------------------------------------

// Connection Notify
const CHAT_MESSAGE_NOTIFY = 'CHAT_MESSAGE_NOTIFY'
const USER_LOGIN_NOTIFY = 'USER_LOGIN_NOTIFY'
const USER_LOGOUT_NOTIFY = 'USER_LOGOUT_NOTIFY'
// Normal Action

// Request, Success, Failure
export const KEY = {
  WEB_SOCKET_LOGIN: 'WEB_SOCKET_LOGIN',
  SEND_CHAT_MESSAGE: 'SEND_CHAT_MESSAGE',
  GET_CHANNEL_HISTORY: 'GET_CHANNEL_HISTORY',
}

// ------------------------------------
// Actions: { request, success, failure }
// ------------------------------------

export const webSocketLoginActions = createActions(KEY.WEB_SOCKET_LOGIN)
export const getChannelHistoryActions = createActions(KEY.GET_CHANNEL_HISTORY)
export const sendChatMessageActions = createActions(KEY.SEND_CHAT_MESSAGE)

// ------------------------------------
// Action Creator
// ------------------------------------

// Connection Notify
export const chatMessageNotify = createAction(CHAT_MESSAGE_NOTIFY)
export const userLoginNotify = createAction(USER_LOGIN_NOTIFY)
export const userLogoutNotify = createAction(USER_LOGOUT_NOTIFY)

// Normal Action

// Request
export const webSocketLogin = webSocketLoginActions.request
export const getChannelHistory = getChannelHistoryActions.request
export const sendChatMessage = sendChatMessageActions.request
