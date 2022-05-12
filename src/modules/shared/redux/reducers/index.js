import { combineReducers } from 'redux'

import appStore from './app-store'
import notification from './notification'

export default combineReducers({
  appStore,
  notification,
})
