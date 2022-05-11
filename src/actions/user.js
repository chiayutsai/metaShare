import { createAction } from 'redux-actions'
import { login } from 'actions/api/webApi'

import history from 'history.js'
import BrowserStorage from 'utils/BrowserStorage'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export const setLoginLoading = createAction(SET_LOGIN_LOADING)

// eslint-disable-next-line no-unused-vars
export const handleRegister = data => async (dispatch, getState) => {}

export const handleLogin = ({ email, password }) => async dispatch => {
  console.log('test')
  try {
    dispatch(setLoginLoading())
    const { data } = await dispatch(login({ email, password }))
    BrowserStorage.set('token', data.token)
    history.push('/metaShare')
  } catch (error) {
    console.log(error)
    throw error
  }
}
