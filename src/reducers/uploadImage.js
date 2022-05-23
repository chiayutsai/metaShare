import { handleActions } from 'redux-actions'
import { uploadImageAction } from 'actions/api/webApi'
import {
  ADD_IMAGE_URL,
  DELETE_IMAGE,
  CLEAN_ALL_IMAGE_URL,
  TOGGLE_LOADING,
} from 'actions/uploadImage'

const initialState = {
  isLoading: false,
  imageUrls: [],
}

export default handleActions(
  {
    [uploadImageAction.request]: state => ({
      ...state,
      isLoading: true,
    }),
    [ADD_IMAGE_URL]: (state, { payload }) => ({
      ...state,
      imageUrls: [...state.imageUrls, payload],
    }),
    [DELETE_IMAGE]: (state, { payload: { id } }) => ({
      ...state,
      imageUrls: state.imageUrls.filter(image => image.id !== id),
    }),
    [CLEAN_ALL_IMAGE_URL]: state => ({
      ...state,
      imageUrls: [],
    }),
    [TOGGLE_LOADING]: state => ({
      ...state,
      isLoading: !state.isLoading,
    }),
    [uploadImageAction.failure]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
)
