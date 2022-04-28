import { handleActions } from 'redux-actions'
import { DISMISS_MODAL, SET_MODAL } from 'actions/modal'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default handleActions(
  {
    [SET_MODAL]: (state, { payload }) => [...state, payload],
    [DISMISS_MODAL]: (state, { payload: { id } }) =>
      state.filter(error => error.id !== id),
  },
  initialState,
)
