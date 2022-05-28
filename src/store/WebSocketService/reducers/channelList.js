import { handleActions } from 'redux-actions'
import { readMessage } from 'actions/channel'
import {
  chatMessageNotify,
  sendChatMessageActions,
  getChannelHistoryActions,
} from '../actions'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

const checkAndCreateChannel = (state, channelId) => {
  const newState = [...state]

  const hasChannel = Boolean(
    newState.filter(c => c.channelId === channelId).length,
  )
  if (!hasChannel) {
    newState.push({ channelId, readMessage: [], noReadMessage: [] })
  }

  return newState
}

export default handleActions(
  {
    [getChannelHistoryActions.success]: (state, { payload }) => {
      const { channel, channelId } = payload

      const newState = checkAndCreateChannel(state, channelId)

      const newList = newState.reduce((acc, cur) => {
        if (cur.channelId === channelId) {
          return [
            ...acc,
            {
              ...cur,
              readMessage: [...channel.messages],
              isGetHistory: true,
            },
          ]
        }

        return [...acc, cur]
      }, [])

      return newList
    },
    [sendChatMessageActions.success]: (state, { payload }) => {
      const { from, to, message, createAt } = payload
      const newList = state.reduce((acc, cur) => {
        if (cur.channelId === to) {
          return [
            ...acc,
            {
              ...cur,
              readMessage: [...cur.readMessage, { from, message, createAt }],
            },
          ]
        }

        return [...acc, cur]
      }, [])

      return newList
    },
    [chatMessageNotify]: (state, { payload }) => {
      const { from, message, createAt } = payload

      const newState = checkAndCreateChannel(state, from)

      const newList = newState.reduce((acc, cur) => {
        if (cur.channelId === from) {
          return [
            ...acc,
            {
              ...cur,
              noReadMessage: [
                ...cur.noReadMessage,
                { from, message, createAt },
              ],
            },
          ]
        }

        return [...acc, cur]
      }, [])

      return newList
    },
    [readMessage]: (state, { payload }) => {
      const { channelId } = payload
      const newList = state.reduce((acc, cur) => {
        if (cur.channelId === channelId) {
          return [
            ...acc,
            {
              ...cur,
              readMessage: [...cur.readMessage, ...cur.noReadMessage],
              noReadMessage: [],
            },
          ]
        }

        return [...acc, cur]
      }, [])

      return newList
    },
  },
  initialState,
)
