// eslint-disable-next-line max-classes-per-file
import axios from 'axios'
import { setLoadingDone, setLoadingProgress } from 'actions/loading'

const APP_REQUEST_TIMEOUT = 60 * 1000

class ApiError extends Error {
  constructor(code, message = '') {
    super()
    this.code = code
    this.message = `ErrorCode: ${code}, ErrorDescription: ${message}`
    Error?.captureStackTrace?.(this, ApiError)
  }
}

class BaseApi {
  // Promise based HTTP client
  // https://github.com/axios/axios
  create = options => {
    const instance = axios.create({
      baseURL: '/',
      timeout: APP_REQUEST_TIMEOUT, // milliseconds
      responseType: 'json',
      method: 'get',
      ...options,
    })
    // https://github.com/axios/axios#axiosconfig
    return input => async dispatch => {
      const { loadingTarget } = input || {}
      try {
        if (loadingTarget) {
          dispatch(setLoadingProgress({ target: loadingTarget }))
        }

        const result = await instance(input)
        const data = this.checkResponse(result)
        return data
      } catch (error) {
        const { response: { headers, status, data } = {} } = error
        // handle timeout case
        if (error.code === 'ECONNABORTED') {
          throw new ApiError(408, 'Request Timeout')
        }

        if (status !== 200) {
          const contentType = headers?.['content-type'] || ''

          if (contentType.includes('json')) {
            throw data
          }

          throw new ApiError(status, 'Service not avaiable')
        }
        // non standard error or unexpected error
        const {
          Result: { ErrorCode, ErrorDescription },
        } = data
        // Logger.error('API Error', error)
        throw new ApiError(ErrorCode, ErrorDescription)
      } finally {
        if (loadingTarget) {
          dispatch(setLoadingDone({ target: loadingTarget }))
        }
      }
    }
  }

  checkResponse = response => {
    if (response?.data?.Result?.ErrorCode !== '0') {
      const error = new Error(response?.data)
      error.response = response
      throw error
    }
    return response.data
  }
}

export default BaseApi
