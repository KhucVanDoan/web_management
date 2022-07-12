import { combineReducers } from 'redux'

import attributeType from './attribute-type'
import commonManagement from './common'
import dashboard from './dashboard'
import defineDevice from './define-device'
import defineInstallTemplate from './define-installation-template'
import supplies from './define-supplies'
import deviceCategory from './device-category'
import job from './job'
import maintainRequest from './maintain-request'
import maintenanceTeam from './maintenance-team'
import suppliesCategory from './supplies-category'
import templateChecklist from './template-checklist'
import warningSystem from './warning-system'
export default combineReducers({
  commonManagement,
  dashboard,
  warningSystem,
  defineInstallTemplate,
  deviceCategory,
  attributeType,
  defineDevice,
  supplies,
  maintenanceTeam,
  suppliesCategory,
  templateChecklist,
  maintainRequest,
  job,
})
