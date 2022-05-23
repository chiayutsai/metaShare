import { handleActions } from 'redux-actions'
import {
  SET_PROFILE_USER_ID,
  SET_PROFILE_EDIT,
  SET_PROFILE_EDIT_LOADING,
  SET_PROFILE_EDIT_PAGE,
  SET_PROFILE_UPLOAD_LOADING,
  OPEN_PROFILE_EDIT,
  CLOSE_PROFILE_EDIT,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_FOLLOW,
} from 'actions/profile'
import { COVER_IMAGE } from 'constants/editType'

const initialState = {
  userId: '',
  info: {
    name: '',
    avator: '',
    description: '',
    tags: {},
  },
  coverImage: {
    coverImage: '',
    isOpen: true,
  },
  follow: {
    following: [],
    follower: [],
  },
  isEdit: false,
  isEditLoading: false,
  isUploadLoading: false,
  editPage: COVER_IMAGE,
}

export default handleActions(
  {
    [SET_PROFILE_USER_ID]: (state, { payload }) => ({
      ...state,
      userId: payload,
    }),
    [SET_PROFILE_EDIT]: state => ({
      ...state,
      isEdit: !state.isEdit,
    }),
    [OPEN_PROFILE_EDIT]: state => ({
      ...state,
      isEdit: true,
    }),
    [CLOSE_PROFILE_EDIT]: state => ({
      ...state,
      isEdit: false,
    }),
    [SET_PROFILE_EDIT_LOADING]: state => ({
      ...state,
      isEditLoading: !state.isEditLoading,
    }),
    [SET_PROFILE_EDIT_PAGE]: (state, { payload }) => ({
      ...state,
      editPage: payload,
    }),
    [SET_PROFILE_UPLOAD_LOADING]: state => ({
      ...state,
      isUploadLoading: !state.isUploadLoading,
    }),
    [UPDATE_PROFILE_INFO]: (state, { payload }) => ({
      ...state,
      info: {
        name: payload.user.name,
        avator: payload.user.avator,
        description: payload.description,
        tags: payload.tags,
      },
      coverImage: {
        coverImage: payload.coverImage,
        isOpen: payload.coverImageBlur,
      },
      follow: {
        following: payload.following,
        follower: payload.follower,
      },
    }),
    [UPDATE_PROFILE_FOLLOW]: (state, { payload }) => ({
      ...state,
      follow: {
        following: payload.following,
        follower: payload.follower,
      },
    }),
  },
  initialState,
)
