import { createAction } from 'redux-actions'
import { updatePassword, updateProfile, uploadImage } from 'actions/api/webApi'
import { setToken, updateUserInfo } from 'actions/user'
import { COVER_IMAGE } from 'constants/editType'

import BrowserStorage from 'utils/BrowserStorage'
// ------------------------------------
// Action Types
// ------------------------------------
export const SET_PROFILE_USER_ID = 'SET_PROFILE_USER_ID'
export const SET_PROFILE_EDIT = 'SET_PROFILE_EDIT'
export const SET_PROFILE_EDIT_LOADING = 'SET_PROFILE_EDIT_LOADING'
export const SET_PROFILE_EDIT_PAGE = 'SET_PROFILE_EDIT_PAGE'
export const SET_PROFILE_UPLOAD_LOADING = 'SET_PROFILE_UPLOAD_LOADING'
export const CLOSE_PROFILE_EDIT = 'CLOSE_PROFILE_EDIT'
export const OPEN_PROFILE_EDIT = 'OPEN_PROFILE_EDIT'
export const UPDATE_PROFILE_INFO = 'UPDATE_PROFILE_INFO'
// ------------------------------------
// Action Creators
// ------------------------------------
export const setProfileUserId = createAction(SET_PROFILE_USER_ID)
export const setProfileEdit = createAction(SET_PROFILE_EDIT)
export const setProfileEditLoading = createAction(SET_PROFILE_EDIT_LOADING)
export const openProfileEdit = createAction(OPEN_PROFILE_EDIT)
export const closeProfileEdit = createAction(CLOSE_PROFILE_EDIT)
export const setProfileEditPage = createAction(SET_PROFILE_EDIT_PAGE)

export const setProfileUploadLoading = createAction(SET_PROFILE_UPLOAD_LOADING)

export const updateProfileInfo = createAction(UPDATE_PROFILE_INFO)

export const setProfileEditInit = () => dispatch => {
  dispatch(closeProfileEdit())
  dispatch(setProfileEditPage(COVER_IMAGE))
}

export const handleUploadProfileImage = formData => async dispatch => {
  try {
    dispatch(setProfileUploadLoading())
    const { data } = await dispatch(uploadImage(formData))
    dispatch(setProfileUploadLoading())
    return data
  } catch (error) {
    dispatch(setProfileUploadLoading())
    console.log(error)
    throw error
  }
}

export const handleSaveCoverImage = ({
  coverImage,
  coverImageBlur,
}) => async dispatch => {
  try {
    dispatch(setProfileEditLoading())
    const { data } = await dispatch(
      updateProfile({ coverImage, coverImageBlur }),
    )
    dispatch(updateProfileInfo(data))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(setProfileEditLoading())
}

export const handleSavePersonInfo = ({
  avator,
  name,
  description,
  tags,
}) => async dispatch => {
  try {
    dispatch(setProfileEditLoading())
    const { data } = await dispatch(
      updateProfile({ avator, name, description, tags }),
    )
    dispatch(updateProfileInfo(data))
    dispatch(updateUserInfo(data))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(setProfileEditLoading())
}

export const handleUpdatePassword = ({
  password,
  confirmPassword,
}) => async dispatch => {
  try {
    dispatch(setProfileEditLoading())
    const { data } = await dispatch(
      updatePassword({ password, confirmPassword }),
    )
    BrowserStorage.set('token', data.token)
    dispatch(setToken(data.token))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(setProfileEditLoading())
}
