//@Define: QMSx - Công đoạn: stages
export const STAGE_OPTION = {
  PO_IMPORT: 0,
  PRO_IMPORT: 2,
  PRO_EXPORT: 3,
  SO_EXPORT: 5,
  PRODUCTION_OUTPUT: 8,
  PRODUCTION_INPUT: 9,
  IMO_IMPORT: 10,
  EXO_EXPORT: 11,
}

export const STAGE_OPTION_PRODUCTION = [
  STAGE_OPTION.PRODUCTION_INPUT,
  STAGE_OPTION.PRODUCTION_OUTPUT,
]

export const STAGES_INPUT = [
  {
    value: STAGE_OPTION.PO_IMPORT, //0
    text: 'common.stages.poImport',
  },
  {
    value: STAGE_OPTION.PRO_IMPORT, //2
    text: 'common.stages.proImport',
  },
  {
    value: STAGE_OPTION.IMO_IMPORT, //10
    text: 'common.stages.imoImport',
  },
]

export const STAGES_OUTPUT = [
  {
    value: STAGE_OPTION.PRO_EXPORT, //3
    text: 'common.stages.proExport',
  },
  {
    value: STAGE_OPTION.SO_EXPORT, //5
    text: 'common.stages.soExport',
  },
  {
    value: STAGE_OPTION.EXO_EXPORT, //11
    text: 'common.stages.exoExport',
  },
]

export const STAGES_PRODUCTION = [
  {
    value: STAGE_OPTION.PRODUCTION_OUTPUT, //8
    text: 'common.stages.productionOutput',
  },
  {
    value: STAGE_OPTION.PRODUCTION_INPUT, //9
    text: 'common.stages.productionInput',
  },
]

export const STAGE_OPTION_OTHER = [
  STAGE_OPTION.PO_IMPORT,
  STAGE_OPTION.PRO_IMPORT,
  STAGE_OPTION.IMO_IMPORT,
  STAGE_OPTION.PRO_EXPORT,
  STAGE_OPTION.SO_EXPORT,
  STAGE_OPTION.EXO_EXPORT,
]

export const STAGE_OPTION_MAP = {
  [STAGE_OPTION.PO_IMPORT]: 'common.stages.poImport',
  [STAGE_OPTION.PRO_IMPORT]: 'common.stages.proImport',
  [STAGE_OPTION.IMO_IMPORT]: 'common.stages.imoImport',
  [STAGE_OPTION.PRO_EXPORT]: 'common.stages.proExport',
  [STAGE_OPTION.SO_EXPORT]: 'common.stages.soExport',
  [STAGE_OPTION.EXO_EXPORT]: 'common.stages.exoExport',
  [STAGE_OPTION.PRODUCTION_OUTPUT]: 'common.stages.productionOutput',
  [STAGE_OPTION.PRODUCTION_INPUT]: 'common.stages.productionInput',
}

export const STAGE_OPTION_INPUT = [
  STAGE_OPTION.PO_IMPORT,
  STAGE_OPTION.PRO_IMPORT,
  STAGE_OPTION.IMO_IMPORT,
]

export const STAGE_OPTION_OUTPUT = [
  STAGE_OPTION.PRO_EXPORT,
  STAGE_OPTION.SO_EXPORT,
  STAGE_OPTION.EXO_EXPORT,
]

export const STAGES = [...STAGES_INPUT, ...STAGES_OUTPUT, ...STAGES_PRODUCTION]

//@Define: QMSx - Error-report
export const ERROR_REPORT_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  COMPLETED: 3,
}

export const ERROR_REPORT_STATUS_OPTIONS_MAP = {
  [ERROR_REPORT_STATUS_OPTIONS.PENDING]: 'defineErrorReport.statusText.pending',
  [ERROR_REPORT_STATUS_OPTIONS.CONFIRMED]:
    'defineErrorReport.statusText.confirmed',
  [ERROR_REPORT_STATUS_OPTIONS.REJECTED]:
    'defineErrorReport.statusText.rejected',
  [ERROR_REPORT_STATUS_OPTIONS.COMPLETED]:
    'defineErrorReport.statusText.completed',
}

