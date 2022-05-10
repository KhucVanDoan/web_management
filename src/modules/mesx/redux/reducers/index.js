import { combineReducers } from 'redux'

import bomProducingStep from './bom-producing-step'
import calendar from './calendar'
import commonManagement from './common'
import dashboard from './dashboard'
import bom from './define-bom'
import defineBOQ from './define-boq'
import defineCustomer from './define-customer'
import defineMasterPlan from './master-plan'
import materialDetailPlan from './material-detail-plan'
import Mo from './mo'
import definePlan from './plan'
import planReport from './plan-report'
import PriceReport from './price-report'
import producingStep from './product-step'
import productivityCompareReport from './productivity-compare-report'
import productivityReport from './productivity-report'
import progressByWorkCenter from './progress-by-work-center'
import progressDetailReport from './progress-detail-report'
import progressManufacturingByOrder from './progress-manudacturing-by-order'
import purchasedOrder from './purchased-order'
import qualityReport from './quality-report'
import requestBuyMaterial from './request-buy-materials'
import defineRouting from './routing'
import userManagement from './user-management'
import userPermission from './user-permission'
import workCenter from './work-center'
import workCenterPlan from './work-center-plan'
import workOrder from './work-order'

export default combineReducers({
  userPermission,
  userManagement,
  commonManagement,
  definePlan,
  defineMasterPlan,
  defineRouting,
  defineCustomer,
  producingStep,
  defineBOQ,
  bom,
  qualityReport,
  planReport,
  workOrder,
  dashboard,
  workCenter,
  Mo,
  workCenterPlan,
  requestBuyMaterial,
  materialDetailPlan,
  productivityReport,
  bomProducingStep,
  calendar,
  PriceReport,
  progressDetailReport,
  productivityCompareReport,
  purchasedOrder,
  progressByWorkCenter,
  progressManufacturingByOrder,
})
