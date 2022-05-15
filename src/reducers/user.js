import { handleActions } from 'redux-actions'
import { loginAction, registerAction, checkAction } from 'actions/api/webApi'
import { SET_LOGIN_LOADING, SET_TOKEN, UPDATE_USER_INFO } from 'actions/user'

const initialState = {
  isLoading: false,
  id: '',
  name: '',
  avator: '',
  token: '',
}

export default handleActions(
  {
    [SET_LOGIN_LOADING]: state => ({
      ...state,
      isLoading: !state.isLoading,
    }),
    [SET_TOKEN]: (state, { payload }) => ({
      ...state,
      token: payload,
    }),
    [UPDATE_USER_INFO]: (state, { payload }) => ({
      ...state,
      name: payload.user.name,
      avator: payload.user.avator,
    }),
    [loginAction.success]: (state, { payload }) => ({
      ...state,
      id: payload.data.id,
      name: payload.data.name,
      avator: payload.data.avator,
      token: payload.data.token,
    }),
    [registerAction.success]: (state, { payload }) => ({
      ...state,
      id: payload.data.id,
      name: payload.data.name,
      avator: payload.data.avator,
      token: payload.data.token,
    }),
    [checkAction.success]: (state, { payload }) => ({
      ...state,
      id: payload.data.id,
      name: payload.data.name,
      avator: payload.data.avator,
      token: payload.data.token,
    }),
  },
  initialState,
)