export const ERROR_REPORT_STATUS = [
  {
    id: ERROR_REPORT_STATUS_OPTIONS.PENDING, //0
    text: 'defineErrorReport.statusText.pending',
    color: 'pending',
  },
  {
    id: ERROR_REPORT_STATUS_OPTIONS.CONFIRMED, //1
    text: 'defineErrorReport.statusText.confirmed',
    color: 'confirmed',
  },
  {
    id: ERROR_REPORT_STATUS_OPTIONS.REJECTED, //2
    text: 'defineErrorReport.statusText.rejected',
    color: 'rejected',
  },
  {
    id: ERROR_REPORT_STATUS_OPTIONS.COMPLETED, //3
    text: 'defineErrorReport.statusText.completed',
    color: 'completed',
  },
]

export const ERROR_REPORT_STATUS_TO_CONFIRM = [
  ERROR_REPORT_STATUS_OPTIONS.PENDING,
]
export const ERROR_REPORT_STATUS_TO_REJECT = [
  ERROR_REPORT_STATUS_OPTIONS.PENDING,
]

//@Define: Độ ưu tiên - Phiếu báo cáo lỗi\
export const PRIORITY_OPTIONS = {
  LOW: 1,
  MEDIUM: 2,
  HIGHT: 3,
}

export const PRIORITY_MAP = {
  [PRIORITY_OPTIONS.LOW]: 'priority.low',
  [PRIORITY_OPTIONS.MEDIUM]: 'priority.medium',
  [PRIORITY_OPTIONS.HIGHT]: 'priority.hight',
}

export const PRIORITY = [
  {
    id: PRIORITY_OPTIONS.LOW,
    text: 'priority.low',
  },
  {
    id: PRIORITY_OPTIONS.MEDIUM,
    text: 'priority.medium',
  },
  {
    id: PRIORITY_OPTIONS.HIGHT,
    text: 'priority.hight',
  },
]

//@Define: status - Danh-sach-kiem-tra
export const CHECK_LIST_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const CHECK_LIST_STATUS_OPTIONS_MAP = {
  [CHECK_LIST_STATUS_OPTIONS.PENDING]: 'defineCheckList.statusText.pending',
  [CHECK_LIST_STATUS_OPTIONS.CONFIRMED]: 'defineCheckList.statusText.confirmed',
}

export const CHECK_LIST_STATUS = [
  {
    id: CHECK_LIST_STATUS_OPTIONS.PENDING, //0
    text: 'defineCheckList.statusText.pending',
    color: 'pending',
  },
  {
    id: CHECK_LIST_STATUS_OPTIONS.CONFIRMED, //1
    text: 'defineCheckList.statusText.confirmed',
    color: 'confirmed',
  },
]

export const CHECK_LIST_STATUS_TO_CONFIRM = [CHECK_LIST_STATUS_OPTIONS.PENDING]

export const CHECK_LIST_STATUS_TO_DELETE = [CHECK_LIST_STATUS_OPTIONS.PENDING]

export const CHECK_LIST_STATUS_TO_EDIT = [CHECK_LIST_STATUS_OPTIONS.PENDING]

export const CHECK_TYPE_OPTIONS = {
  PASS_PAIL: 1,
  MEASURE: 2,
}
export const CHECK_TYPE_OPTIONS_MAP = {
  [CHECK_TYPE_OPTIONS.PASS_PAIL]: 'defineCheckList.checkTypeText.passFail',
  [CHECK_TYPE_OPTIONS.MEASURE]: 'defineCheckList.checkTypeText.measure',
}

