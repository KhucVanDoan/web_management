import { combineReducers } from 'redux'

import attributeMaintenance from './attribute-maintenance'
import attributeType from './attribute-type'
import commonManagement from './common'
import dashboard from './dashboard'
import defectList from './defect-list'
import defineDevice from './define-device'
import defineInstallTemplate from './define-installation-template'
import supplies from './define-supplies'
import deviceAssign from './device-assign'
import deviceCategory from './device-category'
import deviceStatus from './device-status-report'
import job from './job'
import maintainRequest from './maintain-request'
import maintainanceProgress from './maintainance-progress'
import maintenanceTeam from './maintenance-team'
import planList from './plan-list'
import requestDevice from './request-device'
import suppliesCategory from './supplies-category'
import suppliesRequest from './supplies-request'
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
  deviceAssign,
  supplies,
  maintenanceTeam,
  suppliesCategory,
  templateChecklist,
  maintainRequest,
  requestDevice,
  job,
  maintainanceProgress,
  planList,
  defectList,
  suppliesRequest,
  deviceStatus,
  attributeMaintenance,
})
