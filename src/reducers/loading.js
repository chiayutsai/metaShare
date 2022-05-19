import { handleActions } from 'redux-actions'
import { OPEN_LOADING, CLOSE_LOADING } from 'actions/loading'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false

export default handleActions(
  {
    [OPEN_LOADING]: () => true,
    [CLOSE_LOADING]: () => false,
  },
  initialState,
)
