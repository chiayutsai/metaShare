import { createSelector } from 'reselect'

export const followSelector = state => state.follow

export const followingSelector = state => state.follow.following
export const followerSelector = state => state.follow.follower

export const followingCountSelector = createSelector(
  followingSelector,
  following => following.length,
)

export const followerCountSelector = createSelector(
  followerSelector,
  follower => follower.length,
)
