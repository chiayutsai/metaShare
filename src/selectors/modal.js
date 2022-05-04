import { createSelector } from 'reselect'
import POST_MODAL from 'constants/modal'

export const modalsSelector = state => state.modals

export const postModalSelector = createSelector(modalsSelector, modals =>
  modals.find(m => [POST_MODAL].includes(m.name)),
)
