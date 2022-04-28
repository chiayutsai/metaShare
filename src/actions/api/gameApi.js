import createApiActions from 'utils/createApiActions'
import BaseApi from './BaseApi'

// base api
const api = new BaseApi().create({
  baseURL: '/',
  method: 'POST',
})

const getApi = new BaseApi().create({
  baseURL: '/',
})

// helper
const getTimeStamp = () => ({ TimeStamp: new Date().toISOString() })

// api actions

// define
export const apiStartAction = createApiActions('API_START')
// request
const apiStart = () => async dispatch => {
  const data = {}

  try {
    dispatch(apiStartAction.request(data))
    const result = await dispatch(
      getApi({
        url: '/api/ApiStart',
      }),
    )
    dispatch(apiStartAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(apiStartAction.failure(error))
    throw error
  }
}

// define
export const enterGameAction = createApiActions('ENTER_GAME')
// request
const enterGame = () => async dispatch => {
  try {
    const data = {
      ...getTimeStamp(),
    }

    dispatch(enterGameAction.request(data))
    const result = await dispatch(
      api({
        url: `/api/EnterGame`,
        data,
      }),
    )
    dispatch(enterGameAction.success(result))
    return result
  } catch (error) {
    console.error(error)
    dispatch(enterGameAction.failure(error))
    throw error
  }
}

export { apiStart, enterGame }
