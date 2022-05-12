// example
// https://github.com/reduxjs/reselect
// import { createSelector } from 'reselect'

// appReadySelector with multi sub selector
export const appReadySelector = state => state.appReady

export const loadingSelector = state => state.loading

export const darkModeSelector = state => state.darkMode

export const forgetPasswordStepSelector = state => state.forgetPassword.step
export const forgetPasswordEmailSelector = state => state.forgetPassword.email
export const forgetPasswordTokenSelector = state => state.forgetPassword.token
