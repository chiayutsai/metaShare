import { handleActions } from 'redux-actions'
import {
  SET_CHAT_USERS,
  OPEN_MOBILE_CHAT,
  CLOSE_MOBILE_CHAT,
} from 'actions/chat'

const initialState = {
  isMobileChat: false,
  chat: [],
}

export default handleActions(
  {
    [OPEN_MOBILE_CHAT]: state => ({
      ...state,
      isMobileChat: true,
    }),
    [CLOSE_MOBILE_CHAT]: state => ({
      ...state,
      isMobileChat: false,
    }),
    [SET_CHAT_USERS]: (state, { payload }) => ({
      ...state,
      chat: [...payload],
    }),
  },
  initialState,
)
