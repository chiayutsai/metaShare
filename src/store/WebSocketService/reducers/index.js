import { combineReducers } from 'redux'
import channelList from './channelList'
import online from './online'

export default combineReducers({
  channelList,
  online,
})
