import { handleActions } from 'redux-actions'
import { SET_DARK_MODE } from 'actions/darkMode'

const initialState = false

export default handleActions(
  {
    [SET_DARK_MODE]: (state, { payload }) => payload,
  },
  initialState,
)
