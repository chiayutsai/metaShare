import { FILTER_TYPE_MAP } from 'constants/filterType'
import { forgetPasswordTokenSelector } from 'selectors'
import { tokenSelector } from 'selectors/user'
import BrowserStorage from 'utils/BrowserStorage'
import createApiActions from 'utils/createApiActions'
import BaseApi from './BaseApi'

const baseURL = 'https://mata-share-backend.herokuapp.com'
// const baseURL = 'http://127.0.0.1:3000'
// base api
const getApi = new BaseApi().create({
  baseURL: `${baseURL}/api`,
})

const postApi = new BaseApi().create({
  baseURL: `${baseURL}/api`,
  method: 'POST',
})

// const deleteApi = new BaseApi().create({
//   baseURL: '/api',
//   method: 'DELETE',
// })

const patchApi = new BaseApi().create({
  baseURL: `${baseURL}/api`,
  method: 'PATCH',
})

// api actions

// define
export const getAllPostsAction = createApiActions('GET_ALL_POSTS')

// request
const getAllPosts = (filterType, searchWord) => async dispatch => {
  const data = {}
  const sort = filterType ? `sort=${FILTER_TYPE_MAP[filterType]}` : ''
  const search = searchWord ? `search=${searchWord}` : ''
  let url = '/posts'
  if (sort && search) {
    url += `?${sort}&${search}`
  } else if (sort) {
    url += `?${sort}`
  } else if (search) {
    url += `?${search}`
  }

  try {
    dispatch(getAllPostsAction.request(data))
    const result = await dispatch(
      getApi({
        url,
      }),
    )
    dispatch(getAllPostsAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(getAllPostsAction.failure(error))
    throw error
  }
}

// define
export const addPostAction = createApiActions('ADD_POST')
// request
const addPost = ({ content, imageUrls }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {
      content,
      imageUrls,
    }

    dispatch(addPostAction.request(data))
    const result = await dispatch(
      postApi({
        url: `/post`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(addPostAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(addPostAction.failure(error))
    throw error
  }
}

// define
export const loginAction = createApiActions('LOGIN')
// request
const login = ({ email, password }) => async dispatch => {
  try {
    const data = {
      email,
      password,
    }

    dispatch(loginAction.request(data))
    const result = await dispatch(
      postApi({
        url: `/user/login`,
        data,
      }),
    )
    dispatch(loginAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(loginAction.failure(error))
    throw error
  }
}

// define
export const registerAction = createApiActions('REGISTER')
// request
const register = ({ name, email, password }) => async dispatch => {
  try {
    const data = {
      name,
      email,
      password,
    }

    dispatch(registerAction.request(data))
    const result = await dispatch(
      postApi({
        url: `/user/register`,
        data,
      }),
    )
    dispatch(registerAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(registerAction.failure(error))
    throw error
  }
}

// define
export const checkAction = createApiActions('CHECK')
// request
const check = () => async dispatch => {
  try {
    const data = {}
    const token = BrowserStorage.get('token')
    dispatch(checkAction.request(data))
    const result = await dispatch(
      getApi({
        url: `/user/check`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(checkAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(checkAction.failure(error))
    throw error
  }
}

// define
export const checkEmailAction = createApiActions('CHECK_EMAIL')
// request
const checkEmail = ({ email }) => async dispatch => {
  try {
    const data = {
      email,
    }

    dispatch(checkEmailAction.request(data))
    const result = await dispatch(
      postApi({
        url: `/user/checkEmail`,
        data,
      }),
    )
    dispatch(checkEmailAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(checkEmailAction.failure(error))
    throw error
  }
}

// define
export const checkVerificationAction = createApiActions('CHECK_VERIFICATION')
// request
const checkVerification = ({ email, verification }) => async dispatch => {
  try {
    const data = {
      email,
      verification,
    }
    console.log(data)
    dispatch(checkVerificationAction.request(data))
    const result = await dispatch(
      postApi({
        url: `/user/verification`,
        data,
      }),
    )
    dispatch(checkVerificationAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(checkVerificationAction.failure(error))
    throw error
  }
}

// define
export const resetPasswordAction = createApiActions('RESET_PASSWORD')
// request
const resetPassword = ({ password, confirmPassword }) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState()
    const token = forgetPasswordTokenSelector(state)
    const data = {
      password,
      confirmPassword,
    }
    dispatch(resetPasswordAction.request(data))
    const result = await dispatch(
      patchApi({
        url: `/user/resetPassword`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(resetPasswordAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(resetPasswordAction.failure(error))
    throw error
  }
}
// define
export const uploadImageAction = createApiActions('UPLOAD_IMAGE')
// request
const uploadImage = formData => async dispatch => {
  try {
    dispatch(uploadImageAction.request(formData))
    const result = await dispatch(
      postApi({
        url: '/uploadImage',
        data: formData,
      }),
    )
    dispatch(uploadImageAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(uploadImageAction.failure(error))
    throw error
  }
}
export {
  getAllPosts,
  addPost,
  login,
  register,
  check,
  checkEmail,
  checkVerification,
  resetPassword,
  uploadImage,
}
