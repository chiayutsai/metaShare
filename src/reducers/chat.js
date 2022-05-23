import { handleActions } from 'redux-actions'
import { SET_CHAT_USERS } from 'actions/chat'

const initialState = []

export default handleActions(
  {
    [SET_CHAT_USERS]: (state, { payload }) => payload,
  },
  initialState,
)
