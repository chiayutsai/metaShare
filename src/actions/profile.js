/* eslint-disable no-underscore-dangle */
import { createAction } from 'redux-actions'
import {
  getProfile,
  updatePassword,
  updateProfile,
  uploadImage,
  getUserFollow,
  updateUserFollow,
} from 'actions/api/webApi'
import { setFollow } from 'actions/follow'
import { openLoading, closeLoading } from 'actions/loading'
import { setToken, updateUserInfo } from 'actions/user'
import { COVER_IMAGE } from 'constants/editType'
import { profileUserIdSelector } from 'selectors/profile'
import { userIdSelector } from 'selectors/user'
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
export const UPDATE_PROFILE_FOLLOW = 'UPDATE_PROFILE_FOLLOW'
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
export const updateProfileFollow = createAction(UPDATE_PROFILE_FOLLOW)

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

export const handleGetProfile = ({ userId }) => async dispatch => {
  try {
    dispatch(openLoading())

    const { data } = await dispatch(getProfile({ userId }))
    const {
      data: { following, follower },
    } = await dispatch(getUserFollow({ userId }))
    dispatch(updateProfileInfo({ ...data, following, follower }))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}

export const handleProfileFollow = ({ userId }) => async dispatch => {
  try {
    dispatch(openLoading())
    const {
      data: { adminFollow, otherFollow },
    } = await dispatch(updateUserFollow({ userId }))
    dispatch(
      setFollow({
        following: adminFollow.following,
        follower: adminFollow.follower,
      }),
    )
    dispatch(
      updateProfileFollow({
        following: otherFollow.following,
        follower: otherFollow.follower,
      }),
    )
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}

export const handleProfileFollowModal = ({ userId }) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState()
    const admin = userIdSelector(state)
    const profileUserId = profileUserIdSelector(state)
    dispatch(openLoading())
    const {
      data: { adminFollow },
    } = await dispatch(updateUserFollow({ userId }))
    dispatch(
      setFollow({
        following: adminFollow.following,
        follower: adminFollow.follower,
      }),
    )
    if (admin === profileUserId) {
      dispatch(
        updateProfileFollow({
          following: adminFollow.following,
          follower: adminFollow.follower,
        }),
      )
    }
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(closeLoading())
}
