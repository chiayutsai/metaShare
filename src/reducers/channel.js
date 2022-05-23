import { handleActions } from 'redux-actions'
import { SET_CHANNEL, DISMISS_CHANNEL } from 'actions/channel'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default handleActions(
  {
    [SET_CHANNEL]: (state, { payload }) => [payload],
    [DISMISS_CHANNEL]: (state, { payload: { id } }) =>
      state.filter(error => error.id !== id),
  },
  initialState,
)
