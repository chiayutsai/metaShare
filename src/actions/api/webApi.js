import createApiActions from 'utils/createApiActions'
import BaseApi from './BaseApi'

const baseURL = 'https://mata-share-backend.herokuapp.com/'
// base api
const getApi = new BaseApi().create({
  baseURL,
})

const postApi = new BaseApi().create({
  baseURL,
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
const getAllPosts = () => async dispatch => {
  const data = {}

  try {
    dispatch(getAllPostsAction.request(data))
    const result = await dispatch(
      getApi({
        url: '/posts',
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
const addPost = ({ content }) => async dispatch => {
  try {
    // author、imageUrls 從 selector 來

    const data = { content }

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

export { getAllPosts, addPost }
