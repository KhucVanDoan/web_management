import { combineReducers } from 'redux'

import bomProducingStep from './bom-producing-step'
import calendar from './calendar'
import commonManagement from './common'
import dashboard from './dashboard'
import bom from './define-bom'
import defineBOQ from './define-boq'
import defineCompany from './define-company'
import defineCustomer from './define-customer'
import defineItem from './define-item'
import defineFactory from './factory'
import itemGroupSetting from './item-group-setting'
import itemTypeSetting from './item-type-setting'
import itemUnitSetting from './item-unit-setting'
import defineMasterPlan from './master-plan'
import materialDetailPlan from './material-detail-plan.reducer'
import Mo from './mo'
import planReport from './plan-report'
import definePlan from './plan.reducer'
import PriceReport from './price-report'
import producingStep from './product-step'
import productivityReport from './productivity-report'
import progressDetailReport from './progress-detail-report'
import qualityReport from './quality-report'
import requestBuyMaterial from './request-buy-materials'
import defineRouting from './routing'
import saleOrder from './sale-order'
import userManagement from './user-management'
import userPermission from './user-permission'
import workCenter from './work-center'
import workCenterPlan from './work-center-plan.reducer'
import workOrder from './work-order'
export default combineReducers({
  userPermission,
  userManagement,
  commonManagement,
  defineItem,
  itemGroupSetting,
  itemUnitSetting,
  itemTypeSetting,
  definePlan,
  defineMasterPlan,
  defineCompany,
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
  saleOrder,
  defineFactory,
  workCenterPlan,
  requestBuyMaterial,
  materialDetailPlan,
  productivityReport,
  bomProducingStep,
  calendar,
  PriceReport,
  progressDetailReport,
})
