import { createAction } from 'redux-actions'
import {
  login,
  register,
  check,
  checkEmail,
  checkVerification,
  resetPassword,
} from 'actions/api/webApi'
import {
  setForgetPasswordStep,
  setForgetPasswordEmail,
  setForgetPasswordToken,
} from 'actions/forgetPassword'
import {
  CHECK_VERIFICATION,
  RESET_PASSWORD,
  RESET_SUCCESS,
} from 'constants/forgetPassword'
import history from 'history.js'
import { forgetPasswordEmailSelector } from 'selectors'
import { tokenSelector } from 'selectors/user'
import BrowserStorage from 'utils/BrowserStorage'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING'
export const SET_TOKEN = 'SET_TOKEN'
// ------------------------------------
// Actions
// ------------------------------------
export const setLoginLoading = createAction(SET_LOGIN_LOADING)
export const setToken = createAction(SET_TOKEN)
export const handleCheck = () => async (dispatch, getState) => {
  const state = getState()
  const token = tokenSelector(state)
  if (token) {
    return
  }
  try {
    await dispatch(check())
    const storagetoken = BrowserStorage.get('token')
    dispatch(setToken(storagetoken))
  } catch (error) {
    history.push('/metaShare/login')
    console.log(error)
    throw error
  }
}

export const handleRegister = ({ name, email, password }) => async dispatch => {
  try {
    dispatch(setLoginLoading())
    const { data } = await dispatch(register({ name, email, password }))
    BrowserStorage.set('token', data.token)
    history.push('/metaShare')
    dispatch(setLoginLoading())
  } catch (error) {
    dispatch(setLoginLoading())
    console.log(error)
    throw error
  }
}

export const handleLogin = ({ email, password }) => async dispatch => {
  try {
    dispatch(setLoginLoading())
    const { data } = await dispatch(login({ email, password }))
    BrowserStorage.set('token', data.token)
    history.push('/metaShare')
    dispatch(setLoginLoading())
  } catch (error) {
    dispatch(setLoginLoading())
    console.log(error)
    throw error
  }
}

export const handleCheckEmail = ({ email }) => async dispatch => {
  try {
    dispatch(setLoginLoading())
    await dispatch(checkEmail({ email }))
    dispatch(setForgetPasswordStep(CHECK_VERIFICATION))
    dispatch(setForgetPasswordEmail(email))
    dispatch(setLoginLoading())
  } catch (error) {
    dispatch(setLoginLoading())
    console.log(error)
    throw error
  }
}

export const handleCheckVerification = ({ verification }) => async (
  dispatch,
  getState,
) => {
  const state = getState()
  const email = forgetPasswordEmailSelector(state)
  try {
    dispatch(setLoginLoading())
    const { data } = await dispatch(checkVerification({ email, verification }))
    dispatch(setForgetPasswordToken(data.token))
    dispatch(setForgetPasswordStep(RESET_PASSWORD))
    dispatch(setLoginLoading())
  } catch (error) {
    dispatch(setLoginLoading())
    console.log(error)
    throw error
  }
}

export const handleResetPassword = ({
  password,
  confirmPassword,
}) => async dispatch => {
  console.log(password, confirmPassword)
  try {
    dispatch(setLoginLoading())
    await dispatch(resetPassword({ password, confirmPassword }))
    dispatch(setForgetPasswordStep(RESET_SUCCESS))
    dispatch(setLoginLoading())
  } catch (error) {
    dispatch(setLoginLoading())
    console.log(error)
    throw error
  }
}