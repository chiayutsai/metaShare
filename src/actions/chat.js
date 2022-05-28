/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import { getAllUsers } from 'actions/api/webApi'
import { userIdSelector } from 'selectors/user'
// ------------------------------------
// Action Types
// ------------------------------------

export const SET_CHAT_USERS = 'SET_CHAT_USERS'
export const OPEN_MOBILE_CHAT = 'OPEN_MOBILE_CHAT'
export const CLOSE_MOBILE_CHAT = 'CLOSE_MOBILE_CHAT'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setChatUsers = createAction(SET_CHAT_USERS)
export const openMobileChat = createAction(OPEN_MOBILE_CHAT)
export const closeMobileChat = createAction(CLOSE_MOBILE_CHAT)
export const handleGetUsers = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const userId = userIdSelector(state)
    const { data } = await dispatch(getAllUsers())
    const chatMembers = data.filter(item => item._id !== userId)
    dispatch(setChatUsers(chatMembers))
  } catch (error) {
    console.log(error)
    throw error
  }
}
