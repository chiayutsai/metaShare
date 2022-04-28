import { handleActions } from 'redux-actions'
import { SET_APP_READY } from 'actions/loading'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = true

export default handleActions(
  {
    [SET_APP_READY]: (state, { payload }) => payload,
  },
  initialState,
)
