//@import: reducers files
import { combineReducers } from 'redux'

import commonManagement from './common'
import dashboard from './dashboard'
import defineActionGroup from './define-action-group'
import defineCauseGroup from './define-cause-group'
import defineCheckList from './define-check-list'
import defineErrorGroup from './define-error-group'
import defineErrorReport from './define-error-report'
import defineQualityAlert from './define-quality-alert'
import defineQualityPoint from './define-quality-point'
import inputQualityControlPlan from './input-quality-control-plan'
import outputQualityControlPlan from './output-quality-control-plan'
import productionQualityControlPlan from './production-quality-control-plan'
import qualityReport from './quality-report'
import transactionHistory from './transaction-history'
import workCenterQualityControlPlan from './work-center-quality-control-plan'

export default combineReducers({
  commonManagement,
  dashboard,
  defineErrorGroup,
  defineActionGroup,
  defineCauseGroup,
  defineErrorReport,
  defineCheckList,
  defineQualityPoint,
  defineQualityAlert,
  qualityReport,
  transactionHistory,
  inputQualityControlPlan,
  outputQualityControlPlan,
  productionQualityControlPlan,
  workCenterQualityControlPlan,
})
