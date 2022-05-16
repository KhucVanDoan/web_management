import Dashboard from '~/modules/qmsx/features/dashboard'
//Định nghĩa nhóm đối sách
import DefineActionGroup from '~/modules/qmsx/features/define-action-group'
import DefineActionGroupDetail from '~/modules/qmsx/features/define-action-group/action-group-detail'
import DefineActionGroupForm from '~/modules/qmsx/features/define-action-group/action-group-form'
//Định nghĩa nhóm nguyên nhân
import DefineCauseGroup from '~/modules/qmsx/features/define-cause-group'
import DefineCauseGroupDetail from '~/modules/qmsx/features/define-cause-group/cause-group-detail'
import DefineCauseGroupForm from '~/modules/qmsx/features/define-cause-group/cause-group-form'
//Định nghĩa danh sách kiểm tra lỗi
import DefineCheckList from '~/modules/qmsx/features/define-check-list'
import DefineCheckListDetail from '~/modules/qmsx/features/define-check-list/check-list-detail'
import DefineCheckListForm from '~/modules/qmsx/features/define-check-list/check-list-form'
//Định nghĩa nhóm lỗi
import DefineErrorGroup from '~/modules/qmsx/features/define-error-group'
import DefineErrorGroupDetail from '~/modules/qmsx/features/define-error-group/error-group-detail'
import DefineErrorGroupForm from '~/modules/qmsx/features/define-error-group/error-group-form'
//Định nghĩa phiếu báo cáo lỗi
import DefineErrorReport from '~/modules/qmsx/features/define-error-report'
import DefineErrorReportDetail from '~/modules/qmsx/features/define-error-report/error-report-detail'
//Định nghĩa tiêu chí quản lý chất lượng
import DefineQualityAlert from '~/modules/qmsx/features/define-quality-alert'
import DefineQualityAlertInputDetail from '~/modules/qmsx/features/define-quality-alert/input/quality-alert-detail'
import DefineQualityAlertInputForm from '~/modules/qmsx/features/define-quality-alert/input/quality-alert-form'
import DefineQualityAlertOutputDetail from '~/modules/qmsx/features/define-quality-alert/output/quality-alert-detail'
import DefineQualityAlertOutputForm from '~/modules/qmsx/features/define-quality-alert/output/quality-alert-form'
import DefineQualityAlertProductionInputDetail from '~/modules/qmsx/features/define-quality-alert/production-input/quality-alert-detail'
import DefineQualityAlertProductionInputForm from '~/modules/qmsx/features/define-quality-alert/production-input/quality-alert-form'
import DefineQualityAlertProductionOutputDetail from '~/modules/qmsx/features/define-quality-alert/production-output/quality-alert-detail'
import DefineQualityAlertProductionOutputForm from '~/modules/qmsx/features/define-quality-alert/production-output/quality-alert-form'
//Định nghĩa tiêu chí quản lý chất lượng
import DefineQualityPoint from '~/modules/qmsx/features/define-quality-point'
import DefineQualityPointDetail from '~/modules/qmsx/features/define-quality-point/quality-point-detail'
import DefineQualityPointForm from '~/modules/qmsx/features/define-quality-point/quality-point-form'
//Kế hoạch Qc đầu vào
import InputQualityControlPlan from '~/modules/qmsx/features/input-quality-control-plan'
import InputQualityControlPlanDetail from '~/modules/qmsx/features/input-quality-control-plan/input-quality-control-plan-detail'
import InputQualityControlPlanForm from '~/modules/qmsx/features/input-quality-control-plan/input-quality-control-plan-form'
//Kế hoạch Qc đầu ra
import OutputQualityControlPlan from '~/modules/qmsx/features/output-quality-control-plan'
import OutputQualityControlPlanDetail from '~/modules/qmsx/features/output-quality-control-plan/output-quality-control-plan-detail'
import OutputQualityControlPlanForm from '~/modules/qmsx/features/output-quality-control-plan/output-quality-control-plan-form'
//Kế hoạch Qc sản xuất
import ProductionQualityControlPlan from '~/modules/qmsx/features/production-quality-control-plan'
import ProductionInputQualityControlPlanDetail from '~/modules/qmsx/features/production-quality-control-plan/production-input/detail'
import ProductionInputQualityControlPlanForm from '~/modules/qmsx/features/production-quality-control-plan/production-input/form'
import ProductionOutputQualityControlPlanDetail from '~/modules/qmsx/features/production-quality-control-plan/production-output/detail'
import ProductionOutputQualityControlPlanForm from '~/modules/qmsx/features/production-quality-control-plan/production-output/form'
// Kế hoạch QC xưởng
import WorkCenterQualityControlPlanProductionInputDetail from '~/modules/qmsx/features/production-quality-control-plan/work-center-quality-control-plan/detail/production-input'
import WorkCenterQualityControlPlanProductionOuputDetail from '~/modules/qmsx/features/production-quality-control-plan/work-center-quality-control-plan/detail/production-output'
import WorkCenterQualityControlPlanProductionInputForm from '~/modules/qmsx/features/production-quality-control-plan/work-center-quality-control-plan/form/production-input'
import WorkCenterQualityControlPlanProductionOuputForm from '~/modules/qmsx/features/production-quality-control-plan/work-center-quality-control-plan/form/production-output'
import WorkCenterQualityControlPlanList from '~/modules/qmsx/features/production-quality-control-plan/work-center-quality-control-plan/list'
//Báo cáo chất lượng
import QualityReport from '~/modules/qmsx/features/quality-report'
//Lịch sử giao dịch
import TransactionHistory from '~/modules/qmsx/features/transaction-history'
import InputQualityTransactionHistoryDetail from '~/modules/qmsx/features/transaction-history/input-quality/detail'
import OutputQualityTransactionHistoryDetail from '~/modules/qmsx/features/transaction-history/output-quality/detail'
import ProductionInputQualityMaterialDetail from '~/modules/qmsx/features/transaction-history/production-input-quality-material/detail'
import ProductionInputQualityProductPreviousDetail from '~/modules/qmsx/features/transaction-history/production-input-quality-product-previous/detail'
import ProductionOutputQualityDetail from '~/modules/qmsx/features/transaction-history/production-output-quality/detail'
//Quản lý user
import UserManagement from '~/modules/qmsx/features/user-management'
import UserManagementDetail from '~/modules/qmsx/features/user-management/user-detail'
import UserManagementForm from '~/modules/qmsx/features/user-management/user-form'
//Quyền user
import UserPermission from '~/modules/qmsx/features/user-permission'

