// @TODO: rename all saga files
import { all } from 'redux-saga/effects'

import watchConfirmBomProducingStep from './bom-producing-step/confirm-bom-producing-step.saga'
import watchCreateBomProducingStep from './bom-producing-step/create-bom-producing-step.saga'
import watchDeleteBomProducingStep from './bom-producing-step/delete-bom-producing-step.saga'
import watchGetBomProducingStep from './bom-producing-step/get-bom-producing-step'
import watchGetBomProducingStepDetails from './bom-producing-step/get-bom-producing-step-details'
import watchSearchBomProducingStep from './bom-producing-step/search-bom-producing-step.saga'
import watchUpdateBomProducingStep from './bom-producing-step/update-bom-producing-step.saga'
import {
  watchGetDetailFactoryCalendar,
  watchGetListFactoryCalendar,
  watchUpdateFactoryCalendar,
  watchCreateFactoryCalendar,
} from './calendar'
import watchCreatePurchasedOrder from './common/create-purchased-order.saga'
import watchGetAllItemDetails from './common/get-all-item-details.saga'
import watchGetQualityPoints from './common/get-all-quality-points.saga'
import watchGetBoms from './common/get-boms.saga'
import watchGetCompanies from './common/get-company.saga'
import watchGetCustomers from './common/get-customers.saga'
import watchGetDepartments from './common/get-department.saga'
import watchGetDetails from './common/get-details.saga'
import watchGetFactories from './common/get-factories.saga'
import watchGetFactoriesByCompany from './common/get-factory-by-company.saga'
import watchGetItemGroups from './common/get-item-groups.saga'
import watchGetItemQualityPoint from './common/get-item-quality-point.saga'
import watchGetItemTypes from './common/get-item-types.saga'
import watchGetItemUnits from './common/get-item-units.saga'
import watchGetItems from './common/get-items.saga'
import watchGetProducingSteps from './common/get-producing-steps.saga'
import watchGetProducts from './common/get-products.saga'
import watchGetQualityPointDetails from './common/get-quality-point-details.saga'
import watchGetRoles from './common/get-role.saga'
import watchGetRoutings from './common/get-routings'
import watchGetSaleOrders from './common/get-sale-orders.saga'
import watchGetUsers from './common/get-users.saga'
import watchGetVendors from './common/get-vendors.saga'
import watchGetWarehousesByFactories from './common/get-warehouse-by-factory.saga'
import watchGetWarehousesSector from './common/get-warehouses-sector.saga'
import watchGetWarehousesShelf from './common/get-warehouses-shelf.saga'
import watchGetWarehouses from './common/get-warehouses.saga'
import watchSearchQualityPoints from './common/search-quality-points.saga'
import watchDashboard from './dashboard/dashboard.saga'
import watchConfirmBOM from './define-bom/confirm-bom'
import watchCreateBOM from './define-bom/create-bom'
import watchDeleteBOM from './define-bom/delete-bom'
import watchGetBomByItem from './define-bom/get-bom-by-item'
import watchGetBOMDetails from './define-bom/get-bom-details'
import watchGetBOMStructure from './define-bom/get-bom-structure'
import watchRejectBOM from './define-bom/reject-bom'
import watchSearchBOM from './define-bom/search-bom'
import watchUpdateBOM from './define-bom/update-bom'
import watchConfirmBOQ from './define-boq/confirm-boq.saga'
import watchCreateBOQ from './define-boq/create-boq.saga'
import watchDeleteBOQ from './define-boq/delete-boq.saga'
import watchGetBOQDetails from './define-boq/get-boq-details.saga'
import watchRejectBOQ from './define-boq/reject-boq.saga'
import watchSearchBOQ from './define-boq/search-boq.saga'
import watchUpdateBOQ from './define-boq/update-boq.saga'
import watchCreateCompany from './define-company/create-company'
import watchDeleteCompany from './define-company/delete-company'
import watchGetCompanyDetails from './define-company/get-company-details'
import watchSearchCompanies from './define-company/search-companies'
import watchUpdateCompany from './define-company/update-company'
import watchCreateCustomer from './define-customer/create-customer'
import watchDeleteCustomer from './define-customer/delete-customer'
import watchGetCustomerDetails from './define-customer/get-customer-details'
import watchSearchCustomers from './define-customer/search-customers'
import watchUpdateCustomer from './define-customer/update-customer'
import watchCreateItem from './define-item/create-item.saga'
import watchDeleteItem from './define-item/delete-item.saga'
import watchGetItemDetails from './define-item/get-item-details.saga'
import watchSearchItems from './define-item/search-items.saga'
import watchUpdateItem from './define-item/update-item.saga'
import watchCreateMasterPlan from './define-master-plan/create-master-plan.saga'
import watchExtendDeadline from './define-master-plan/extend-deadline.saga'
import watchGetMasterPlanDetails from './define-master-plan/get-master-plan-details.saga'
import watchGetModerationSuggestSpread from './define-master-plan/get-moderation-suggest-spread.saga'
import watchGetProducingStepDetail from './define-master-plan/get-producing-step-detail.saga'
import watchSearchMasterPlans from './define-master-plan/search-master-plans.saga'
import watchSubmitModerationInput from './define-master-plan/submit-moderation-input.saga'
import watchConfirmPlan from './define-plan/confirm-plan.saga'
import watchCreatePlan from './define-plan/create-plan.saga'
import watchDeletePlan from './define-plan/delete-plan.saga'
import watchExportPlanReport from './define-plan/export.saga'
import watchGetMoByPlan from './define-plan/get-mo-by-plan.saga'
import watchGetPlanDetails from './define-plan/get-plan-details.saga'
import watchSearchPlans from './define-plan/search-plans.saga'
import watchUpdatePlan from './define-plan/update-plan.saga'
import watchApproveDetailSchedule from './detail-schedule/approve-detail-schedule.saga'
import watchCreateDetailSchedule from './detail-schedule/create-detail-schedule.saga'
import watchGenerateDetailSchedule from './detail-schedule/generate-detail-schedule.saga'
import watchGetDetailScheduleDetails from './detail-schedule/get-schedule-details.saga'
import watchRejectDetailSchedule from './detail-schedule/reject-detail-schedule.saga'
import watchSearchDetailSchedule from './detail-schedule/search-detail-schedule.saga'
import watchUpdateDetailSchedule from './detail-schedule/update-detail-schedule.saga'
import watchCreateFactory from './factory/create-factory.saga'
import watchDeleteFactory from './factory/delete-factory.saga'
import watchGetFactoryDetails from './factory/get-factory-details.saga'
import watchSearchFactories from './factory/search-factories.saga'
import watchUpdateFactory from './factory/update-factory.saga'
import watchCreateInventoryLimit from './inventory-limit/create-inventory-limit.saga'
import watchDeleteInventoryLimit from './inventory-limit/delete-inventory-limit.saga'
import watchGetInventoryLimitDetails from './inventory-limit/get-inventory-limit-details.saga'
import watchSearchInventoryLimits from './inventory-limit/search-inventory-limits.saga'
import watchUpdateInventoryLimit from './inventory-limit/update-item-group.saga'
import watchCreateItemGroup from './item-group-setting/create-item-group'
import watchDeleteItemGroup from './item-group-setting/delete-item-group'
import watchGetItemGroupDetails from './item-group-setting/get-item-group-details'
import watchSearchItemGroups from './item-group-setting/search-item-groups'
import watchUpdateItemGroup from './item-group-setting/update-item-group'
import watchCreateItemType from './item-type-setting/create-item-type'
import watchDeleteItemType from './item-type-setting/delete-item-type'
import watchGetItemTypeDetails from './item-type-setting/get-item-type-details'
import watchSearchItemTypes from './item-type-setting/search-item-types'
import watchUpdateItemType from './item-type-setting/update-item-type'
import watchCreateItemUnit from './item-unit-setting/create-item-unit'
import watchDeleteItemUnit from './item-unit-setting/delete-item-unit'
import watchGetItemUnitDetails from './item-unit-setting/get-item-unit-details'
import watchSearchItemUnits from './item-unit-setting/search-item-units'
import watchUpdateItemUnit from './item-unit-setting/update-item-unit'
import watchSearchMaterialDetailPlan from './material-detail-plan/search.saga'
import watchCheckMaterialPlan from './mo/check-material-plan.saga'
import watchConfirmMO from './mo/confirm-mo.saga'
import watchCreateMO from './mo/create-mo.saga'
import watchDeleteMO from './mo/delete-mo.saga'
import watchGetBOMProducingStepStructure from './mo/get-bom-producing-step-structure'
import watchGetListMoProducingStepById from './mo/get-list-mo-producing-step-by-id'
import watchGetMODetails from './mo/get-mo-details.saga'
import watchGetMOItems from './mo/get-mo-items.saga'
import watchGetPriceStructure from './mo/get-price-structure.saga'
import watchRejectMO from './mo/reject-mo.saga'
import watchSearchMO from './mo/search-mo.saga'
import watchUpdateMO from './mo/update-mo.saga'
import watchGetPriceReport from './price-report/get-price-report.saga'
import watchConfirmProducingStep from './producing-steps/confirm'
import watchCreateProducingStep from './producing-steps/create'
import watchDeleteProducingStep from './producing-steps/delete'
import watchGetProducingStepsByRoutingVersion from './producing-steps/get-by-routing-version'
import watchGetProducingStepDetails from './producing-steps/get-detail'
import watchSearchProducingSteps from './producing-steps/search'
import watchUpdateProducingStep from './producing-steps/update'
import watchGetDataProductivityReport from './productivity-report/get-data-productivity-report'
import watchExportQualityReportData from './quality-report/export.saga'
import watchQualityReportData from './quality-report/index.saga'
import watchConfirmRequestBuyMaterial from './request-buy-material/confirm-request-buy-material'
import watchDeleteRequestBuyMaterial from './request-buy-material/delete-request-buy-material'
import watchGetRequestBuyMaterialDetails from './request-buy-material/get-request-buy-material-details'
import watchPrintQRRequestBuyMaterial from './request-buy-material/print-qr-request-buy-material'
import watchRejectRequestBuyMaterial from './request-buy-material/reject-request-material'
import watchSearchRequestBuyMaterial from './request-buy-material/search-request-buy-materials'
import watchUpdateRequestBuyMaterial from './request-buy-material/update-request-buy-material'
import watchConfirmRoutingVersion from './routing-version/confirm-routing-version.saga'
import watchCreateRoutingVersion from './routing-version/create-routing-version.saga'
import watchDeleteRoutingVersion from './routing-version/delete-routing-version.saga'
import watchGetRoutingVersionDetails from './routing-version/get-routing-version-details.saga'
import watchSearchRoutingVersions from './routing-version/search-routing-version.saga'
import watchUpdateRoutingVersion from './routing-version/update-routing-version.saga'
import watchConfirmRouting from './routing/confirm-routing'
import watchCreateRouting from './routing/create-routing'
import watchDeleteRouting from './routing/delete-routing'
import watchGetRoutingDetails from './routing/get-routing-details'
import watchSearchRoutings from './routing/search-routings'
import watchUpdateRouting from './routing/update-routing'
import watchConfirmSaleOrder from './sale-order/confirm-sale-order'
import watchCreateSaleOrder from './sale-order/create-sale-order'
import watchDeleteSaleOrder from './sale-order/delete-sale-order'
import watchGetSaleOrderDetails from './sale-order/get-sale-order-details'
import watchRejectSaleOrder from './sale-order/reject-sale-order'
import watchSearchSaleOrders from './sale-order/search-sale-orders'
import watchUpdateSaleOrder from './sale-order/update-sale-order'
import watchConfirmSOExport from './so-export/confirm-so-export.saga'
import watchCreateSOExport from './so-export/create-so-export.saga'
import watchDeleteSOExport from './so-export/delete-so-export.saga'
import watchGetSOExportDetails from './so-export/get-so-export-details.saga'
import watchRejectSOExport from './so-export/reject-so-export.saga'
import watchSearchSOExport from './so-export/search-so-export.saga'
import watchUpdateSOExport from './so-export/update-so-export.saga'
import watchCreateUser from './user-management/create-user'
import watchDeleteUser from './user-management/delete-user'
import watchGenerateOTP from './user-management/generate-otp'
import watchGetUserDetails from './user-management/get-user-details'
import watchResetPassword from './user-management/reset-password'
import watchSearchUsers from './user-management/search-users'
import watchUpdateUser from './user-management/update-user'
import watchVerifyOTP from './user-management/verify-otp-code'
import watchConfirmWorkCenterPlan from './work-center-plan/confirm-work-center-plan.saga'
import watchCreateWorkCenterPlan from './work-center-plan/create-work-center-plan.saga'
import watchDeleteWorkCenterPlan from './work-center-plan/delete-work-center-plan.saga'
import watchGenerateWorkCenterPlan from './work-center-plan/generate-work-center-plan.saga'
import watchGetWorkCenterPlanDetail from './work-center-plan/get-work-center-plan-detail.saga'
import watchSearchWorkCenterPlan from './work-center-plan/search-work-center-plan.saga'
import watchUpdateWorkCenterPlan from './work-center-plan/update-work-center-plan.saga'
import watchConfirmWorkCenter from './work-center/confirm-work-center.saga'
import watchCreateWorkCenter from './work-center/create-work-center.saga'
import watchDeleteWorkCenter from './work-center/delete-work-center.saga'
import watchGetWorkCenterDetails from './work-center/get-work-center-details.saga'
import watchSearchWorkCenter from './work-center/search-work-center.saga'
import watchUpdateWorkCenter from './work-center/update-work-center.saga'
import watchConfirmWorkOrder from './work-order/confirm-work-order.saga'
import watchCreateWorkOrder from './work-order/create-work-order.saga'
import watchDeleteWorkOrder from './work-order/delete-work-order.saga'
import watchGetBomDetails from './work-order/get-bom-details.saga'
import watchGetWorkOrderDetails from './work-order/get-work-order-details.saga'
import watchPrintQRWorkOrder from './work-order/print-qr-work-order'
import watchSearchWorkOrders from './work-order/search-work-orders.saga'
import watchUpdateWorkOrder from './work-order/update-work-order.saga'
/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    watchQualityReportData(),
    watchExportQualityReportData(),
    // user-management
    watchSearchUsers(),
    watchCreateUser(),
    watchUpdateUser(),
    watchDeleteUser(),
    watchGetUserDetails(),
    watchGenerateOTP(),
    watchVerifyOTP(),
    watchResetPassword(),

    // item-group-setting
    watchSearchItemGroups(),
    watchCreateItemGroup(),
    watchUpdateItemGroup(),
    watchDeleteItemGroup(),
    watchGetItemGroupDetails(),

    // item-type-setting
    watchSearchItemTypes(),
    watchCreateItemType(),
    watchUpdateItemType(),
    watchDeleteItemType(),
    watchGetItemTypeDetails(),

    // item-unit-setting
    watchSearchItemUnits(),
    watchCreateItemUnit(),
    watchUpdateItemUnit(),
    watchDeleteItemUnit(),
    watchGetItemUnitDetails(),

    // define-item
    watchSearchItems(),
    watchCreateItem(),
    watchUpdateItem(),
    watchDeleteItem(),
    watchGetItemDetails(),

    //define-boq
    watchSearchBOQ(),
    watchCreateBOQ(),
    watchUpdateBOQ(),
    watchGetBOQDetails(),
    watchDeleteBOQ(),
    watchConfirmBOQ(),
    watchRejectBOQ(),

    //define-bom
    watchSearchBOM(),
    watchCreateBOM(),
    watchUpdateBOM(),
    watchGetBOMDetails(),
    watchDeleteBOM(),
    watchConfirmBOM(),
    watchRejectBOM(),
    watchGetBOMStructure(),
    watchGetBomByItem(),
    watchGetBOMProducingStepStructure(),

    //define-company
    watchSearchCompanies(),
    watchCreateCompany(),
    watchUpdateCompany(),
    watchGetCompanyDetails(),
    watchDeleteCompany(),

    //define-customer
    watchSearchCustomers(),
    watchCreateCustomer(),
    watchUpdateCustomer(),
    watchGetCustomerDetails(),
    watchDeleteCustomer(),

    // common
    watchGetCompanies(),
    watchGetFactoriesByCompany(),
    watchGetRoles(),
    watchGetDepartments(),
    watchGetWarehousesByFactories(),
    watchGetDetails(),
    watchGetItemGroups(),
    watchGetItemTypes(),
    watchGetItemUnits(),
    watchGetItems(),
    watchGetWarehouses(),
    watchGetWarehousesSector(),
    watchGetWarehousesShelf(),
    watchGetCustomers(),
    watchGetVendors(),
    watchGetAllItemDetails(),
    watchGetProducts(),
    watchGetProducingSteps(),
    watchGetRoutings(),
    watchGetUsers(),
    watchGetBoms(),
    watchGetFactories(),
    watchGetSaleOrders(),
    watchGetQualityPoints(),
    watchGetItemQualityPoint(),

    //routing
    watchConfirmRouting(),
    watchCreateRouting(),
    watchDeleteRouting(),
    watchGetRoutingDetails(),
    watchSearchRoutings(),
    watchUpdateRouting(),

    //routing-version
    watchCreateRoutingVersion(),
    watchDeleteRoutingVersion(),
    watchGetRoutingVersionDetails(),
    watchSearchRoutingVersions(),
    watchUpdateRoutingVersion(),
    watchConfirmRoutingVersion(),

    // define plan
    watchSearchPlans(),
    watchGetPlanDetails(),
    watchGetMoByPlan(),
    watchCreatePlan(),
    watchUpdatePlan(),
    watchConfirmPlan(),
    watchDeletePlan(),
    watchExportPlanReport(),

    // define master plan
    watchSearchMasterPlans(),
    watchGetMasterPlanDetails(),
    watchGetModerationSuggestSpread(),
    watchCreateMasterPlan(),
    watchSubmitModerationInput(),
    watchExtendDeadline(),
    watchGetProducingStepDetail(),

    // producing step
    watchSearchProducingSteps(),
    watchUpdateProducingStep(),
    watchGetProducingStepDetails(),
    watchCreateProducingStep(),
    watchDeleteProducingStep(),
    watchGetProducingSteps(),
    watchGetProducingStepsByRoutingVersion(),
    watchConfirmProducingStep(),

    //work-order
    watchSearchWorkOrders(),
    watchCreateWorkOrder(),
    watchUpdateWorkOrder(),
    watchDeleteWorkOrder(),
    watchGetWorkOrderDetails(),
    watchConfirmWorkOrder(),
    watchGetBomDetails(),
    watchPrintQRWorkOrder(),

    watchDashboard(),

    //work-center
    watchSearchWorkCenter(),
    watchCreateWorkCenter(),
    watchUpdateWorkCenter(),
    watchDeleteWorkCenter(),
    watchConfirmWorkCenter(),
    watchGetWorkCenterDetails(),
    watchGenerateWorkCenterPlan(),
    watchConfirmWorkCenterPlan(),

    // mo
    watchSearchMO(),
    watchConfirmMO(),
    watchCreateMO(),
    watchDeleteMO(),
    watchGetMODetails(),
    watchRejectMO(),
    watchUpdateMO(),
    watchGetListMoProducingStepById(),
    watchGetPriceStructure(),
    watchGetMOItems(),

    // sale-order
    watchSearchSaleOrders(),
    watchCreateSaleOrder(),
    watchUpdateSaleOrder(),
    watchDeleteSaleOrder(),
    watchGetSaleOrderDetails(),
    watchConfirmSaleOrder(),
    watchRejectSaleOrder(),

    // so-export
    watchSearchSOExport(),
    watchUpdateSOExport(),
    watchRejectSOExport(),
    watchGetSOExportDetails(),
    watchDeleteSOExport(),
    watchCreateSOExport(),
    watchConfirmSOExport(),

    // quality-point
    watchSearchQualityPoints(),
    watchGetQualityPointDetails(),

    //price-report
    watchGetPriceReport(),
    // factory
    watchSearchFactories(),
    watchCreateFactory(),
    watchUpdateFactory(),
    watchDeleteFactory(),
    watchGetFactoryDetails(),

    //work-center-plan
    watchSearchWorkCenterPlan(),
    watchCreateWorkCenterPlan(),
    watchUpdateWorkCenterPlan(),
    watchDeleteWorkCenterPlan(),
    watchGetWorkCenterPlanDetail(),
    // request-buy-material
    watchConfirmRequestBuyMaterial(),
    watchDeleteRequestBuyMaterial(),
    watchUpdateRequestBuyMaterial(),
    watchGetRequestBuyMaterialDetails(),
    watchSearchRequestBuyMaterial(),
    watchRejectRequestBuyMaterial(),
    watchPrintQRRequestBuyMaterial(),

    // item-group-setting
    watchSearchInventoryLimits(),
    watchCreateInventoryLimit(),
    watchUpdateInventoryLimit(),
    watchDeleteInventoryLimit(),
    watchGetInventoryLimitDetails(),

    //detail schedule
    watchSearchDetailSchedule(),
    watchCreateDetailSchedule(),
    watchUpdateDetailSchedule(),
    watchGetDetailScheduleDetails(),
    watchApproveDetailSchedule(),
    watchRejectDetailSchedule(),
    watchGenerateDetailSchedule(),

    // search material detail plan
    watchSearchMaterialDetailPlan(),

    //productivities report
    watchGetDataProductivityReport(),

    //bom producing step
    watchSearchBomProducingStep(),
    watchConfirmBomProducingStep(),
    watchDeleteBomProducingStep(),
    watchCreateBomProducingStep(),
    watchGetBomProducingStep(),
    watchGetBomProducingStepDetails(),
    watchUpdateBomProducingStep(),

    //check material plan
    watchCheckMaterialPlan(),

    //create purchased order
    watchCreatePurchasedOrder(),

    //calendar
    watchGetListFactoryCalendar(),
    watchUpdateFactoryCalendar(),
    watchGetDetailFactoryCalendar(),
    watchCreateFactoryCalendar(),
  ])
}
