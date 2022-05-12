import { handleActions } from 'redux-actions'
import {
  SET_FORGET_PASSWORD_STEP,
  SET_FORGET_PASSWORD_EMAIL,
  SET_FORGET_PASSWORD_TOKEN,
} from 'actions/forgetPassword'
import { CHECK_EMAIL } from 'constants/forgetPassword'

const initialState = {
  step: CHECK_EMAIL,
  email: '',
  token: '',
}

export default handleActions(
  {
    [SET_FORGET_PASSWORD_STEP]: (state, { payload }) => ({
      ...state,
      step: payload,
    }),
    [SET_FORGET_PASSWORD_EMAIL]: (state, { payload }) => ({
      ...state,
      email: payload,
    }),
    [SET_FORGET_PASSWORD_TOKEN]: (state, { payload }) => ({
      ...state,
      token: payload,
    }),
  },
  initialState,
)
