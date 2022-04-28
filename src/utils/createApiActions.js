import { createActions } from 'redux-actions'

const createApiActions = prefix =>
  createActions({}, 'REQUEST', 'SUCCESS', 'FAILURE', {
    prefix,
    namespace: '_',
  })

export default createApiActions