export const CHECK_TYPE = [
  {
    value: CHECK_TYPE_OPTIONS.PASS_PAIL,
    text: 'defineCheckList.checkTypeText.passFail',
  },
  {
    value: CHECK_TYPE_OPTIONS.MEASURE,
    text: 'defineCheckList.checkTypeText.measure',
  },
]

//@Define: QMSx - Quality-point
export const QUALITY_POINT_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const QUALITY_POINT_STATUS_OPTIONS_MAP = {
  [QUALITY_POINT_STATUS_OPTIONS.PENDING]:
    'defineQualityPoint.statusText.pending',
  [QUALITY_POINT_STATUS_OPTIONS.CONFIRMED]:
    'defineQualityPoint.statusText.confirmed',
}

export const QUALITY_POINT_STATUS = [
  {
    id: QUALITY_POINT_STATUS_OPTIONS.PENDING,
    text: 'defineQualityPoint.statusText.pending',
    color: 'pending',
  },
  {
    id: QUALITY_POINT_STATUS_OPTIONS.CONFIRMED,
    text: 'defineQualityPoint.statusText.confirmed',
    color: 'confirmed',
  },
]

export const QUALITY_POINT_STATUS_TO_CONFIRM = [
  QUALITY_POINT_STATUS_OPTIONS.PENDING,
]

export const QUALITY_POINT_STATUS_TO_DELETE = [
  QUALITY_POINT_STATUS_OPTIONS.PENDING,
]

export const QUALITY_POINT_STATUS_TO_EDIT = [
  QUALITY_POINT_STATUS_OPTIONS.PENDING,
]

export const PRE_STAGE_PRODUCT_TYPE = {
  UN_CHECKED: 0,
  CHECKED: 1,
}

export const MATERIAL_TYPE = {
  UN_CHECKED: 0,
  CHECKED: 1,
}

export const FOMALITY_QC_OPTION = {
  TOTALITY: '0',
  RANDOM: '1',
}

export const NUMBER_OF_TIMES_QC_OPTION = {
  ONE_TIMES: '0',
  TWO_TIMES: '1',
}

//@Define: QMSx - Quality-alert
export const QUALITY_ALERT_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const QUALITY_ALERT_STATUS_OPTIONS_MAP = {
  [QUALITY_ALERT_STATUS_OPTIONS.PENDING]:
    'defineQualityAlert.statusText.pending',
  [QUALITY_ALERT_STATUS_OPTIONS.CONFIRMED]:
    'defineQualityAlert.statusText.confirmed',
}

export const QUALITY_ALERT_STATUS = [
  {
    id: QUALITY_ALERT_STATUS_OPTIONS.PENDING,
    text: 'defineQualityAlert.statusText.pending',
    color: 'pending',
  },
  {
    id: QUALITY_ALERT_STATUS_OPTIONS.CONFIRMED,
    text: 'defineQualityAlert.statusText.confirmed',
    color: 'confirmed',
  },
]

export const QUALITY_ALERT_STATUS_TO_CONFIRM = [
  QUALITY_ALERT_STATUS_OPTIONS.PENDING,
]

export const QUALITY_ALERT_STATUS_TO_DELETE = [
  QUALITY_ALERT_STATUS_OPTIONS.PENDING,
]

export const QUALITY_ALERT_STATUS_TO_EDIT = [
  QUALITY_ALERT_STATUS_OPTIONS.PENDING,
]

export const TYPE_QC_OPTIONS = {
  PRODUCTION_INPUT: 1,
  PRODUCTION_OUTPUT: 2,
  INPUT: 3,
  OUTPUT: 4,
}

export const CREATE_OPTIONS_LIST = [
  {
    value: TYPE_QC_OPTIONS.PRODUCTION_INPUT,
    text: 'common.labelOptionBtnCreate.productionInputOption',
  },
  {
    value: TYPE_QC_OPTIONS.PRODUCTION_OUTPUT,
    text: 'common.labelOptionBtnCreate.productionOutputOption',
  },
  {
    value: TYPE_QC_OPTIONS.INPUT,
    text: 'common.labelOptionBtnCreate.inputOption',
  },
  {
    value: TYPE_QC_OPTIONS.OUTPUT,
    text: 'common.labelOptionBtnCreate.outputOption',
  },
]

