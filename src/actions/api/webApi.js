import baseURL from 'config/baseURL'
import { FILTER_TYPE_MAP } from 'constants/filterType'
import { forgetPasswordTokenSelector } from 'selectors'
import { profileUserIdSelector } from 'selectors/profile'
import { tokenSelector } from 'selectors/user'

import BrowserStorage from 'utils/BrowserStorage'
import createApiActions from 'utils/createApiActions'
import BaseApi from './BaseApi'

// base api
const getApi = new BaseApi().create({
  baseURL: `${baseURL}/api`,
})

const postApi = new BaseApi().create({
  baseURL: `${baseURL}/api`,
  method: 'POST',
})

const deleteApi = new BaseApi().create({
  baseURL: `${baseURL}/api`,
  method: 'DELETE',
})

const patchApi = new BaseApi().create({
  baseURL: `${baseURL}/api`,
  method: 'PATCH',
})

// api actions
// define
export const getAllUsersAction = createApiActions('GET_ALL_USERS')

// request
const getAllUsers = () => async (dispatch, getState) => {
  const state = getState()
  const token = tokenSelector(state)
  const data = {}

  try {
    dispatch(getAllUsersAction.request(data))
    const result = await dispatch(
      getApi({
        url: `/user`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(getAllUsersAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(getAllUsersAction.failure(error))
    throw error
  }
}

// define
export const getAllPostsAction = createApiActions('GET_ALL_POSTS')

// request
const getAllPosts = (filterType, searchWord) => async (dispatch, getState) => {
  const state = getState()
  const token = tokenSelector(state)
  const profileUserId = profileUserIdSelector(state)
  const data = {}
  const sort = filterType ? `sort=${FILTER_TYPE_MAP[filterType]}` : ''
  const search = searchWord ? `search=${searchWord}` : ''
  let url = profileUserId ? `/posts/user/${profileUserId}` : '/posts'
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
export const getSinglePostAction = createApiActions('GET_SINGLE_POST')
// request
const getSinglePost = ({ postId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}
    dispatch(getSinglePostAction.request(data))
    const result = await dispatch(
      getApi({
        url: `/post/${postId}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(getSinglePostAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(getSinglePostAction.failure(error))
    throw error
  }
}

// define
export const getPostLikesAction = createApiActions('GET_POST_LIKSE')
// request
const getPostLikes = ({ postId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}
    dispatch(getPostLikesAction.request(data))
    const result = await dispatch(
      getApi({
        url: `/post/${postId}/likes`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(getPostLikesAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(getPostLikesAction.failure(error))
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
export const updatePostAction = createApiActions('UPDATE_POST')
// request
const updatePost = ({ postId, content, imageUrls }) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {
      content,
      imageUrls,
    }

    dispatch(updatePostAction.request(data))
    const result = await dispatch(
      patchApi({
        url: `/post/${postId}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(updatePostAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(updatePostAction.failure(error))
    throw error
  }
}

// define
export const deletePostAction = createApiActions('DELETE_POST')
// request
const deletePost = ({ postId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}

    dispatch(deletePostAction.request(data))
    const result = await dispatch(
      deleteApi({
        url: `/post/${postId}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(deletePostAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(deletePostAction.failure(error))
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
export const getProfileAction = createApiActions('GET_PROFILE')
// request
const getProfile = ({ userId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}
    dispatch(getProfileAction.request(data))
    const result = await dispatch(
      getApi({
        url: `/user/profile/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(getProfileAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(getProfileAction.failure(error))
    throw error
  }
}

// define
export const updateProfileAction = createApiActions('UPDATE_PROFILE')
// request
const updateProfile = ({
  avator,
  name,
  description,
  tags,
  coverImage,
  coverImageBlur,
}) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {
      avator,
      name,
      description,
      tags,
      coverImage,
      coverImageBlur,
    }
    dispatch(updateProfileAction.request(data))
    const result = await dispatch(
      patchApi({
        url: `/user/profile`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(updateProfileAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(updateProfileAction.failure(error))
    throw error
  }
}

// define
export const updateLikesAction = createApiActions('UPDATE_LIKES')
// request
const updateLikes = ({ postId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}
    dispatch(updateLikesAction.request(data))
    const result = await dispatch(
      patchApi({
        url: `/post/${postId}/likes`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(updateLikesAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(updateLikesAction.failure(error))
    throw error
  }
}

// define
export const updateCommentsAction = createApiActions('UPDATE_COMMENTS')
// request
const updateComments = ({ postId, content }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {
      content,
    }
    dispatch(updateCommentsAction.request(data))
    const result = await dispatch(
      patchApi({
        url: `/post/${postId}/comments`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(updateCommentsAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(updateCommentsAction.failure(error))
    throw error
  }
}

// define
export const getUserLikesPostsAction = createApiActions('GET_USER_LIKES_POST')
// request
const getUserLikesPosts = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}
    dispatch(getUserLikesPostsAction.request(data))
    const result = await dispatch(
      getApi({
        url: `/likesPost`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(getUserLikesPostsAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(getUserLikesPostsAction.failure(error))
    throw error
  }
}

// define
export const getUserFollowAction = createApiActions('GET_USER_FOLLOW')
// request
const getUserFollow = ({ userId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}
    dispatch(getUserFollowAction.request(data))
    const result = await dispatch(
      getApi({
        url: `/follow/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(getUserFollowAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(getUserFollowAction.failure(error))
    throw error
  }
}

// define
export const updateUserFollowAction = createApiActions('UPDATE_USER_FOLLOW')
// request
const updateUserFollow = ({ userId }) => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {}
    dispatch(updateUserFollowAction.request(data))
    const result = await dispatch(
      patchApi({
        url: `/follow/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(updateUserFollowAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(updateUserFollowAction.failure(error))
    throw error
  }
}
// define
export const updatePasswordAction = createApiActions('UPDATE_PASSWORD')
// request
const updatePassword = ({ password, confirmPassword }) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    const data = {
      password,
      confirmPassword,
    }

    dispatch(updatePasswordAction.request(data))
    const result = await dispatch(
      patchApi({
        url: `/user/updatePassword`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    dispatch(updatePasswordAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(updatePasswordAction.failure(error))
    throw error
  }
}
// define
export const uploadImageAction = createApiActions('UPLOAD_IMAGE')
// request
const uploadImage = formData => async (dispatch, getState) => {
  try {
    const state = getState()
    const token = tokenSelector(state)
    dispatch(uploadImageAction.request(formData))
    const result = await dispatch(
      postApi({
        url: '/uploadImage',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  getAllUsers,
  getAllPosts,
  getSinglePost,
  getPostLikes,
  addPost,
  updatePost,
  deletePost,
  login,
  register,
  check,
  checkEmail,
  checkVerification,
  resetPassword,
  getProfile,
  updateProfile,
  updateLikes,
  updateComments,
  getUserLikesPosts,
  getUserFollow,
  updateUserFollow,
  updatePassword,
  uploadImage,
}
