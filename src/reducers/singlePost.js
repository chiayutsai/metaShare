import { handleActions } from 'redux-actions'
import { SET_SINGLE_POST } from 'actions/singlePost'

const initialState = {}

export default handleActions(
  {
    [SET_SINGLE_POST]: (state, { payload }) => ({ ...state, ...payload }),
  },
  initialState,
)
