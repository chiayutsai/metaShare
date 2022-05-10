import { login } from 'actions/api/webApi'

// eslint-disable-next-line no-unused-vars
export const handleRegister = data => async (dispatch, getState) => {}

export const handleLogin = ({ email, password }) => async dispatch => {
  try {
    await dispatch(login({ email, password }))
  } catch (error) {
    console.log(error)
    throw error
  }
}
