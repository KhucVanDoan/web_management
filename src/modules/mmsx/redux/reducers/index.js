import { combineReducers } from 'redux'

import commonManagement from './common'
import dashboard from './dashboard'
import deviceCategory from './device-category'
export default combineReducers({
  commonManagement,
  dashboard,
  deviceCategory,
})
