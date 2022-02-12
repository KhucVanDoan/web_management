// @TODO: rename all reducers files
import auth from '../../../auth/redux/reducers/auth'
import bomProducingStep from './bom-producing-step.reducer'
import commonManagement from './common'
import dashboard from './dashboard-store.reducer'
import bom from './define-bom.reducer'
import defineBOQ from './define-boq'
import defineCompany from './define-company'
import defineItem from './define-item.reducer'
import detailSchedule from './detail-schedule.reducer'
import defineFactory from './factory'
import producingStep from './index.reducer'
import inventoryLimit from './inventory-limit.reducer'
import itemGroupSetting from './item-group-setting'
import itemTypeSetting from './item-type-setting'
import itemUnitSetting from './item-unit-setting'
import materialDetailPlan from './material-detail-plan.reducer'
import Mo from './mo.reducer'
import planReport from './plan-report.reducer'
import definePlan from './plan.reducer'
import productivityReport from './productivity-report.reducer'
import qualityReport from './quality-report.reducer'
import requestBuyMaterial from './request-buy-materials.reducer'
import routingVersion from './routing-version.reducer'
import routing from './routing.reducer'
import saleOrder from './sale-order.reducer'
import soExport from './so-export.reducer'
import userManagement from './user-management'
import workCenterPlan from './work-center-plan.reducer'
import workCenter from './work-center.reducer'
import workOrder from './work-order.reducer'

const reducers = {
  userManagement,
  commonManagement,
  auth,
  defineItem,
  itemGroupSetting,
  itemUnitSetting,
  itemTypeSetting,
  definePlan,
  defineCompany,
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
  defineFactory,
  workCenterPlan,
  requestBuyMaterial,
  inventoryLimit,
  detailSchedule,
  materialDetailPlan,
  productivityReport,
  bomProducingStep,
}

export default reducers
