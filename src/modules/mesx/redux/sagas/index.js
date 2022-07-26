import { all } from 'redux-saga/effects'

import watchGetSaleOrderDetailByIds from '~/modules/database/redux/sagas/sale-order/get-sale-order-details'

import watchConfirmBomProducingStep from './bom-producing-step/confirm-bom-producing-step'
import watchCreateBomProducingStep from './bom-producing-step/create-bom-producing-step'
import watchDeleteBomProducingStep from './bom-producing-step/delete-bom-producing-step'
import watchGetBomProducingStep from './bom-producing-step/get-bom-producing-step'
import watchGetBomProducingStepDetails from './bom-producing-step/get-bom-producing-step-details'
import watchSearchBomProducingStep from './bom-producing-step/search-bom-producing-step'
import watchUpdateBomProducingStep from './bom-producing-step/update-bom-producing-step'
import {
  watchGetDetailFactoryEvent,
  watchGetListFactoryCalendar,
  watchUpdateFactoryCalendar,
  watchCreateFactoryCalendar,
  watchCreateFactoryCalendarSetup,
  watchGetListFactoryEvent,
  watchGetDetailFactoryCalendar,
} from './calendar'
import watchGetAllItemDetails from './common/get-all-item-details'
import watchGetQualityPoints from './common/get-all-quality-points'
import watchGetBoms from './common/get-boms'
import watchGetCompanies from './common/get-company'
import watchGetCustomers from './common/get-customers'
import watchGetDepartments from './common/get-department'
import watchGetDepartmentsRole from './common/get-departments-role'
import watchGetDetails from './common/get-details'
import watchGetFactories from './common/get-factories'
import watchGetFactoriesByCompany from './common/get-factory-by-company'
import watchGetGroupPermissions from './common/get-group-permissions'
import watchGetItemGroups from './common/get-item-groups'
import watchGetItemQualityPoint from './common/get-item-quality-point'
import watchGetItemTypes from './common/get-item-types'
import watchGetItemUnits from './common/get-item-units'
import watchGetItems from './common/get-items'
import watchGetProducingSteps from './common/get-producing-steps'
import watchGetQualityPointDetails from './common/get-quality-point-details'
import watchGetRoles from './common/get-role'
import watchGetSaleOrders from './common/get-sale-orders'
import watchGetVendors from './common/get-vendors'
import watchGetWarehousesByFactories from './common/get-warehouse-by-factory'
import watchGetWarehouses from './common/get-warehouses'
import watchSearchQualityPoints from './common/search-quality-points'
import watchDashboard from './dashboard'
import watchConfirmBOM from './define-bom/confirm-bom'
import watchCreateBOM from './define-bom/create-bom'
import watchDeleteBOM from './define-bom/delete-bom'
import watchGetBomByItem from './define-bom/get-bom-by-item'
import watchGetBOMDetails from './define-bom/get-bom-details'
import watchGetBOMStructure from './define-bom/get-bom-structure'
import watchRejectBOM from './define-bom/reject-bom'
import watchSearchBOM from './define-bom/search-bom'
import watchUpdateBOM from './define-bom/update-bom'
import watchConfirmBOQ from './define-boq/confirm-boq'
import watchCreateBOQ from './define-boq/create-boq'
import watchDeleteBOQ from './define-boq/delete-boq'
import watchGetBOQDetails from './define-boq/get-boq-details'
import watchRejectBOQ from './define-boq/reject-boq'
import watchSearchBOQ from './define-boq/search-boq'
import watchUpdateBOQ from './define-boq/update-boq'
import watchCreateCustomer from './define-customer/create-customer'
import watchDeleteCustomer from './define-customer/delete-customer'
import watchGetCustomerDetails from './define-customer/get-customer-details'
import watchSearchCustomers from './define-customer/search-customers'
import watchUpdateCustomer from './define-customer/update-customer'
import watchApproveMasterPlan from './define-master-plan/approve-master-plan'
import watchCreateMasterPlan from './define-master-plan/create-master-plan'
import watchDeleteMasterPlan from './define-master-plan/delete-master-plan'
import watchExtendDeadline from './define-master-plan/extend-deadline'
import watchJobDetails from './define-master-plan/get-job-detail'
import watchGetMasterPlanDetails from './define-master-plan/get-master-plan-details'
import watchGetModerationSuggestSpread from './define-master-plan/get-moderation-suggest-spread'
import watchGetProducingStepDetail from './define-master-plan/get-producing-step-detail'
import watchRejectMasterPlan from './define-master-plan/reject-master-plan'
import watchSearchMasterPlans from './define-master-plan/search-master-plans'
import watchSubmitModerationInput from './define-master-plan/submit-moderation-input'
import watchUpdateMasterPlan from './define-master-plan/update-master-plan'
import watchConfirmPlan from './define-plan/confirm-plan'
import watchCreatePlan from './define-plan/create-plan'
import watchDeletePlan from './define-plan/delete-plan'
import watchExportPlanReport from './define-plan/export'
import watchGetMoByPlan from './define-plan/get-mo-by-plan'
import watchGetPlanDetails from './define-plan/get-plan-details'
import watchSearchPlans from './define-plan/search-plans'
import watchUpdatePlan from './define-plan/update-plan'
import watchSearchMaterialDetailPlan from './material-detail-plan/search'
import watchCheckMaterialPlan from './mo/check-material-plan'
import watchConfirmMO from './mo/confirm-mo'
import watchCreateMO from './mo/create-mo'
import watchDeleteMO from './mo/delete-mo'
import watchGetBOMProducingStepStructure from './mo/get-bom-producing-step-structure'
import watchGetListMoProducingStepById from './mo/get-list-mo-producing-step-by-id'
import watchGetMODetails from './mo/get-mo-details'
import watchGetMOItems from './mo/get-mo-items'
import watchGetPriceStructure from './mo/get-price-structure'
import watchRejectMO from './mo/reject-mo'
import watchSearchMO from './mo/search-mo'
import watchUpdateMO from './mo/update-mo'
import watchGetPriceReport from './price-report/get-price-report'
import watchConfirmProducingStep from './producing-steps/confirm'
import watchCreateProducingStep from './producing-steps/create'
import watchDeleteProducingStep from './producing-steps/delete'
import watchGetProducingStepsByRoutingVersion from './producing-steps/get-by-routing-version'
import watchGetProducingStepDetails from './producing-steps/get-detail'
import watchSearchProducingSteps from './producing-steps/search'
import watchUpdateProducingStep from './producing-steps/update'
import watchGetDataProductivityCompareReport from './productivity-compare-report/get-data-productivity-compare'
import watchGetDataProductivityReport from './productivity-report/get-data-productivity-report'
import watchSearchProgressManufacturingByWorkCenter from './progress-by-work-center/search-progress-by-work-center'
import watchProgressDetailReportData from './progress-detail-report/get-progress-detail-report'
import watchProgressManuFacturingByOrderData from './progress-manudacturing-by-order/get-progress-manudacturing-by-order'
import watchQualityReportData from './quality-report'
import watchExportQualityReportData from './quality-report/export'
import watchConfirmRequestBuyMaterial from './request-buy-material/confirm-request-buy-material'
import watchCreateRequestBuyMaterial from './request-buy-material/create-request-buy-material'
import watchDeleteRequestBuyMaterial from './request-buy-material/delete-request-buy-material'
import watchGetRequestBuyMaterialDetails from './request-buy-material/get-request-buy-material-details'
import watchPrintQRRequestBuyMaterial from './request-buy-material/print-qr-request-buy-material'
import watchRejectRequestBuyMaterial from './request-buy-material/reject-request-material'
import watchSearchRequestBuyMaterial from './request-buy-material/search-request-buy-materials'
import watchUpdateRequestBuyMaterial from './request-buy-material/update-request-buy-material'
import watchConfirmRouting from './routing/confirm-routing'
import watchCreateRouting from './routing/create-routing'
import watchDeleteRouting from './routing/delete-routing'
import watchGetRoutingDetails from './routing/get-routing-details'
import watchSearchRoutings from './routing/search-routings'
import watchUpdateRouting from './routing/update-routing'
import watchCreateUser from './user-management/create-user'
import watchDeleteUser from './user-management/delete-user'
import watchGenerateOTP from './user-management/generate-otp'
import watchGetUserDetails from './user-management/get-user-details'
import watchResetPassword from './user-management/reset-password'
import watchSearchUsers from './user-management/search-users'
import watchUpdateUser from './user-management/update-user'
import watchVerifyOTP from './user-management/verify-otp-code'
import watchGetUserPermission from './user-permission/get-user-permission'
import watchUpdateUserPermission from './user-permission/update-user-permission'
import watchConfirmWorkCenterPlan from './work-center-plan/confirm-work-center-plan'
import watchCreateWorkCenterPlan from './work-center-plan/create-work-center-plan'
import watchDeleteWorkCenterPlan from './work-center-plan/delete-work-center-plan'
import watchGenerateWorkCenterPlan from './work-center-plan/generate-work-center-plan'
import watchGetWorkCenterPlanDetail from './work-center-plan/get-work-center-plan-detail'
import watchSearchWorkCenterPlan from './work-center-plan/search-work-center-plan'
import watchUpdateWorkCenterPlan from './work-center-plan/update-work-center-plan'
import watchConfirmWorkCenter from './work-center/confirm-work-center'
import watchCreateWorkCenter from './work-center/create-work-center'
import watchDeleteWorkCenter from './work-center/delete-work-center'
import watchGetWorkCenterDetails from './work-center/get-work-center-details'
import watchSearchWorkCenter from './work-center/search-work-center'
import watchUpdateWorkCenter from './work-center/update-work-center'
import watchAutocompleteWorkOrder from './work-order/autocomplete-work-order'
import watchConfirmWorkOrder from './work-order/confirm-work-order'
import watchCreateWorkOrder from './work-order/create-work-order'
import watchDeleteWorkOrder from './work-order/delete-work-order'
import watchGetBomDetails from './work-order/get-bom-details'
import watchGetWorkOrderDetails from './work-order/get-work-order-details'
import watchPrintQRWorkOrder from './work-order/print-qr-work-order'
import watchSearchWorkOrders from './work-order/search-work-orders'
import watchUpdateWorkOrder from './work-order/update-work-order'

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
    watchGetCustomers(),
    watchGetVendors(),
    watchGetAllItemDetails(),
    watchGetProducingSteps(),
    watchGetBoms(),
    watchGetFactories(),
    watchGetSaleOrders(),
    watchGetQualityPoints(),
    watchGetItemQualityPoint(),
    watchGetSaleOrderDetailByIds(),

    //routing
    watchConfirmRouting(),
    watchCreateRouting(),
    watchDeleteRouting(),
    watchGetRoutingDetails(),
    watchSearchRoutings(),
    watchUpdateRouting(),

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
    watchJobDetails(),
    watchGetModerationSuggestSpread(),
    watchCreateMasterPlan(),
    watchSubmitModerationInput(),
    watchExtendDeadline(),
    watchGetProducingStepDetail(),
    watchApproveMasterPlan(),
    watchRejectMasterPlan(),
    watchDeleteMasterPlan(),
    watchUpdateMasterPlan(),
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
    watchAutocompleteWorkOrder(),
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

    // quality-point
    watchSearchQualityPoints(),
    watchGetQualityPointDetails(),

    //price-report
    watchGetPriceReport(),

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
    watchCreateRequestBuyMaterial(),

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

    //calendar
    watchGetListFactoryCalendar(),
    watchUpdateFactoryCalendar(),
    watchGetDetailFactoryEvent(),
    watchCreateFactoryCalendar(),
    watchCreateFactoryCalendarSetup(),
    watchGetListFactoryEvent(),
    watchGetDetailFactoryCalendar(),

    //user-permission
    watchGetUserPermission(),
    watchUpdateUserPermission(),

    //progress-detail-report
    watchProgressDetailReportData(),
    // productivity-compare-report
    watchGetDataProductivityCompareReport(),

    //progress-manufacturing-by-work-center
    watchSearchProgressManufacturingByWorkCenter(),
    //progress-manufacturing-by-order
    watchProgressManuFacturingByOrderData(),

    watchGetGroupPermissions(),
    watchGetDepartmentsRole(),
  ])
}
