import { handleActions } from 'redux-actions'
import { uploadImageAction } from 'actions/api/webApi'
import { ADD_IMAGE_URL, CLEAN_ALL_IMAGE_URL } from 'actions/uploadImage'

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
    [CLEAN_ALL_IMAGE_URL]: () => ({
      imageUrls: [],
    }),
    [uploadImageAction.failure]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
)
