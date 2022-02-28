// @TODO: rename all reducers files
import auth from '../../../auth/redux/reducers/auth'
import bomProducingStep from './bom-producing-step'
import calendar from './calendar'
import commonManagement from './common'
import dashboard from './dashboard-store.reducer'
import bom from './define-bom'
import defineBOQ from './define-boq'
import defineCompany from './define-company'
import defineCustomer from './define-customer'
import defineItem from './define-item.reducer'
import detailSchedule from './detail-schedule.reducer'
import defineFactory from './factory'
import inventoryLimit from './inventory-limit.reducer'
import itemGroupSetting from './item-group-setting'
import itemTypeSetting from './item-type-setting'
import itemUnitSetting from './item-unit-setting'
import materialDetailPlan from './material-detail-plan.reducer'
import Mo from './mo.reducer'
import planReport from './plan-report.reducer'
import definePlan from './plan.reducer'
import producingStep from './product-step'
import productivityReport from './productivity-report.reducer'
import qualityReport from './quality-report.reducer'
import requestBuyMaterial from './request-buy-materials.reducer'
import defineRouting from './routing'
import routingVersion from './routing-version.reducer'
import saleOrder from './sale-order'
import soExport from './so-export.reducer'
import userManagement from './user-management'
import workCenter from './work-center'
import workCenterPlan from './work-center-plan.reducer'
import workOrder from './work-order'

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
  defineRouting,
  defineCustomer,
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
  calendar,
}

export default reducers
