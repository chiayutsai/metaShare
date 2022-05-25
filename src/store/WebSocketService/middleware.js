import { tokenSelector } from 'selectors/user'
import * as ACTION from './actions'
import { CMD_CODE } from './constants'

class WebSocketService {
  #store = null

  #MAPPER = null

  // 初始化用的
  constructor() {
    this.#MAPPER = {
      // map actions with corresponding results
      ACTION: {
        [CMD_CODE.WEB_SOCKET_LOGIN_REQUEST]: CMD_CODE.WEB_SOCKET_LOGIN_RESPONSE,
        [CMD_CODE.SEND_CHAT_MESSAGE_REQUEST]:
          CMD_CODE.SEND_CHAT_MESSAGE_RESPONSE,
      },
      // map notifies to redux actions
      NOTIFY: {
        [CMD_CODE.CHAT_MESSAGE_NOTIFY]: ACTION.chatMessageNotify,
        [CMD_CODE.USER_LOGIN_NOTIFY]: ACTION.userLoginNotify,
        [CMD_CODE.USER_LOGOUT_NOTIFY]: ACTION.userLogoutNotify,
      },
      // map redux actions to middleware functions
      MIDDLEWARE: {
        [ACTION.KEY.WEB_SOCKET_LOGIN]: this.#webSocketLogin,
        [ACTION.KEY.SEND_CHAT_MESSAGE]: this.#sendChatMessage,
      },
    }
  }

  #onMessage = response => {
    const responseBody = JSON.parse(response)
    const { commandCode } = responseBody || {}

    // notify
    const bcAction = this.#MAPPER.NOTIFY[commandCode]
    if (bcAction) {
      this.#dispatch(bcAction(responseBody))
    }

    const promise = this.requestPromises[commandCode]
    if (promise) {
      const { resolve } = promise

      delete this.requestPromises[commandCode]

      // TODO: error handle
      resolve(responseBody)
    }
  }

  // ------------------------------------
  // Redux
  // ------------------------------------
  createMiddleware = () => {
    this.requestPromises = {}

    this.actionDetailMap = {}
    // save a detailMap of request action type and correspond handler and all actions
    Object.keys(this.#MAPPER.MIDDLEWARE).forEach(key => {
      const actions = ACTION.actionsMap[key]
      const requestAction = actions?.request

      if (requestAction) {
        this.actionDetailMap[requestAction] = {
          handler: this.#MAPPER.MIDDLEWARE?.[key],
          actions,
        }
      }
    })

    // check action type, if action type listed in actionDetailMap,
    // execute handler and then dispatch success or failure action
    return store => {
      this.#store = store

      return next => async action => {
        next(action)

        const { dispatch } = store
        const { type, payload } = action
        const actionDetail = this.actionDetailMap?.[type]

        let result = null
        if (actionDetail) {
          const { handler, actions } = actionDetail
          try {
            result = await handler?.(payload)

            dispatch(actions.success(result))
          } catch (e) {
            dispatch(actions.failure(e))
            throw e
          }
        }

        return result
      }
    }
  }

  #dispatch = action => this.#store?.dispatch(action)

  #getState = () => this.#store?.getState()

  // ------------------------------------
  // Helpers
  // ------------------------------------
  #send = (code, data) => {
    this.ws.send(
      JSON.stringify({
        commandCode: code,
        ...data,
      }),
    )
  }

  #request = (code, data) => {
    const promise = new Promise((resolve, reject) => {
      const responseCode = this.#MAPPER.ACTION[code]
      if (!responseCode) {
        reject(new Error('this.#MAPPER.ACTION 沒有定義對應的 response code'))
        return
      }

      this.requestPromises[responseCode] = {
        resolve,
        reject,
      }

      this.#send(code, data)
    })

    return promise
  }

  #connect = () =>
    new Promise(resolve => {
      const url = 'ws://127.0.0.1:3000'
      this.ws = new WebSocket(url)
      this.ws.onopen = () => {
        console.log('open connection')
        resolve()
      }
      this.ws.onclose = () => {
        console.log('close connection')
      }
      this.ws.onmessage = event => {
        const txt = event.data
        console.log(txt)
        this.#onMessage(event.data)
      }
    })

  #webSocketLogin = async () => {
    if (this.ws && this.ws?.readyState !== 3) return null

    await this.#connect()

    const token = tokenSelector(this.#getState())

    return this.#request(CMD_CODE.WEB_SOCKET_LOGIN_REQUEST, { token })
  }

  #sendChatMessage = async data =>
    this.#request(CMD_CODE.SEND_CHAT_MESSAGE_REQUEST, data)
}

export default WebSocketService
