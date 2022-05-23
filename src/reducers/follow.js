import { handleActions } from 'redux-actions'
import { SET_FOLLOW } from 'actions/follow'

const initialState = {
  following: [],
  follower: [],
}

export default handleActions(
  {
    [SET_FOLLOW]: (state, { payload }) => ({ ...state, ...payload }),
  },
  initialState,
)
