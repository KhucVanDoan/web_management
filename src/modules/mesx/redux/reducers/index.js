import bomProducingStep from './bom-producing-step'
import calendar from './calendar'
import commonManagement from './common'
import dashboard from './dashboard-store.reducer'
import bom from './define-bom'
import defineBOQ from './define-boq'
import defineCompany from './define-company'
import defineCustomer from './define-customer'
import defineItem from './define-item'
import detailSchedule from './detail-schedule'
import defineFactory from './factory'
import inventoryLimit from './inventory-limit.reducer'
import itemGroupSetting from './item-group-setting'
import itemTypeSetting from './item-type-setting'
import itemUnitSetting from './item-unit-setting'
import defineMasterPlan from './master-plan.reducer'
import materialDetailPlan from './material-detail-plan.reducer'
import Mo from './mo.reducer'
import planReport from './plan-report'
import definePlan from './plan.reducer'
import PriceReport from './price-report'
import producingStep from './product-step'
import productivityCompareReport from './productivity-compare'
import productivityReport from './productivity-report'
import qualityReport from './quality-report'
import requestBuyMaterial from './request-buy-materials'
import defineRouting from './routing'
import routingVersion from './routing-version.reducer'
import saleOrder from './sale-order'
import soExport from './so-export.reducer'
import userManagement from './user-management'
import userPermission from './user-permission'
import workCenter from './work-center'
import workCenterPlan from './work-center-plan.reducer'
import workOrder from './work-order'
const reducers = {
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
  PriceReport,
  productivityCompareReport,
}

export default reducers
