import { handleActions } from 'redux-actions'
import { loginAction } from 'actions/api/webApi'
import { SET_LOGIN_LOADING } from 'actions/user'

const initialState = {
  isLoading: false,
  name: '',
  token: '',
}

export default handleActions(
  {
    [SET_LOGIN_LOADING]: state => ({
      ...state,
      isLoading: true,
    }),
    [loginAction.success]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      name: payload.data.name,
      token: payload.data.token,
    }),
    [loginAction.failure]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
)