import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.DASHBOARD.TITLE,
    path: ROUTE.DASHBOARD.PATH,
    component: Dashboard,
    icon: 'home',
    isInSidebar: true,
  },
  {
    name: 'plan',
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      //Kế hoạch QC đầu vào
      {
        name: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
        path: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
        component: InputQualityControlPlan,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INPUT_QUALITY_CONTROL_PLAN.CREATE.TITLE,
            path: ROUTE.INPUT_QUALITY_CONTROL_PLAN.CREATE.PATH,
            component: InputQualityControlPlanForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.INPUT_QUALITY_CONTROL_PLAN.DETAIL.TITLE,
            path: ROUTE.INPUT_QUALITY_CONTROL_PLAN.DETAIL.PATH,
            component: InputQualityControlPlanDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.INPUT_QUALITY_CONTROL_PLAN.EDIT.TITLE,
            path: ROUTE.INPUT_QUALITY_CONTROL_PLAN.EDIT.PATH,
            component: InputQualityControlPlanForm,
            isInSidebar: false,
          },
        ],
      },
      //Kế hoạch QC đầu ra
      {
        name: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
        path: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
        component: OutputQualityControlPlan,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.CREATE.TITLE,
            path: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.CREATE.PATH,
            component: OutputQualityControlPlanForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.DETAIL.TITLE,
            path: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.DETAIL.PATH,
            component: OutputQualityControlPlanDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.EDIT.TITLE,
            path: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.EDIT.PATH,
            component: OutputQualityControlPlanForm,
            isInSidebar: false,
          },
        ],
      },
      //Kế hoạch QC sản xuất
      {
        name: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
        path: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
        component: ProductionQualityControlPlan,
        isInSidebar: true,
        subMenu: [
          //production-input
          {
            name: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_INPUT
              .TITLE,
            path: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_INPUT
              .PATH,
            component: ProductionInputQualityControlPlanForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_INPUT
              .TITLE,
            path: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_INPUT
              .PATH,
            component: ProductionInputQualityControlPlanDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_INPUT
              .TITLE,
            path: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_INPUT
              .PATH,
            component: ProductionInputQualityControlPlanForm,
            isInSidebar: false,
          },
          //production-output
          {
            name: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_OUTPUT
              .TITLE,
            path: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_OUTPUT
              .PATH,
            component: ProductionOutputQualityControlPlanForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_OUTPUT
              .TITLE,
            path: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_OUTPUT
              .PATH,
            component: ProductionOutputQualityControlPlanDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_OUTPUT
              .TITLE,
            path: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_OUTPUT
              .PATH,
            component: ProductionOutputQualityControlPlanForm,
            isInSidebar: false,
          },
          //work-center-qc-plan
          {
            name: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.TITLE,
            path: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.PATH,
            component: WorkCenterQualityControlPlanList,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.DETAIL_OUTPUT.TITLE,
            path: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.DETAIL_OUTPUT.PATH,
            component: WorkCenterQualityControlPlanProductionOuputDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT_OUTPUT.TITLE,
            path: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT_OUTPUT.PATH,
            component: WorkCenterQualityControlPlanProductionOuputForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.DETAIL_INPUT.TITLE,
            path: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.DETAIL_INPUT.PATH,
            component: WorkCenterQualityControlPlanProductionInputDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT_INPUT.TITLE,
            path: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT_INPUT.PATH,
            component: WorkCenterQualityControlPlanProductionInputForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: 'database',
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      //Định nghĩa nhóm lỗi
      {
        name: ROUTE.DEFINE_ERROR_GROUP.LIST.TITLE,
        path: ROUTE.DEFINE_ERROR_GROUP.LIST.PATH,
        component: DefineErrorGroup,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_ERROR_GROUP.CREATE.TITLE,
            path: ROUTE.DEFINE_ERROR_GROUP.CREATE.PATH,
            component: DefineErrorGroupForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ERROR_GROUP.DETAIL.TITLE,
            path: ROUTE.DEFINE_ERROR_GROUP.DETAIL.PATH,
            component: DefineErrorGroupDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ERROR_GROUP.EDIT.TITLE,
            path: ROUTE.DEFINE_ERROR_GROUP.EDIT.PATH,
            component: DefineErrorGroupForm,
            isInSidebar: false,
          },
        ],
      },
      //Định nghĩa nhóm đối sách
      {
        name: ROUTE.DEFINE_ACTION_GROUP.LIST.TITLE,
        path: ROUTE.DEFINE_ACTION_GROUP.LIST.PATH,
        component: DefineActionGroup,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_ACTION_GROUP.CREATE.TITLE,
            path: ROUTE.DEFINE_ACTION_GROUP.CREATE.PATH,
            component: DefineActionGroupForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ACTION_GROUP.DETAIL.TITLE,
            path: ROUTE.DEFINE_ACTION_GROUP.DETAIL.PATH,
            component: DefineActionGroupDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ACTION_GROUP.EDIT.TITLE,
            path: ROUTE.DEFINE_ACTION_GROUP.EDIT.PATH,
            component: DefineActionGroupForm,
            isInSidebar: false,
          },
        ],
      },
      //Định nghĩa nhóm nguyên nhân
      {
        name: ROUTE.DEFINE_CAUSE_GROUP.LIST.TITLE,
        path: ROUTE.DEFINE_CAUSE_GROUP.LIST.PATH,
        component: DefineCauseGroup,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_CAUSE_GROUP.CREATE.TITLE,
            path: ROUTE.DEFINE_CAUSE_GROUP.CREATE.PATH,
            component: DefineCauseGroupForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CAUSE_GROUP.DETAIL.TITLE,
            path: ROUTE.DEFINE_CAUSE_GROUP.DETAIL.PATH,
            component: DefineCauseGroupDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CAUSE_GROUP.EDIT.TITLE,
            path: ROUTE.DEFINE_CAUSE_GROUP.EDIT.PATH,
            component: DefineCauseGroupForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: 'qualityControl',
    icon: 'prettyBag',
    isInSidebar: true,
    subMenu: [
      {
        //Danh sách kiểm tra
        name: ROUTE.DEFINE_CHECK_LIST.LIST.TITLE,
        path: ROUTE.DEFINE_CHECK_LIST.LIST.PATH,
        component: DefineCheckList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_CHECK_LIST.CREATE.TITLE,
            path: ROUTE.DEFINE_CHECK_LIST.CREATE.PATH,
            component: DefineCheckListForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CHECK_LIST.DETAIL.TITLE,
            path: ROUTE.DEFINE_CHECK_LIST.DETAIL.PATH,
            component: DefineCheckListDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CHECK_LIST.EDIT.TITLE,
            path: ROUTE.DEFINE_CHECK_LIST.EDIT.PATH,
            component: DefineCheckListForm,
            isInSidebar: false,
          },
        ],
      },
      //Định nghĩa tiêu chí quản lý chất lượng
      {
        name: ROUTE.DEFINE_QUALITY_POINT.LIST.TITLE,
        path: ROUTE.DEFINE_QUALITY_POINT.LIST.PATH,
        component: DefineQualityPoint,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_QUALITY_POINT.CREATE.TITLE,
            path: ROUTE.DEFINE_QUALITY_POINT.CREATE.PATH,
            component: DefineQualityPointForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_POINT.DETAIL.TITLE,
            path: ROUTE.DEFINE_QUALITY_POINT.DETAIL.PATH,
            component: DefineQualityPointDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_POINT.EDIT.TITLE,
            path: ROUTE.DEFINE_QUALITY_POINT.EDIT.PATH,
            component: DefineQualityPointForm,
            isInSidebar: false,
          },
        ],
      },
      //Định nghĩa phiếu báo cáo lỗi
      {
        name: ROUTE.DEFINE_ERROR_REPORT.LIST.TITLE,
        path: ROUTE.DEFINE_ERROR_REPORT.LIST.PATH,
        component: DefineErrorReport,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_ERROR_REPORT.DETAIL.TITLE,
            path: ROUTE.DEFINE_ERROR_REPORT.DETAIL.PATH,
            component: DefineErrorReportDetail,
            isInSidebar: false,
          },
        ],
      },
      //Định nghĩa thông báo cải tiến chất lượng
      {
        name: ROUTE.DEFINE_QUALITY_ALERT.LIST.TITLE,
        path: ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH,
        component: DefineQualityAlert,
        isInSidebar: true,
        subMenu: [
          //Production-input
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_INPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_INPUT.PATH,
            component: DefineQualityAlertProductionInputForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_INPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_INPUT.PATH,
            component: DefineQualityAlertProductionInputDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_INPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_INPUT.PATH,
            component: DefineQualityAlertProductionInputForm,
            isInSidebar: false,
          },
          //Production-output
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_OUTPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_OUTPUT.PATH,
            component: DefineQualityAlertProductionOutputForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_OUTPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_OUTPUT.PATH,
            component: DefineQualityAlertProductionOutputDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_OUTPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_OUTPUT.PATH,
            component: DefineQualityAlertProductionOutputForm,
            isInSidebar: false,
          },
          //Input
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.CREATE_INPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.CREATE_INPUT.PATH,
            component: DefineQualityAlertInputForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_INPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_INPUT.PATH,
            component: DefineQualityAlertInputDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.EDIT_INPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.EDIT_INPUT.PATH,
            component: DefineQualityAlertInputForm,
            isInSidebar: false,
          },
          //Output
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.CREATE_OUTPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.CREATE_OUTPUT.PATH,
            component: DefineQualityAlertOutputForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_OUTPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_OUTPUT.PATH,
            component: DefineQualityAlertOutputDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_QUALITY_ALERT.EDIT_OUTPUT.TITLE,
            path: ROUTE.DEFINE_QUALITY_ALERT.EDIT_OUTPUT.PATH,
            component: DefineQualityAlertOutputForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: 'analysisAndReport',
    icon: 'key',
    isInSidebar: true,
    subMenu: [
      //Phân tích & báo cáo
      {
        name: ROUTE.QUALITY_REPORT.LIST.TITLE,
        path: ROUTE.QUALITY_REPORT.LIST.PATH,
        component: QualityReport,
        isInSidebar: true,
        subMenu: [],
      },
    ],
  },
  {
    icon: 'setting',
    name: 'setting',
    isInSidebar: true,
    subMenu: [
      //Lịch sử giao dịch
      {
        name: ROUTE.TRANSACTION_HISTORY.LIST.TITLE,
        path: ROUTE.TRANSACTION_HISTORY.LIST.PATH,
        component: TransactionHistory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.TRANSACTION_HISTORY.INPUT_QUALITY_DETAIL.TITLE,
            path: ROUTE.TRANSACTION_HISTORY.INPUT_QUALITY_DETAIL.PATH,
            component: InputQualityTransactionHistoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSACTION_HISTORY.OUTPUT_QUALITY_DETAIL.TITLE,
            path: ROUTE.TRANSACTION_HISTORY.OUTPUT_QUALITY_DETAIL.PATH,
            component: OutputQualityTransactionHistoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSACTION_HISTORY
              .PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DETAIL.TITLE,
            path: ROUTE.TRANSACTION_HISTORY
              .PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DETAIL.PATH,
            component: ProductionInputQualityProductPreviousDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSACTION_HISTORY
              .PRODUCTION_INPUT_QUALITY_MATERIAL_DETAIL.TITLE,
            path: ROUTE.TRANSACTION_HISTORY
              .PRODUCTION_INPUT_QUALITY_MATERIAL_DETAIL.PATH,
            component: ProductionInputQualityMaterialDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSACTION_HISTORY.PRODUCTION_OUTPUT_QUALITY_DETAIL
              .TITLE,
            path: ROUTE.TRANSACTION_HISTORY.PRODUCTION_OUTPUT_QUALITY_DETAIL
              .PATH,
            component: ProductionOutputQualityDetail,
            isInSidebar: false,
          },
        ],
      },
      //Quản lý người dùng
      {
        name: ROUTE.USER_MANAGEMENT.LIST.TITLE,
        path: ROUTE.USER_MANAGEMENT.LIST.PATH,
        component: UserManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.USER_MANAGEMENT.CREATE.PATH,
            component: UserManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
            component: UserManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.USER_MANAGEMENT.EDIT.PATH,
            component: UserManagementForm,
            isInSidebar: false,
          },
        ],
      },
      //Quản lý quyền
      {
        name: ROUTE.USER_PERMISSION.TITLE,
        path: ROUTE.USER_PERMISSION.PATH,
        component: UserPermission,
        isInSidebar: true,
      },
    ],
  },
]

export default routes
