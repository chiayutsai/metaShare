import { handleActions } from 'redux-actions'
import { SET_FORGET_PASSWORD_STEP } from 'actions/forgetPassword'
import { CHECK_EMAIL } from 'constants/forgetPassword'

const initialState = CHECK_EMAIL

export default handleActions(
  {
    [SET_FORGET_PASSWORD_STEP]: (state, { payload }) => payload,
  },
  initialState,
)
