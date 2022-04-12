export const ROUTE = {
  DASHBOARD: {
    PATH: '/qmsx',
    TITLE: 'dashboard',
  },
  DEFINE_ERROR_GROUP: {
    LIST: {
      PATH: '/qmsx/define-error-group',
      TITLE: 'defineErrorGroup',
    },
    CREATE: {
      PATH: '/qmsx/define-error-group/create',
      TITLE: 'defineErrorGroupCreate',
    },
    DETAIL: {
      PATH: '/qmsx/define-error-group/:id/detail',
      TITLE: 'defineErrorGroupDetail',
    },
    EDIT: {
      PATH: '/qmsx/define-error-group/:id/edit',
      TITLE: 'defineErrorGroupEdit',
    },
  },
  DEFINE_ACTION_GROUP: {
    LIST: {
      PATH: '/qmsx/define-action-group',
      TITLE: 'defineActionGroup',
    },
    CREATE: {
      PATH: '/qmsx/define-action-group/create',
      TITLE: 'defineActionGroupCreate',
    },
    DETAIL: {
      PATH: '/qmsx/define-action-group/:id/detail',
      TITLE: 'defineActionGroupDetail',
    },
    EDIT: {
      PATH: '/qmsx/define-action-group/:id/edit',
      TITLE: 'defineActionGroupEdit',
    },
  },
  DEFINE_CAUSE_GROUP: {
    LIST: {
      PATH: '/qmsx/define-cause-group',
      TITLE: 'defineCauseGroup',
    },
    CREATE: {
      PATH: '/qmsx/define-cause-group/create',
      TITLE: 'defineCauseGroupCreate',
    },
    DETAIL: {
      PATH: '/qmsx/define-cause-group/:id/detail',
      TITLE: 'defineCauseGroupDetail',
    },
    EDIT: {
      PATH: '/qmsx/define-cause-group/:id/edit',
      TITLE: 'defineCauseGroupEdit',
    },
  },
  //Module: quality-control
  DEFINE_CHECK_LIST: {
    LIST: {
      PATH: '/qmsx/define-check-list',
      TITLE: 'defineCheckList',
    },
    CREATE: {
      PATH: '/qmsx/define-check-list/create',
      TITLE: 'defineCheckListCreate',
    },
    DETAIL: {
      PATH: '/qmsx/define-check-list/:id/detail',
      TITLE: 'defineCheckListDetail',
    },
    EDIT: {
      PATH: '/qmsx/define-check-list/:id/edit',
      TITLE: 'defineCheckListEdit',
    },
  },
  DEFINE_QUALITY_POINT: {
    LIST: {
      PATH: '/qmsx/define-quality-point',
      TITLE: 'defineQualityPoint',
    },
    CREATE: {
      PATH: '/qmsx/define-quality-point/create',
      TITLE: 'defineQualityPointCreate',
    },
    DETAIL: {
      PATH: '/qmsx/define-quality-point/:id/detail',
      TITLE: 'defineQualityPointDetail',
    },
    EDIT: {
      PATH: '/qmsx/define-quality-point/:id/edit',
      TITLE: 'defineQualityPointEdit',
    },
  },
  DEFINE_ERROR_REPORT: {
    LIST: {
      PATH: '/qmsx/define-error-report',
      TITLE: 'defineErrorReport',
    },
    DETAIL: {
      PATH: '/qmsx/define-error-report/:id/detail',
      TITLE: 'defineErrorReportDetail',
    },
  },
  DEFINE_QUALITY_ALERT: {
    LIST: {
      PATH: '/qmsx/define-quality-alert',
      TITLE: 'defineQualityAlert',
    },
    CREATE_PRODUCTION_INPUT: {
      PATH: '/qmsx/define-quality-alert/create-production-input',
      TITLE: 'defineQualityAlertProductionInputCreate',
    },
    DETAIL_PRODUCTION_INPUT: {
      PATH: '/qmsx/define-quality-alert/:id/detail-production-input',
      TITLE: 'defineQualityAlertProductionInputDetail',
    },
    EDIT_PRODUCTION_INPUT: {
      PATH: '/qmsx/define-quality-alert/:id/edit-production-input',
      TITLE: 'defineQualityAlertProductionInputEdit',
    },
    CREATE_PRODUCTION_OUTPUT: {
      PATH: '/qmsx/define-quality-alert/create-production-output',
      TITLE: 'defineQualityAlertProductionOutputCreate',
    },
    DETAIL_PRODUCTION_OUTPUT: {
      PATH: '/qmsx/define-quality-alert/:id/detail-production-output',
      TITLE: 'defineQualityAlertProductionOutputDetail',
    },
    EDIT_PRODUCTION_OUTPUT: {
      PATH: '/qmsx/define-quality-alert/:id/edit-production-output',
      TITLE: 'defineQualityAlertProductionOutputEdit',
    },
    CREATE_INPUT: {
      PATH: '/qmsx/define-quality-alert/create-input',
      TITLE: 'defineQualityAlertInputCreate',
    },
    DETAIL_INPUT: {
      PATH: '/qmsx/define-quality-alert/:id/detail-input',
      TITLE: 'defineQualityAlertInputDetail',
    },
    EDIT_INPUT: {
      PATH: '/qmsx/define-quality-alert/:id/edit-input',
      TITLE: 'defineQualityAlertInputEdit',
    },
    CREATE_OUTPUT: {
      PATH: '/qmsx/define-quality-alert/create-output',
      TITLE: 'defineQualityAlertOutputCreate',
    },
    DETAIL_OUTPUT: {
      PATH: '/qmsx/define-quality-alert/:id/detail-output',
      TITLE: 'defineQualityAlertOutputDetail',
    },
    EDIT_OUTPUT: {
      PATH: '/qmsx/define-quality-alert/:id/edit-output',
      TITLE: 'defineQualityAlertOutputEdit',
    },
  },
  QUALITY_REPORT: {
    LIST: {
      PATH: '/qmsx/quality-report',
      TITLE: 'qualityReport',
    },
  },
  TRANSACTION_HISTORY: {
    LIST: {
      PATH: '/qmsx/transaction-history',
      TITLE: 'transactionHistory',
    },
    INPUT_QUALITY_DETAIL: {
      PATH: '/qmsx/transaction-history/input-quality/:id',
      TITLE: 'transactionHistoryDetail',
    },
    OUTPUT_QUALITY_DETAIL: {
      PATH: '/qmsx/transaction-history/output-quality/:id',
      TITLE: 'transactionHistoryDetail',
    },
    PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DETAIL: {
      PATH: '/qmsx/transaction-history/production-input-quality/product-previous/:id',
      TITLE: 'transactionHistoryDetail',
    },
    PRODUCTION_INPUT_QUALITY_MATERIAL_DETAIL: {
      PATH: '/qmsx/transaction-history/production-input-quality/material/:id',
      TITLE: 'transactionHistoryDetail',
    },
    PRODUCTION_OUTPUT_QUALITY_DETAIL: {
      PATH: '/qmsx/transaction-history/production-output-quality/:id',
      TITLE: 'transactionHistoryDetail',
    },
  },
  INPUT_QUALITY_CONTROL_PLAN: {
    LIST: {
      PATH: '/qmsx/input-quality-control-plan',
      TITLE: 'inputQualityControlPlan',
    },
    CREATE: {
      PATH: '/qmsx/input-quality-control-plan/create',
      TITLE: 'inputQualityControlPlanCreate',
    },
    DETAIL: {
      PATH: '/qmsx/input-quality-control-plan/:id/detail',
      TITLE: 'inputQualityControlPlanDetail',
    },
    EDIT: {
      PATH: '/qmsx/input-quality-control-plan/:id/edit',
      TITLE: 'inputQualityControlPlanEdit',
    },
  },
  OUTPUT_QUALITY_CONTROL_PLAN: {
    LIST: {
      PATH: '/qmsx/output-quality-control-plan',
      TITLE: 'outputQualityControlPlan',
    },
    CREATE: {
      PATH: '/qmsx/output-quality-control-plan/create',
      TITLE: 'outputQualityControlPlanCreate',
    },
    DETAIL: {
      PATH: '/qmsx/output-quality-control-plan/:id/detail',
      TITLE: 'outputQualityControlPlanDetail',
    },
    EDIT: {
      PATH: '/qmsx/output-quality-control-plan/:id/edit',
      TITLE: 'outputQualityControlPlanEdit',
    },
  },
  PRODUCTION_QUALITY_CONTROL_PLAN: {
    LIST: {
      PATH: '/qmsx/production-quality-control-plan',
      TITLE: 'productionQualityControlPlan',
    },
    CREATE_PRODUCTION_INPUT: {
      PATH: '/qmsx/production-quality-control-plan/create-production-input',
      TITLE: 'productionInputQualityControlPlanCreate',
    },
    DETAIL_PRODUCTION_INPUT: {
      PATH: '/qmsx/production-quality-control-plan/:id/detail-production-input',
      TITLE: 'productionInputQualityControlPlanDetail',
    },
    EDIT_PRODUCTION_INPUT: {
      PATH: '/qmsx/production-quality-control-plan/:id/edit-production-input',
      TITLE: 'productionInputQualityControlPlanEdit',
    },
    CREATE_PRODUCTION_OUTPUT: {
      PATH: '/qmsx/production-quality-control-plan/create-production-output',
      TITLE: 'productionOutputQualityControlPlanCreate',
    },
    DETAIL_PRODUCTION_OUTPUT: {
      PATH: '/qmsx/production-quality-control-plan/:id/detail-production-output',
      TITLE: 'productionOutputQualityControlPlanDetail',
    },
    EDIT_PRODUCTION_OUTPUT: {
      PATH: '/qmsx/production-quality-control-plan/:id/edit-production-output',
      TITLE: 'productionOutputQualityControlPlanEdit',
    },
  },
  WORK_CENTER_QUALITY_CONTROL_PLAN: {
    LIST: {
      PATH: '/qmsx/production-quality-control-plan/work-center-quality-control-plan',
      TITLE: 'workCenterQualityControlPlan',
    },
    DETAIL: {
      PATH: '/qmsx/production-quality-control-plan/work-center-quality-control-plan/:id/detail',
      TITLE: 'workCenterQualityControlPlanDetail',
    },
    EDIT: {
      PATH: '/qmsx/production-quality-control-plan/work-center-quality-control-plan/:id/edit',
      TITLE: 'workCenterQualityControlPlanEdit',
    },
  },
}