export const TYPE_QC_VALUE_TO_API = {
  PRODUCTION: 1,
  INPUT: 2,
  OUTPUT: 3,
}

export const TAB_QUERY_STR_KEY = 'tab'

export const NUMBER_OF_TIMES_QC_TRANSACTION_OPTION = {
  ONE: 1,
  ONE_OF_TWO: 2,
  TWO_OF_TWO: 3,
  TWO: 2,
}

export const NUMBER_OF_TIMES_QC_TRANSACTION = [
  {
    value: NUMBER_OF_TIMES_QC_TRANSACTION_OPTION.ONE,
    text: 'transactionHistory.header.numberOfTimeQc.one',
  },
  {
    value: NUMBER_OF_TIMES_QC_TRANSACTION_OPTION.ONE_OF_TWO,
    text: 'transactionHistory.header.numberOfTimeQc.oneOfTwo',
  },
  {
    value: NUMBER_OF_TIMES_QC_TRANSACTION_OPTION.TWO_OF_TWO,
    text: 'transactionHistory.header.numberOfTimeQc.twoOfTwo',
  },
  {
    value: NUMBER_OF_TIMES_QC_TRANSACTION_OPTION.TWO,
    text: 'transactionHistory.header.numberOfTimeQc.two',
  },
]

//@Define: status - Kế hoạch QC đầu vào
export const INPUT_QC_PLAN_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
  INPROGRESS: 2,
  COMPLETED: 3,
}

export const INPUT_QC_PLAN_STATUS_OPTIONS_MAP = {
  [INPUT_QC_PLAN_STATUS_OPTIONS.PENDING]:
    'inputQualityControlPlan.statusText.pending',
  [INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED]:
    'inputQualityControlPlan.statusText.confirmed',
  [INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS]:
    'inputQualityControlPlan.statusText.inProgress',
  [INPUT_QC_PLAN_STATUS_OPTIONS.COMPLETED]:
    'inputQualityControlPlan.statusText.completed',
}

export const INPUT_QC_PLAN_STATUS = [
  {
    id: INPUT_QC_PLAN_STATUS_OPTIONS.PENDING, //0
    text: 'inputQualityControlPlan.statusText.pending',
    color: 'pending',
  },
  {
    id: INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED, //1
    text: 'inputQualityControlPlan.statusText.confirmed',
    color: 'confirmed',
  },
  {
    id: INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS, //2
    text: 'inputQualityControlPlan.statusText.inProgress',
    color: 'inProgress',
  },
  {
    id: INPUT_QC_PLAN_STATUS_OPTIONS.COMPLETED, //3
    text: 'inputQualityControlPlan.statusText.completed',
    color: 'completed',
  },
]

export const INPUT_QC_PLAN_STATUS_TO_CONFIRM = [
  INPUT_QC_PLAN_STATUS_OPTIONS.PENDING,
]

export const INPUT_QC_PLAN_STATUS_TO_DELETE = [
  INPUT_QC_PLAN_STATUS_OPTIONS.PENDING,
]

export const INPUT_QC_PLAN_STATUS_TO_EDIT = [
  INPUT_QC_PLAN_STATUS_OPTIONS.PENDING,
]

//@Define: status - Kế hoạch QC đầu ra
export const OUTPUT_QC_PLAN_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
  INPROGRESS: 2,
  COMPLETED: 3,
}

export const OUTPUT_QC_PLAN_STATUS_OPTIONS_MAP = {
  [OUTPUT_QC_PLAN_STATUS_OPTIONS.PENDING]:
    'outputQualityControlPlan.statusText.pending',
  [OUTPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED]:
    'outputQualityControlPlan.statusText.confirmed',
  [OUTPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS]:
    'outputQualityControlPlan.statusText.inProgress',
  [OUTPUT_QC_PLAN_STATUS_OPTIONS.COMPLETED]:
    'outputQualityControlPlan.statusText.completed',
}

