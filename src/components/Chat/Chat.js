/* eslint-disable no-underscore-dangle */
import { useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleGetUsers } from 'actions/chat'
import ChatCard from 'components/ChatCard/ChatCard'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import ScrollView from 'components/ScrollView'
import { chatSelector } from 'selectors'
import {
  onlineSelector,
  channelListSelector,
} from 'store/WebSocketService/selectors'

const Chat = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(handleGetUsers())
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch])
  const scrollViewRef = useRef()
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const chat = useSelector(chatSelector)
  const online = useSelector(onlineSelector)
  const channelList = useSelector(channelListSelector)
  return (
    <div className=" px-4 py-3 bg-white rounded-lg shadow-card">
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-xl text-primary-900">聊天室</p>
      </div>
      <div className="mb-3">
        <DecorationLine />
      </div>

      <ScrollView
        setRef={setScrollViewRef}
        vertical
        auto
        maxHeight="500px"
        verticalWidth={4}
        verticalHoverWidth={10}
        thumbSizeChangeOnHover>
        {chat.map(item => {
          const isOnline = online?.includes(item._id)
          const [channel] = channelList.filter(
            channelItem => channelItem.channelId === item._id,
          )

          const noRead = channel?.noReadMessage.length

          return (
            <div key={item._id}>
              <ChatCard {...item} isOnline={isOnline} noRead={noRead} />
            </div>
          )
        })}
      </ScrollView>
    </div>
  )
}
export default Chat
