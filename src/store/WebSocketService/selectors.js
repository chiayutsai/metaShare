import { createSelector } from 'reselect'

const getChannelId = (_, channelId) => channelId
export const channelListSelector = state => state.webSocketService.channelList

export const getChannelHistorySelector = createSelector(
  getChannelId,
  channelListSelector,
  (channelId, channelList) => {
    const [channel] = channelList?.filter(item => item.channelId === channelId)

    return channel?.isGetHistory
  },
)

export const channelMessageSelector = createSelector(
  getChannelId,
  channelListSelector,
  (channelId, channelList) => {
    const [channel] = channelList?.filter(item => item.channelId === channelId)

    return channel?.readMessage
  },
)

export const noReadMessageCountSelector = createSelector(
  getChannelId,
  channelListSelector,
  (channelId, channelList) => {
    const [channel] = channelList?.filter(item => item.channelId === channelId)
    return channel?.noReadMessage.length
  },
)

export const noReadMessageTotalCountSelector = createSelector(
  channelListSelector,
  channelList => {
    let total = 0
    channelList.forEach(item => {
      total += item?.noReadMessage.length
    })
    return total
  },
)
export const onlineSelector = state => state.webSocketService.online