export const OUTPUT_QC_PLAN_STATUS = [
  {
    id: OUTPUT_QC_PLAN_STATUS_OPTIONS.PENDING, //0
    text: 'outputQualityControlPlan.statusText.pending',
    color: 'pending',
  },
  {
    id: OUTPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED, //1
    text: 'outputQualityControlPlan.statusText.confirmed',
    color: 'confirmed',
  },
  {
    id: OUTPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS, //2
    text: 'outputQualityControlPlan.statusText.inProgress',
    color: 'inProgress',
  },
  {
    id: OUTPUT_QC_PLAN_STATUS_OPTIONS.COMPLETED, //3
    text: 'outputQualityControlPlan.statusText.completed',
    color: 'completed',
  },
]

export const OUTPUT_QC_PLAN_STATUS_TO_CONFIRM = [
  OUTPUT_QC_PLAN_STATUS_OPTIONS.PENDING,
]

export const OUTPUT_QC_PLAN_STATUS_TO_DELETE = [
  OUTPUT_QC_PLAN_STATUS_OPTIONS.PENDING,
]

export const OUTPUT_QC_PLAN_STATUS_TO_EDIT = [
  OUTPUT_QC_PLAN_STATUS_OPTIONS.PENDING,
]

//@Define: status - Kế hoạch QC sản xuất
export const PRODUCTION_QC_PLAN_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
  INPROGRESS: 2,
  COMPLETED: 3,
}

export const PRODUCTION_QC_PLAN_STATUS_OPTIONS_MAP = {
  [PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING]:
    'productionQualityControlPlan.statusText.pending',
  [PRODUCTION_QC_PLAN_STATUS_OPTIONS.CONFIRMED]:
    'productionQualityControlPlan.statusText.confirmed',
  [PRODUCTION_QC_PLAN_STATUS_OPTIONS.INPROGRESS]:
    'productionQualityControlPlan.statusText.inProgress',
  [PRODUCTION_QC_PLAN_STATUS_OPTIONS.COMPLETED]:
    'productionQualityControlPlan.statusText.completed',
}

export const PRODUCTION_QC_PLAN_STATUS = [
  {
    id: PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING, //0
    text: 'productionQualityControlPlan.statusText.pending',
    color: 'pending',
  },
  {
    id: PRODUCTION_QC_PLAN_STATUS_OPTIONS.CONFIRMED, //1
    text: 'productionQualityControlPlan.statusText.confirmed',
    color: 'confirmed',
  },
  {
    id: PRODUCTION_QC_PLAN_STATUS_OPTIONS.INPROGRESS, //2
    text: 'productionQualityControlPlan.statusText.inProgress',
    color: 'inProgress',
  },
  {
    id: PRODUCTION_QC_PLAN_STATUS_OPTIONS.COMPLETED, //3
    text: 'productionQualityControlPlan.statusText.completed',
    color: 'completed',
  },
]

export const PRODUCTION_QC_PLAN_STATUS_TO_CONFIRM = [
  PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING,
]

export const PRODUCTION_QC_PLAN_STATUS_TO_DELETE = [
  PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING,
]

export const PRODUCTION_QC_PLAN_STATUS_TO_EDIT = [
  PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING,
]

export const CREATE_OPTIONS_PRODUCTION_LIST = [
  {
    value: TYPE_QC_OPTIONS.PRODUCTION_INPUT,
    text: 'common.labelOptionBtnCreate.productionInputOption',
  },
  {
    value: TYPE_QC_OPTIONS.PRODUCTION_OUTPUT,
    text: 'common.labelOptionBtnCreate.productionOutputOption',
  },
]

export const PRODUCTION_INPUT_TYPE = {
  MATERIAL: 0,
  PRODUCT_PREVIOUS: 1,
}

