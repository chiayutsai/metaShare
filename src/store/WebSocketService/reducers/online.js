import { handleActions } from 'redux-actions'
import {
  webSocketLoginActions,
  userLoginNotify,
  userLogoutNotify,
} from '../actions'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default handleActions(
  {
    [webSocketLoginActions.success]: (state, { payload }) => payload?.online,
    [userLoginNotify]: (state, { payload: { userId } }) => {
      if (state.includes(userId)) {
        return state
      }
      return [...state, userId]
    },
    [userLogoutNotify]: (state, { payload: { userId } }) =>
      state.filter(item => item !== userId),
  },
  initialState,
)
