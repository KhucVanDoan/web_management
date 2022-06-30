import { combineReducers } from 'redux'

import commonManagement from './common'
import dashboard from './dashboard'
import defineInstallTemplate from './define-installation-template'
import deviceCategory from './device-category'
export default combineReducers({
  commonManagement,
  dashboard,
  defineInstallTemplate,
  deviceCategory,
})
