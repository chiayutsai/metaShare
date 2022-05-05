import { FILTER_TYPE_MAP } from 'constants/filterType'
import createApiActions from 'utils/createApiActions'
import BaseApi from './BaseApi'

// const baseURL = 'https://mata-share-backend.herokuapp.com'
const baseURL = 'http://127.0.0.1:3000'
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

// const putApi = new BaseApi().create({
//   baseURL: '/api',
//   method: 'PUT',
// })

// const patchApi = new BaseApi().create({
//   baseURL: '/api',
//   method: 'PATCH',
// })

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
const addPost = ({ content, imageUrls }) => async dispatch => {
  try {
    // author、imageUrls 從 selector 來
    console.log(content, imageUrls)
    const data = {
      author: '627100547ef69b72689e67f6',
      content,
      imageUrls,
    }

    dispatch(addPostAction.request(data))
    const result = await dispatch(
      postApi({
        url: `/posts`,
        data,
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
export { getAllPosts, addPost, uploadImage }
