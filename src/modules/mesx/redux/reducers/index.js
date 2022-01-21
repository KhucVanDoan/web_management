// @TODO: rename all reducers files
import userManagement from './user-management.reducer'
import auth from '../../../auth/redux/reducers/auth'
import itemGroupSetting from './item-group-setting.reducer'
import itemTypeSetting from './item-type-setting.reducer'
import itemUnitSetting from './item-unit-setting.reducer'
import defineItem from './define-item.reducer'
import producingStep from './index.reducer'
import commonManagement from './common.reducer'
import definePlan from './plan.reducer'
import routing from './routing.reducer'
import routingVersion from './routing-version.reducer'
import defineBOQ from './define-boq.reducer'
import bom from './define-bom.reducer'
import qualityReport from './quality-report.reducer'
import planReport from './plan-report.reducer'
import workOrder from './work-order.reducer'
import dashboard from './dashboard-store.reducer'
import workCenter from './work-center.reducer'
import Mo from './mo.reducer'
import Factory from './factory.reducer'
import workCenterPlan from './work-center-plan.reducer'

import saleOrder from './sale-order.reducer'
import soExport from './so-export.reducer'
import requestBuyMaterial from './request-buy-materials.reducer'
import inventoryLimit from './inventory-limit.reducer'
import detailSchedule from './detail-schedule.reducer'

import materialDetailPlan from './material-detail-plan.reducer'

import productivityReport from './productivity-report.reducer'
import bomProducingStep from './bom-producing-step.reducer'

const reducers = {
  userManagement,
  commonManagement,
  auth,
  defineItem,
  itemGroupSetting,
  itemUnitSetting,
  itemTypeSetting,
  definePlan,
  routing,
  routingVersion,
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
  soExport,
  Factory,
  workCenterPlan,
  requestBuyMaterial,
  inventoryLimit,
  detailSchedule,
  materialDetailPlan,
  productivityReport,
  bomProducingStep,
}

export default reducers
