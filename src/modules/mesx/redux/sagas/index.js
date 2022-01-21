// @TODO: rename all saga files
import { all } from 'redux-saga/effects'

// user-management
import watchCreateUser from './user-management/create-user.saga'
import watchDeleteUser from './user-management/delete-user.saga'
import watchGetUserDetails from './user-management/get-user-details.saga'
import watchSearchUsers from './user-management/search-users.saga'
import watchUpdateUser from './user-management/update-user.saga'
import watchGenerateOTP from './user-management/generate-otp.saga'
import watchVerifyOTP from './user-management/verify-otp-code.saga'
import watchResetPassword from './user-management/reset-password.saga'

// common
import watchGetCompanies from './common/get-company.saga'
import watchGetDepartments from './common/get-department.saga'
import watchGetFactoriesByCompany from './common/get-factory-by-company.saga'
import watchGetRoles from './common/get-role.saga'
import watchGetWarehousesByFactories from './common/get-warehouse-by-factory.saga'
import watchGetItems from './common/get-items.saga'
import watchGetWarehouses from './common/get-warehouses.saga'
import watchGetProducts from './common/get-products.saga'
import watchGetDetails from './common/get-details.saga'
import watchGetItemGroups from './common/get-item-groups.saga'
import watchGetItemTypes from './common/get-item-types.saga'
import watchGetItemUnits from './common/get-item-units.saga'
import watchGetAllItemDetails from './common/get-all-item-details.saga'
import watchGetCustomers from './common/get-customers.saga'
import watchGetVendors from './common/get-vendors.saga'
import watchGetProducingSteps from './common/get-producing-steps.saga'
import watchGetRoutings from './common/get-routings.saga'
import watchGetUsers from './common/get-users.saga'
import watchGetBoms from './common/get-boms.saga'
import watchGetFactories from './common/get-factories.saga'
import watchGetSaleOrders from './common/get-sale-orders.saga'
import watchGetQualityPoints from './common/get-all-quality-points.saga'
import watchGetItemQualityPoint from './common/get-item-quality-point.saga'

// quality-report
import watchQualityReportData from './quality-report/index.saga'
import watchExportQualityReportData from './quality-report/export.saga'
//item-group
import watchSearchItemGroups from './item-group-setting/search-item-groups.saga'
import watchCreateItemGroup from './item-group-setting/create-item-group.saga'
import watchUpdateItemGroup from './item-group-setting/update-item-group.saga'
import watchDeleteItemGroup from './item-group-setting/delete-item-group.saga'
import watchGetItemGroupDetails from './item-group-setting/get-item-group-details.saga'
//item-unit
import watchSearchItemUnits from './item-unit-setting/search-item-units.saga'
import watchCreateItemUnit from './item-unit-setting/create-item-unit.saga'
import watchUpdateItemUnit from './item-unit-setting/update-item-unit.saga'
import watchDeleteItemUnit from './item-unit-setting/delete-item-unit.saga'
import watchGetItemUnitDetails from './item-unit-setting/get-item-unit-details.saga'
//item-type
import watchSearchItemTypes from './item-type-setting/search-item-types.saga'
import watchCreateItemType from './item-type-setting/create-item-type.saga'
import watchUpdateItemType from './item-type-setting/update-item-type.saga'
import watchDeleteItemType from './item-type-setting/delete-item-type.saga'
import watchGetItemTypeDetails from './item-type-setting/get-item-type-details.saga'

// define-item
import watchSearchItems from './define-item/search-items.saga'
import watchCreateItem from './define-item/create-item.saga'
import watchUpdateItem from './define-item/update-item.saga'
import watchDeleteItem from './define-item/delete-item.saga'
import watchGetItemDetails from './define-item/get-item-details.saga'
import watchPrintQRItems from './define-item/print-qr-items'

//define-plan
import watchSearchPlans from './define-plan/search-plans.saga'
import watchGetPlanDetails from './define-plan/get-plan-details.saga'
import watchGetMoByPlan from './define-plan/get-mo-by-plan.saga'
import watchUpdatePlan from './define-plan/update-plan.saga'
import watchCreatePlan from './define-plan/create-plan.saga'
import watchConfirmPlan from './define-plan/confirm-plan.saga'
import watchDeletePlan from './define-plan/delete-plan.saga'
import watchExportPlanReport from './define-plan/export.saga'
// routing
import watchConfirmRouting from './routing/confirm-routing.saga'
import watchCreateRouting from './routing/create-routing.saga'
import watchDeleteRouting from './routing/delete-routing.saga'
import watchGetRoutingDetails from './routing/get-routing-details.saga'
import watchSearchRoutings from './routing/search-routings.saga'
import watchUpdateRouting from './routing/update-routing.saga'

