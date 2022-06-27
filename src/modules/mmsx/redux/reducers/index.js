import { combineReducers } from 'redux'

import commonManagement from './common'
import dashboard from './dashboard'

export default combineReducers({
  commonManagement,
  dashboard,
})
