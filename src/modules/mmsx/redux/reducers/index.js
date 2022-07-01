import { combineReducers } from 'redux'

import commonManagement from './common'
import dashboard from './dashboard'
import defineInstallTemplate from './define-installation-template'
import deviceCategory from './device-category'
import maintenanceTeam from './maintenance-team'
import suppliesCategory from './supplies-category'
import warningSystem from './warning-system'
export default combineReducers({
  commonManagement,
  dashboard,
  warningSystem,
  defineInstallTemplate,
  deviceCategory,
  maintenanceTeam,
  suppliesCategory,
})