// routing-version
import watchCreateRoutingVersion from './routing-version/create-routing-version.saga'
import watchDeleteRoutingVersion from './routing-version/delete-routing-version.saga'
import watchGetRoutingVersionDetails from './routing-version/get-routing-version-details.saga'
import watchSearchRoutingVersions from './routing-version/search-routing-version.saga'
import watchUpdateRoutingVersion from './routing-version/update-routing-version.saga'
import watchConfirmRoutingVersion from './routing-version/confirm-routing-version.saga'

// producing step
import watchSearchProducingSteps from './producing-steps/search.saga'
import watchUpdateProducingStep from './producing-steps/update.saga'
import watchGetProducingStepDetails from './producing-steps/get-detail.saga'
import watchCreateProducingStep from './producing-steps/create.saga'
import watchDeleteProducingStep from './producing-steps/delete.saga'
import watchGetProducingStepsByRoutingVersion from './producing-steps/get-by-routing-version.saga'
import watchConfirmProducingStep from './producing-steps/confirm.saga'

//define-boq
import watchSearchBOQ from './define-boq/search-boq.saga'
import watchCreateBOQ from './define-boq/create-boq.saga'
import watchUpdateBOQ from './define-boq/update-boq.saga'
import watchGetBOQDetails from './define-boq/get-boq-details.saga'
import watchDeleteBOQ from './define-boq/delete-boq.saga'
import watchConfirmBOQ from './define-boq/confirm-boq.saga'
import watchRejectBOQ from './define-boq/reject-boq.saga'

//define-bom
import watchSearchBOM from './define-bom/search-bom.saga'
import watchCreateBOM from './define-bom/create-bom.saga'
import watchUpdateBOM from './define-bom/update-bom.saga'
import watchGetBOMDetails from './define-bom/get-bom-details.saga'
import watchDeleteBOM from './define-bom/delete-bom.saga'
import watchConfirmBOM from './define-bom/confirm-bom.saga'
import watchRejectBOM from './define-bom/reject-bom.saga'
import watchGetBOMStructure from './define-bom/get-bom-structure.sage'
import watchGetBomByItem from './define-bom/get-bom-by-item.saga'

//work-order
import watchSearchWorkOrders from './work-order/search-work-orders.saga'
import watchCreateWorkOrder from './work-order/create-work-order.saga'
import watchUpdateWorkOrder from './work-order/update-work-order.saga'
import watchDeleteWorkOrder from './work-order/delete-work-order.saga'
import watchGetWorkOrderDetails from './work-order/get-work-order-details.saga'
import watchConfirmWorkOrder from './work-order/confirm-work-order.saga'
import watchGetBomDetails from './work-order/get-bom-details.saga'
import watchPrintQRWorkOrder from './work-order/print-qr-work-order'
import watchDashboard from './dashboard/dashboard.saga'

// work-center
import watchSearchWorkCenter from './work-center/search-work-center.saga'

// mo
import watchSearchMO from './mo/search-mo.saga'
import watchConfirmMO from './mo/confirm-mo.saga'
import watchCreateMO from './mo/create-mo.saga'
import watchDeleteMO from './mo/delete-mo.saga'
import watchGetMODetails from './mo/get-mo-details.saga'
import watchRejectMO from './mo/reject-mo.saga'
import watchUpdateMO from './mo/update-mo.saga'
import watchGetBOMProducingStepStructure from './mo/get-bom-producing-step-structure'

// work-center
import watchCreateWorkCenter from './work-center/create-work-center.saga'
import watchUpdateWorkCenter from './work-center/update-work-center.saga'
import watchDeleteWorkCenter from './work-center/delete-work-center.saga'
import watchGetWorkCenterDetails from './work-center/get-work-center-details.saga'
import watchConfirmWorkCenter from './work-center/confirm-work-center.saga'

// sale-order
import watchCreateSaleOrder from './sale-order/create-sale-order.saga'
import watchDeleteSaleOrder from './sale-order/delete-sale-order.saga'
import watchGetSaleOrderDetails from './sale-order/get-sale-order-details.saga'
import watchSearchSaleOrders from './sale-order/search-sale-orders.saga'
import watchUpdateSaleOrder from './sale-order/update-sale-order.saga'
import watchConfirmSaleOrder from './sale-order/confirm-sale-order.saga'
import watchRejectSaleOrder from './sale-order/reject-sale-order.saga'

