import { createAction } from 'redux-actions'
import { uploadImage } from 'actions/api/webApi'

const getRandomModalId = () => parseInt(Math.random() * 10000, 10)

export const ADD_IMAGE_URL = 'ADD_IMAGE_URL'
export const CLEAN_ALL_IMAGE_URL = 'CLEAN_ALL_IMAGE_URL'
export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const addImageUrl = createAction(ADD_IMAGE_URL, payload => ({
  ...payload,
  id: getRandomModalId(),
}))

export const cleanAllImageUrl = createAction(CLEAN_ALL_IMAGE_URL)

export const toggleLoading = createAction(TOGGLE_LOADING)
export const handleUploadImage = formData => async dispatch => {
  try {
    dispatch(toggleLoading())
    const { data } = await dispatch(uploadImage(formData))
    const { imageUrl } = data
    dispatch(addImageUrl({ imageUrl }))
  } catch (error) {
    console.log(error)
    throw error
  }
  dispatch(toggleLoading())
}