export const TYPE_QUALITY_PLAN_BOM = {
  OUTPUT: 1,
  INPUT_MATERIAL: 2,
  INPUT_PREVIOUS: 3,
}

//--------@Define: plan QC xưởng-----------
//Kế hoạch sản xuất cho xưởng (MESX)
export const WORK_CENTER_PLAN_STATUS_OPTIONS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  INPROGRESS: 3,
  COMPLETED: 4,
}

export const WORK_CENTER_PLAN_STATUS_MAP = {
  [WORK_CENTER_PLAN_STATUS_OPTIONS.PENDING]:
    'workCenterQualityControlPlan.workCenterPlan.statusText.pending',
  [WORK_CENTER_PLAN_STATUS_OPTIONS.CONFIRMED]:
    'workCenterQualityControlPlan.workCenterPlan.statusText.confirmed',
  [WORK_CENTER_PLAN_STATUS_OPTIONS.INPROGRESS]:
    'workCenterQualityControlPlan.workCenterPlan.statusText.inProgress',
  [WORK_CENTER_PLAN_STATUS_OPTIONS.REJECTED]:
    'workCenterQualityControlPlan.workCenterPlan.statusText.rejected',
  [WORK_CENTER_PLAN_STATUS_OPTIONS.COMPLETED]:
    'workCenterQualityControlPlan.workCenterPlan.statusText.completed',
}

export const WORK_CENTER_PLAN_STATUS = [
  {
    id: WORK_CENTER_PLAN_STATUS_OPTIONS.PENDING,
    text: 'workCenterQualityControlPlan.workCenterPlan.statusText.pending',
    color: 'pending',
  },
  {
    id: WORK_CENTER_PLAN_STATUS_OPTIONS.CONFIRMED,
    text: 'workCenterQualityControlPlan.workCenterPlan.statusText.confirmed',
    color: 'confirmed',
  },
  {
    id: WORK_CENTER_PLAN_STATUS_OPTIONS.REJECTED,
    text: 'workCenterQualityControlPlan.workCenterPlan.statusText.rejected',
    color: 'rejected',
  },
  {
    id: WORK_CENTER_PLAN_STATUS_OPTIONS.INPROGRESS,
    text: 'workCenterQualityControlPlan.workCenterPlan.statusText.inProgress',
    color: 'inProgress',
  },
  {
    id: WORK_CENTER_PLAN_STATUS_OPTIONS.COMPLETED,
    text: 'workCenterQualityControlPlan.workCenterPlan.statusText.completed',
    color: 'completed',
  },
]

export const TYPE_WC_QC_PLAN = {
  OUTPUT: 1,
  INPUT_MATERIAL: 2,
}

export const ENDPOINT_PATCH_UPDATE_WORK_CENTER_QC_PLAN = {
  INPUT_SCHEDULES: 'input-schedules',
  OUTPUT_SCHEDULES: 'output-schedules',
}

export const USER_MANAGEMENT_STATUS_OPTIONS = {
  INACTIVE: 0,
  ACTIVE: 1,
  DELETED: 2,
}

export const USER_MANAGEMENT_STATUS_MAP = {
  [USER_MANAGEMENT_STATUS_OPTIONS.INACTIVE]:
    'userManagement.userStatus.inactive',
  [USER_MANAGEMENT_STATUS_OPTIONS.ACTIVE]: 'userManagement.userStatus.active',
  [USER_MANAGEMENT_STATUS_OPTIONS.DELETED]: 'userManagement.userStatus.deleted',
}

export const USER_MANAGEMENT_STATUS = [
  {
    id: 0,
    text: 'userManagement.userStatus.inactive',
    color: 'inactive',
  },
  {
    id: 1,
    text: 'userManagement.userStatus.active',
    color: 'active',
  },
  {
    id: 2,
    text: 'userManagement.userStatus.deleted',
    color: 'deleted',
  },
]