// so-export
import watchSearchSOExport from './so-export/search-so-export.saga'
import watchCreateSOExport from './so-export/create-so-export.saga'
import watchConfirmSOExport from './so-export/confirm-so-export.saga'
import watchDeleteSOExport from './so-export/delete-so-export.saga'
import watchGetSOExportDetails from './so-export/get-so-export-details.saga'
import watchUpdateSOExport from './so-export/update-so-export.saga'
import watchRejectSOExport from './so-export/reject-so-export.saga'

// quality-point
import watchGetQualityPointDetails from './common/get-quality-point-details.saga'
import watchSearchQualityPoints from './common/search-quality-points.saga'

// factory
import watchSearchFactories from './factory/search-factories.saga'
import watchCreateFactory from './factory/create-factory.saga'
import watchUpdateFactory from './factory/update-factory.saga'
import watchDeleteFactory from './factory/delete-factory.saga'
import watchGetFactoryDetails from './factory/get-factory-details.saga'

// work-center-plan
import watchSearchWorkCenterPlan from './work-center-plan/search-work-center-plan.saga'
import watchCreateWorkCenterPlan from './work-center-plan/create-work-center-plan.saga'
import watchUpdateWorkCenterPlan from './work-center-plan/update-work-center-plan.saga'
import watchDeleteWorkCenterPlan from './work-center-plan/delete-work-center-plan.saga'
import watchGetWorkCenterPlanDetail from './work-center-plan/get-work-center-plan-detail.saga'
import watchGenerateWorkCenterPlan from './work-center-plan/generate-work-center-plan.saga'
import watchConfirmWorkCenterPlan from './work-center-plan/confirm-work-center-plan.saga'

// request-buy-materail
import watchConfirmRequestBuyMaterial from './request-buy-material/confirm-request-buy-material.saga'
import watchDeleteRequestBuyMaterial from './request-buy-material/delete-request-buy-material.saga'
import watchGetRequestBuyMaterialDetails from './request-buy-material/get-request-buy-material-details.saga'
import watchUpdateRequestBuyMaterial from './request-buy-material/update-request-buy-material.saga'
import watchPrintQRRequestBuyMaterial from './request-buy-material/print-qr-request-buy-material.saga'
import watchSearchRequestBuyMaterial from './request-buy-material/search-request-buy-materials.saga'
import watchRejectRequestBuyMaterial from './request-buy-material/reject-request-material.saga'

//item-group
import watchSearchInventoryLimits from './inventory-limit/search-inventory-limits.saga'
import watchCreateInventoryLimit from './inventory-limit/create-inventory-limit.saga'
import watchUpdateInventoryLimit from './inventory-limit/update-item-group.saga'
import watchDeleteInventoryLimit from './inventory-limit/delete-inventory-limit.saga'
import watchGetInventoryLimitDetails from './inventory-limit/get-inventory-limit-details.saga'

// detail schedule
import watchSearchDetailSchedule from './detail-schedule/search-detail-schedule.saga'
import watchCreateDetailSchedule from './detail-schedule/create-detail-schedule.saga'
import watchUpdateDetailSchedule from './detail-schedule/update-detail-schedule.saga'
import watchGetDetailScheduleDetails from './detail-schedule/get-schedule-details.saga'
import watchApproveDetailSchedule from './detail-schedule/approve-detail-schedule.saga'
import watchRejectDetailSchedule from './detail-schedule/reject-detail-schedule.saga'
import watchGenerateDetailSchedule from './detail-schedule/generate-detail-schedule.saga'

// search material detail plan
import watchSearchMaterialDetailPlan from './material-detail-plan/search.saga'

//productivities report
import watchGetDataProductivityReport from './productivity-report/get-data-productivity-report.saga'

//bom producing step
import watchSearchBomProducingStep from './bom-producing-step/search-bom-producing-step.saga'
import watchConfirmBomProducingStep from './bom-producing-step/confirm-bom-producing-step.saga'
import watchDeleteBomProducingStep from './bom-producing-step/delete-bom-producing-step.saga'
import watchGetBomProducingStepDetails from './bom-producing-step/get-bom-producing-step-details.saga'
import watchCreateBomProducingStep from './bom-producing-step/create-bom-producing-step.saga'
import watchUpdateBomProducingStep from './bom-producing-step/update-bom-producing-step.saga'

//check material plan
import watchCheckMaterialPlan from './mo/check-material-plan.saga'

//create purchased order
import watchCreatePurchasedOrder from './common/create-purchased-order.saga'

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
    watchPrintQRItems(),

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
    watchGetBomProducingStepDetails(),
    watchUpdateBomProducingStep(),

    //check material plan
    watchCheckMaterialPlan(),

    //create purchased order
    watchCreatePurchasedOrder(),
  ])
}
