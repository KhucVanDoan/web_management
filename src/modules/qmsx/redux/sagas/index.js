import { all } from 'redux-saga/effects'

//Common
import watchGetAllCheckList from './common/get-all-check-list'
import watchGetAllErrorGroup from './common/get-all-error-group'
import watchGetCompanies from './common/get-company'
import watchGetCustomers from './common/get-customers'
import watchGetDepartments from './common/get-department'
import watchGetFactories from './common/get-factories'
import watchGetItemUnits from './common/get-item-units'
import watchGetItems from './common/get-items'
import watchGetProductsByStageQC from './common/get-products-by-stage-qc'
import watchGetRoles from './common/get-role'
import watchGetUsers from './common/get-users'
import watchGetWarehouses from './common/get-warehouses'
//dashboard
import watchGetActionGroupDashboard from './dashboard/error-report/get-action-group-dashboard'
import watchGetCauseGroupDashboard from './dashboard/error-report/get-cause-group-dashboard'
import watchGetErrorGroupDashboard from './dashboard/error-report/get-error-group-dashboard'
import watchGetErrorReportStatusDashboard from './dashboard/error-report/get-error-report-status-dashboard'
import watchGetInProgressMoDashboard from './dashboard/get-in-progress-mo-list-dashboard'
import watchGetItemListByMoDashboard from './dashboard/get-item-list-by-mo-dashboard'
import watchGetProducingStepListByItemMoDashboard from './dashboard/get-producing-step-list-by-item-mo-dashboard'
import watchGetQcCheckItemByExo from './dashboard/get-qc-check-item-by-exo'
import watchGetQcCheckItemByImo from './dashboard/get-qc-check-item-by-imo'
import watchGetQcCheckItemByPo from './dashboard/get-qc-check-item-by-po'
import watchGetQcCheckItemByPro from './dashboard/get-qc-check-item-by-pro'
import watchGetQcCheckItemBySo from './dashboard/get-qc-check-item-by-so'
import watchGetQcProgressDashboard from './dashboard/get-qc-progress-dashboard'
import watchGetSummaryDashboard from './dashboard/get-summary-dashboard'
import watchGetInputQualityDashboard from './dashboard/quality-control/get-input-quality-dashboard'
import watchGetMaterialList from './dashboard/quality-control/get-material-list'
import watchGetOutputQualityDashboard from './dashboard/quality-control/get-output-quality-dashboard'
import watchGetProductionInputQualityMaterialDashboard from './dashboard/quality-control/get-production-input-quality-material-dashboard'
import watchGetProductionInputQualityProductPreviousDashboard from './dashboard/quality-control/get-production-input-quality-product-previous-dashboard'
import watchGetProductionOutputQualityDashboard from './dashboard/quality-control/get-production-output-quality-dashboard'
//define-action-group
import watchCreateActionGroup from './define-action-group/create-action-group'
import watchDeleteActionGroup from './define-action-group/delete-action-group'
import watchGetActionGroupDetail from './define-action-group/get-action-group-detail'
import watchSearchActionGroup from './define-action-group/search-action-group'
import watchUpdateActionGroup from './define-action-group/update-action-group'
//define-cause-group
import watchCreateCauseGroup from './define-cause-group/create-cause-group'
import watchDeleteCauseGroup from './define-cause-group/delete-cause-group'
import watchGetCauseGroupDetail from './define-cause-group/get-cause-group-detail'
import watchSearchCauseGroup from './define-cause-group/search-cause-group'
import watchUpdateCauseGroup from './define-cause-group/update-cause-group'
//define-check-list
import watchConfirmCheckList from './define-check-list/confirm-check-list'
import watchCreateCheckList from './define-check-list/create-check-list'
import watchDeleteCheckList from './define-check-list/delete-check-list'
import watchGetCheckListDetail from './define-check-list/get-check-list-detail'
import watchSearchCheckList from './define-check-list/search-check-list'
import watchUpdateCheckList from './define-check-list/update-check-list'
//define-error-group
import watchCreateErrorGroup from './define-error-group/create-error-group'
import watchDeleteErrorGroup from './define-error-group/delete-error-group'
import watchGetErrorGroupDetail from './define-error-group/get-error-group-detail'
import watchSearchErrorGroup from './define-error-group/search-error-group'
import watchUpdateErrorGroup from './define-error-group/update-error-group'
//define-error-report
import watchConfirmErrorReport from './define-error-report/confirm-error-report'
import watchGetErrorReportDetail from './define-error-report/get-error-report-detail'
import watchRejectErrorReport from './define-error-report/reject-error-report'
import watchSearchErrorReport from './define-error-report/search-error-report'
//define-quality-alert
import watchConfirmQualityAlert from './define-quality-alert/confirm-quality-alert'
import watchCreateQualityAlert from './define-quality-alert/create-quality-alert'
import watchDeleteQualityAlert from './define-quality-alert/delete-quality-alert'
import watchGetMo from './define-quality-alert/form-production/get-mo'
import watchGetProducingStepByRouting from './define-quality-alert/form-production/get-producing-step-by-routing'
import watchGetProductsByMo from './define-quality-alert/form-production/get-product-by-mo'
import watchGetRoutingByProduct from './define-quality-alert/form-production/get-routing-by-product'
import watchGetErrorReportByStageQcValueOrderIdProductIdWarehouseId from './define-quality-alert/form/get-error-report-by-stage-order-product-warehouse'
import watchGetOrderByStageQcValue from './define-quality-alert/form/get-order-by-stage-qc'
import watchGetProductByOrderId from './define-quality-alert/form/get-product-by-order'
import watchGetRelatedUserByWarehouseId from './define-quality-alert/form/get-related-user-by-warehouse'
import watchGetWarehouseByOrderIdAndProductId from './define-quality-alert/form/get-warehouse-by-product-stage'
import watchGetQualityAlertDetail from './define-quality-alert/get-quality-alert-detail'
import watchSearchQualityAlert from './define-quality-alert/search-quality-alert'
import watchUpdateQualityAlert from './define-quality-alert/update-quality-alert'
//define-quality-point
import watchConfirmQualityPoint from './define-quality-point/confirm-quality-point'
import watchCreateQualityPoint from './define-quality-point/create-quality-point'
import watchDeleteQualityPoint from './define-quality-point/delete-quality-point'
import watchGetQualityPointDetail from './define-quality-point/get-quality-point-detail'
import watchSearchQualityPoint from './define-quality-point/search-quality-point'
import watchUpdateQualityPoint from './define-quality-point/update-quality-point'
//input-quality-control-plan
import watchConfirmInputQcPlan from './input-quality-control-plan/confirm-input-quality-control-plan'
import watchCreateInputQcPlan from './input-quality-control-plan/create-input-quality-control-plan'
import watchDeleteInputQcPlan from './input-quality-control-plan/delete-input-quality-control-plan'
import watchGetInputPlanByOrderId from './input-quality-control-plan/form/get-input-plan-by-order'
import watchGetOrderByStageQc from './input-quality-control-plan/form/get-order-by-stage-qc'
import watchGetInputQcPlanDetail from './input-quality-control-plan/get-input-quality-control-plan-detail'
import watchSearchInputQcPlan from './input-quality-control-plan/search-input-quality-control-plan'
import watchUpdateInputQcPlan from './input-quality-control-plan/update-input-quality-control-plan'
//output-quality-control-plan
import watchConfirmOutputQcPlan from './output-quality-control-plan/confirm-output-quality-control-plan'
import watchCreateOutputQcPlan from './output-quality-control-plan/create-output-quality-control-plan'
import watchDeleteOutputQcPlan from './output-quality-control-plan/delete-output-quality-control-plan'
import watchGetOutputOrderByStageQc from './output-quality-control-plan/form/get-output-order-by-stage-qc'
import watchGetOutputPlanByOrderId from './output-quality-control-plan/form/get-output-plan-by-order'
import watchGetOutputQcPlanDetail from './output-quality-control-plan/get-output-quality-control-plan-detail'
import watchSearchOutputQcPlan from './output-quality-control-plan/search-output-quality-control-plan'
import watchUpdateOutputQcPlan from './output-quality-control-plan/update-output-quality-control-plan'
//production-quality-control-plan
import watchConfirmProductionQcPlan from './production-quality-control-plan/confirm-production-quality-control-plan'
import watchCreateProductionQcPlan from './production-quality-control-plan/create-production-quality-control-plan'
import watchDeleteProductionQcPlan from './production-quality-control-plan/delete-production-quality-control-plan'
import watchGetInputMoForQcPlan from './production-quality-control-plan/form/get-input-mo'
import watchGetOutputMoForQcPlan from './production-quality-control-plan/form/get-output-mo'
import watchGetProductionPlanByMoId from './production-quality-control-plan/form/get-production-plan-by-mo'
import watchGetProductionPlanDetail from './production-quality-control-plan/form/get-production-plan-detail'
import watchGetProductionQcPlanDetail from './production-quality-control-plan/get-production-quality-control-plan-detail'
import watchSearchProductionQcPlan from './production-quality-control-plan/search-production-quality-control-plan'
import watchUpdateProductionQcPlan from './production-quality-control-plan/update-production-quality-control-plan'
//quality-report
import watchGetItemListByMo from './quality-report/get-item-list-by-mo'
import watchGetItemListByPo from './quality-report/get-item-list-by-po'
import watchGetItemListByPro from './quality-report/get-item-list-by-pro'
import watchGetItemListBySo from './quality-report/get-item-list-by-so'
import watchGetMoList from './quality-report/get-mo-list'
import watchGetOrderListByStage from './quality-report/get-order-list-by-stage'
import watchSearchInputQualityReport from './quality-report/search-input-quality-report'
import watchSearchOutputQualityReport from './quality-report/search-output-quality-report'
import watchSearchProdInputMaterialQualityReport from './quality-report/search-prod-input-material-quality-report'
import watchSearchProdInputProductPrevQualityReport from './quality-report/search-prod-input-product-prev-quality-report'
import watchSearchProductionOutputQualityReport from './quality-report/search-production-output-quality-report'
//transaction-history
import watchGetDetailInputQualityTransactionHistory from './transaction-history/get-detail-input-quality-transaction-history'
import watchGetDetailOutputQualityTransactionHistory from './transaction-history/get-detail-output-quality-transaction-history'
import watchGetDetailProductionInputQualityMaterialTransactionHistory from './transaction-history/get-detail-production-input-quality-material-transaction-history'
import watchGetDetailProductionInputQualityProductPreviousTransactionHistory from './transaction-history/get-detail-production-input-quality-product-previous-transaction-history'
import watchGetDetailProductionOutputQualityTransactionHistory from './transaction-history/get-detail-production-output-quality-transaction-history'
import watchSearchInputQualityTransactionHistory from './transaction-history/search-input-quality-transaction-history'
import watchSearchOutputQualityTransactionHistory from './transaction-history/search-output-quality-transaction-history'
import watchSearchProductionInputQualityMaterialTransactionHistory from './transaction-history/search-production-input-material-quality-transaction-history'
import watchSearchProductionInputQualityProductPreviousTransactionHistory from './transaction-history/search-production-input-product-previous-quality-transaction-history'
import watchSearchProductionOutputQualityTransactionHistory from './transaction-history/search-production-output-quality-transaction-history'
//usser-managemnets
import watchCreateUser from './user-management/create-user'
import watchDeleteUser from './user-management/delete-user'
import watchGenerateOTP from './user-management/generate-otp'
import watchGetUserDetails from './user-management/get-user-details'
import watchResetPassword from './user-management/reset-password'
import watchSearchUsers from './user-management/search-users'
import watchUpdateUser from './user-management/update-user'
import watchVerifyOTP from './user-management/verify-otp-code'
//user-permission
import watchGetUserPermission from './user-permission/get-user-permission'
import watchUpdateUserPermission from './user-permission/update-user-permission'
//work-center-quality-control-plan
import watchGetWorkCenterQualityControlPlanDetail from './work-center-quality-control-plan/get-detail-work-center-plan'
import watchSearchWorkCenterQualityControlPlan from './work-center-quality-control-plan/search-work-center-plan'
import watchUpdateWorkCenterQualityControlPlan from './work-center-quality-control-plan/update-work-center-qc-plan'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    // common
    watchGetCompanies(),
    watchGetRoles(),
    watchGetDepartments(),
    watchGetItemUnits(),
    watchGetItems(),
    watchGetCustomers(),
    watchGetUsers(),
    watchGetFactories(),
    watchGetAllErrorGroup(),
    watchGetProductsByStageQC(),
    watchGetAllCheckList(),
    watchGetWarehouses(),

    //dashboard
    watchGetQcProgressDashboard(),
    watchGetInputQualityDashboard(),
    watchGetOutputQualityDashboard(),
    watchGetProductionOutputQualityDashboard(),
    watchGetProductionInputQualityProductPreviousDashboard(),
    watchGetProductionInputQualityMaterialDashboard(),
    watchGetErrorGroupDashboard(),
    watchGetCauseGroupDashboard(),
    watchGetActionGroupDashboard(),
    watchGetErrorReportStatusDashboard(),
    watchGetInProgressMoDashboard(),
    watchGetItemListByMoDashboard(),
    watchGetProducingStepListByItemMoDashboard(),
    watchGetSummaryDashboard(),
    watchGetQcCheckItemByExo(),
    watchGetQcCheckItemByImo(),
    watchGetQcCheckItemByPo(),
    watchGetQcCheckItemBySo(),
    watchGetQcCheckItemByPro(),
    watchGetMaterialList(),

    //define-error-group
    watchSearchErrorGroup(),
    watchDeleteErrorGroup(),
    watchCreateErrorGroup(),
    watchGetErrorGroupDetail(),
    watchUpdateErrorGroup(),

    //define-action-group
    watchSearchActionGroup(),
    watchDeleteActionGroup(),
    watchCreateActionGroup(),
    watchGetActionGroupDetail(),
    watchUpdateActionGroup(),

    //define-cause-group
    watchSearchCauseGroup(),
    watchDeleteCauseGroup(),
    watchCreateCauseGroup(),
    watchGetCauseGroupDetail(),
    watchUpdateCauseGroup(),

    //define-error-report
    watchSearchErrorReport(),
    watchConfirmErrorReport(),
    watchRejectErrorReport(),
    watchGetErrorReportDetail(),

    //define-check-list
    watchSearchCheckList(),
    watchDeleteCheckList(),
    watchConfirmCheckList(),
    watchCreateCheckList(),
    watchGetCheckListDetail(),
    watchUpdateCheckList(),

    //define-quality-alert
    watchSearchQualityAlert(),
    watchDeleteQualityAlert(),
    watchConfirmQualityAlert(),
    watchCreateQualityAlert(),
    watchGetQualityAlertDetail(),
    watchUpdateQualityAlert(),
    watchGetMo(),
    watchGetProductsByMo(),
    watchGetProducingStepByRouting(),
    watchGetRoutingByProduct(),
    watchGetOrderByStageQcValue(),
    watchGetProductByOrderId(),
    watchGetWarehouseByOrderIdAndProductId(),
    watchGetErrorReportByStageQcValueOrderIdProductIdWarehouseId(),
    watchGetRelatedUserByWarehouseId(),

    //define-quality-point
    watchSearchQualityPoint(),
    watchDeleteQualityPoint(),
    watchConfirmQualityPoint(),
    watchCreateQualityPoint(),
    watchGetQualityPointDetail(),
    watchUpdateQualityPoint(),

    //quality-report
    watchSearchInputQualityReport(),
    watchSearchOutputQualityReport(),
    watchSearchProductionOutputQualityReport(),
    watchSearchProdInputProductPrevQualityReport(),
    watchSearchProdInputMaterialQualityReport(),
    watchGetMoList(),
    watchGetItemListByMo(),
    watchGetItemListByPo(),
    watchGetItemListBySo(),
    watchGetItemListByPro(),
    watchGetOrderListByStage(),

    //transaction-history
    watchSearchInputQualityTransactionHistory(),
    watchSearchOutputQualityTransactionHistory(),
    watchSearchProductionOutputQualityTransactionHistory(),
    watchSearchProductionInputQualityProductPreviousTransactionHistory(),
    watchSearchProductionInputQualityMaterialTransactionHistory(),
    watchGetDetailInputQualityTransactionHistory(),
    watchGetDetailOutputQualityTransactionHistory(),
    watchGetDetailProductionInputQualityProductPreviousTransactionHistory(),
    watchGetDetailProductionInputQualityMaterialTransactionHistory(),
    watchGetDetailProductionOutputQualityTransactionHistory(),

    //input-quality-control-plan
    watchSearchInputQcPlan(),
    watchDeleteInputQcPlan(),
    watchConfirmInputQcPlan(),
    watchCreateInputQcPlan(),
    watchGetInputQcPlanDetail(),
    watchUpdateInputQcPlan(),
    watchGetInputPlanByOrderId(),
    watchGetOrderByStageQc(), //orderInput: Po - Pro

    //output-quality-control-plan
    watchSearchOutputQcPlan(),
    watchDeleteOutputQcPlan(),
    watchConfirmOutputQcPlan(),
    watchCreateOutputQcPlan(),
    watchGetOutputQcPlanDetail(),
    watchUpdateOutputQcPlan(),
    watchGetOutputPlanByOrderId(),
    watchGetOutputOrderByStageQc(), //orderOutput: Pro -So

    //production-quality-control-plan
    watchSearchProductionQcPlan(),
    watchDeleteProductionQcPlan(),
    watchConfirmProductionQcPlan(),
    watchCreateProductionQcPlan(),
    watchGetProductionQcPlanDetail(),
    watchUpdateProductionQcPlan(),
    watchGetInputMoForQcPlan(),
    watchGetOutputMoForQcPlan(),
    watchGetProductionPlanByMoId(),
    watchGetProductionPlanDetail(),

    //work-center-quality-control-plan
    watchSearchWorkCenterQualityControlPlan(),
    watchGetWorkCenterQualityControlPlanDetail(),
    watchUpdateWorkCenterQualityControlPlan(),

    // user-management
    watchSearchUsers(),
    watchCreateUser(),
    watchUpdateUser(),
    watchDeleteUser(),
    watchGetUserDetails(),
    watchGenerateOTP(),
    watchVerifyOTP(),
    watchResetPassword(),

    //user-permission
    watchGetUserPermission(),
    watchUpdateUserPermission(),
  ])
}
