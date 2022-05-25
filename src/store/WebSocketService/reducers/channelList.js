import { handleActions } from 'redux-actions'
import { readMessage } from 'actions/channel'
import { chatMessageNotify, sendChatMessageActions } from '../actions'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default handleActions(
  {
    [sendChatMessageActions.success]: (state, { payload }) => {
      const { from, to, message, createAt } = payload
      const hasChannel = Boolean(
        state.filter(channel => channel.channelId === to).length,
      )
      if (!hasChannel) {
        state.push({ channelId: to, readMessage: [], noReadMessage: [] })
      }
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
      const hasChannel = Boolean(
        state.filter(channel => channel.channelId === from).length,
      )
      if (!hasChannel) {
        state.push({ channelId: from, readMessage: [], noReadMessage: [] })
      }
      const newList = state.reduce((acc, cur) => {
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
      const hasChannel = Boolean(
        state.filter(channel => channel.channelId === channelId).length,
      )
      if (!hasChannel) {
        state.push({ channelId, readMessage: [], noReadMessage: [] })
      }
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
