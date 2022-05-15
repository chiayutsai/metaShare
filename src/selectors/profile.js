import { createSelector } from 'reselect'
import { userIdSelector } from 'selectors/user'

export const profileUserIdSelector = state => state.profile.userId
export const profileInfoSelector = state => state.profile.info
export const profileCoverImageSelector = state => state.profile.coverImage

export const profileIsAdmin = createSelector(
  userIdSelector,
  profileUserIdSelector,
  (userId, profileUserId) => userId === profileUserId,
)

export const profileEditSelector = state => state.profile.isEdit
export const profileEditLoadingSelector = state => state.profile.isEditLoading
export const profileEditPageSelector = state => state.profile.editPage

export const profileUploadLoadingSelector = state =>
  state.profile.isUploadLoading
