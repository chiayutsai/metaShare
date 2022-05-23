/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions'
import {
  SET_USER_LIKES_POSTS,
  DELETE_LIKES_POSTS,
  UPDATE_LIKES_POSTS,
} from 'actions/likesPost'

const initialState = []

export default handleActions(
  {
    [SET_USER_LIKES_POSTS]: (state, { payload }) => payload,
    [DELETE_LIKES_POSTS]: (state, { payload }) => {
      console.log(payload)
      const { _id } = payload
      const newPosts = state.filter(item => item._id !== _id)
      return newPosts
    },
    [UPDATE_LIKES_POSTS]: (state, { payload }) => {
      const { _id } = payload
      const newLikesPosts = state.reduce((acc, cur) => {
        if (cur._id === _id) {
          return [
            ...acc,
            {
              ...cur,
              content: payload.content,
              imageUrls: payload.imageUrls,
            },
          ]
        }

        return [...acc, cur]
      }, [])

      return newLikesPosts
    },
  },
  initialState,
)
