export const ORDER_TYPE = {
  IMPORT: 0,
  EXPORT: 1,
}

export const ORDER_TYPE_MAP = {
  [ORDER_TYPE.IMPORT]: 'orderType.import',
  [ORDER_TYPE.EXPORT]: 'orderType.export',
}

export const ORDER_TYPE_OPTIONS = [
  {
    id: 0,
    name: 'orderType.import',
  },
  {
    id: 1,
    name: 'orderType.export',
  },
]

export const ORDER_TYPE_ENUM = {
  PO: 1,
  PRO: 2,
  SO: 3,
  Transfer: 4,
}

export const WAREHOUSE_ORDER_TYPES = [
  {
    id: 0,
    name: 'saleOrderType.PO',
  },
  {
    id: 1,
    name: 'saleOrderType.PrO',
  },
  {
    id: 2,
    name: 'saleOrderType.SO',
  },
  {
    id: 3,
    name: 'warehouseOrderType.Transfer',
  },
]

export const ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}

export const TRANSFER_TYPE = {
  ONE_STEP: 0,
  TWO_STEP: 1,
}

export const TRANSFER_STATUS_ENUM = {
  CREATED: 0,
  PENDING: 1,
  COMPLETED: 2,
  REJECTED: 3,
}

export const INVENTORY_STATUS = {
  CREATED: 1,
  CONFIRMED: 2,
  REJECT: 3,
  COMPLETE: 4,
  IN_PROGRESS: 5,
}

export const ORDER_STATUS_MAP = {
  [ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [ORDER_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [ORDER_STATUS.APPROVED]: 'orderStatus.approved',
  [ORDER_STATUS.REJECTED]: 'orderStatus.rejected',
  [ORDER_STATUS.COMPLETED]: 'orderStatus.completed',
}

export const ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'orderStatus.approved',
    color: 'approved',
  },
  {
    id: 4,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
]

export const TRANSFER_TYPE_MAP = {
  [TRANSFER_TYPE.ONE_STEP]: 'warehouseTransfer.1step',
  [TRANSFER_TYPE.TWO_STEP]: 'warehouseTransfer.2step',
}
export const TRANSFER_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'warehouseTransfer.1step',
  },
  {
    id: 1,
    text: 'warehouseTransfer.2step',
  },
]

export const TRANSFER_STATUS_MAP = {
  [TRANSFER_STATUS_ENUM.CREATED]: 'warehouseTransfer.transferStatus.created',
  [TRANSFER_STATUS_ENUM.PENDING]: 'warehouseTransfer.transferStatus.pending',
  [TRANSFER_STATUS_ENUM.COMPLETED]:
    'warehouseTransfer.transferStatus.completed',
  [TRANSFER_STATUS_ENUM.REJECTED]: 'warehouseTransfer.transferStatus.rejected',
}
export const TRANSFER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'warehouseTransfer.transferStatus.created',
  },
  {
    id: 1,
    text: 'warehouseTransfer.transferStatus.pending',
  },
  {
    id: 2,
    text: 'warehouseTransfer.transferStatus.completed',
  },
  {
    id: 3,
    text: 'warehouseTransfer.transferStatus.rejected',
  },
]

export const INVENTORY_STATUS_MAP = {
  [INVENTORY_STATUS.CREATED]: 'inventoryStatus.pending',
  [INVENTORY_STATUS.CONFIRMED]: 'inventoryStatus.confirmed',
  [INVENTORY_STATUS.REJECT]: 'inventoryStatus.reject',
  [INVENTORY_STATUS.COMPLETE]: 'inventoryStatus.complete',
  [INVENTORY_STATUS.IN_PROGRESS]: 'inventoryStatus.inProgress',
}

export const INVENTORY_STATUS_OPTIONS = [
  { id: 1, name: 'inventoryStatus.pending' },
  { id: 2, name: 'inventoryStatus.confirmed' },
  { id: 3, name: 'inventoryStatus.reject' },
  { id: 5, name: 'inventoryStatus.inProgress' },
  { id: 4, name: 'inventoryStatus.complete' },
]
export const WORK_ORDER_STATUS = {
  REJECTED: 2,
  CREATED: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}
export const WORK_ORDER_STATUS_MAP = {
  [WORK_ORDER_STATUS.CREATED]: 'workOrder.pending',
  [WORK_ORDER_STATUS.CONFIRMED]: 'workOrder.confirmed',
  [WORK_ORDER_STATUS.REJECTED]: 'workOrder.rejected',
  [WORK_ORDER_STATUS.COMPLETED]: 'workOrder.completed',
  [WORK_ORDER_STATUS.IN_PROGRESS]: 'workOrder.inProgress',
}

export const WORK_ORDER_STATUS_OPTIONS = [
  { id: 0, text: 'workOrder.pending', color: 'pending' },
  { id: 1, text: 'workOrder.confirmed', color: 'confirmed' },
  { id: 3, text: 'workOrder.inProgress', color: 'inProgress' },
  { id: 2, text: 'workOrder.inPlam', color: 'inPlam' },
  { id: 4, text: 'workOrder.complete', color: 'complete' },
]
export const MOVEMENT_TYPE = {
  PO_IMPORT: 0,
  PO_EXPORT: 1,
  PRO_IMPORT: 2,
  PRO_EXPORT: 3,
  SO_IMPORT: 4,
  SO_EXPORT: 5,
  TRANSFER_IMPORT: 6,
  TRANSFER_EXPORT: 7,
}

export const MOVEMENT_SCREEN_TYPE = {
  PO: 'PO',
  SO: 'SO',
  PRO: 'PRO',
  TRANSFER: 'TRANSFER',
}

export const MOVEMENT_TYPE_CODE = {
  PO: 1,
  PRO: 2,
  SO: 3,
}

export const MOVEMENT_TYPE_MAP_TEXT = {
  [MOVEMENT_TYPE.PO_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.PO_EXPORT]: 'movements.export',
  [MOVEMENT_TYPE.PRO_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.PRO_EXPORT]: 'movements.export',
  [MOVEMENT_TYPE.SO_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.SO_EXPORT]: 'movements.export',
  [MOVEMENT_TYPE.TRANSFER_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.TRANSFER_EXPORT]: 'movements.export',
}

export const MOVEMENT_ORDER_TYPE_MAP_TEXT = {
  [MOVEMENT_TYPE.PO_IMPORT]: 'movements.purchasedOrder',
  [MOVEMENT_TYPE.PO_EXPORT]: 'movements.purchasedOrder',
  [MOVEMENT_TYPE.PRO_IMPORT]: 'movements.routing',
  [MOVEMENT_TYPE.PRO_EXPORT]: 'movements.routing',
  [MOVEMENT_TYPE.SO_IMPORT]: 'movements.saleOrder',
  [MOVEMENT_TYPE.SO_EXPORT]: 'movements.saleOrder',
  [MOVEMENT_TYPE.TRANSFER_IMPORT]: 'movements.transferOrder',
  [MOVEMENT_TYPE.TRANSFER_EXPORT]: 'movements.transferOrder',
}

export const MOVEMENT_WAREHOUSE_TRANSFER_ORDER_TYPE_MAP_TEXT = {
  [MOVEMENT_TYPE.TRANSFER_IMPORT]: 'warehouseTransferMovement.transferImport',
  [MOVEMENT_TYPE.TRANSFER_EXPORT]: 'warehouseTransferMovement.transferExport',
}

export const MOVEMENT_STATUS = [
  { id: 0, text: 'Chờ xác nhận' },
  { id: 1, text: 'Xác nhận' },
]

export const INVENTORY_SCREEN_TYPE = {
  INVENTORY_LIST: 'INVENTORY_LIST',
  INVENTORY_DETAIL: 'INVENTORY_DETAIL',
}

export const WAREHOUSE_TRANSFER_MOVEMENTS_SCREEN_TYPE = {
  WAREHOUSE_TRANSFER_MOVEMENT_LIST: 'WAREHOUSE_TRANSFER_MOVEMENT_LIST',
  WAREHOUSE_TRANSFER_MOVEMENT_DETAIL: 'WAREHOUSE_TRANSFER_MOVEMENT_DETAIL',
}

export const DEFAULT_ITEM_TYPE_ENUM = {
  MATERIAL: {
    id: 1,
    code: '00',
    name: 'itemType.material',
  },
  PRODUCT: {
    id: 2,
    code: '01',
    name: 'itemType.product',
  },
  SEMI: {
    id: 2,
    code: '02',
    name: 'itemType.product',
  },
}
export const DEFAULT_ITEM_TYPE = {
  MATERIAL: 0,
  PRODUCT: 1,
  SEMI: 2,
}

export const DEFAULT_ITEM_TYPE_MAP = {
  [DEFAULT_ITEM_TYPE.MATERIAL]: 'itemType.material',
  [DEFAULT_ITEM_TYPE.PRODUCT]: 'itemType.product',
  [DEFAULT_ITEM_TYPE.SEMI]: 'itemType.semi',
}
export const DEFAULT_ITEM_TYPE_OPTIONS = [
  {
    id: 0,
    code: '00',
    text: 'itemType.material',
  },
  {
    id: 1,
    code: '01',
    text: 'itemType.product',
  },
  {
    id: 2,
    code: '02',
    text: 'itemType.semi',
  },
]

export const DEFAULT_ITEM_TYPES = {
  code: ['00', '04', '05', '06'],
}

export const DEFAULT_UNITS = [
  {
    id: 1,
    name: 'cm',
  },
  {
    id: 2,
    name: 'dm',
  },
  {
    id: 3,
    name: 'm',
  },
]

export const DEFAULT_UNITS_MAP = {
  1: 'cm',
  2: 'dm',
  3: 'm',
}

export const WEIGHT_UNITS = [
  {
    id: 1,
    name: 'g',
  },
  {
    id: 2,
    name: 'kg',
  },
  {
    id: 3,
    name: 'tấn',
  },
]

export const WEIGHT_UNITS_MAP = {
  1: 'g',
  2: 'kg',
  3: 'tấn',
}

export const WAREHOUSE_TRANSFERS_TYPE = [
  {
    id: 0,
    name: 'warehouseTransfer.1step',
  },
  {
    id: 1,
    name: 'warehouseTransfer.2step',
  },
]

export const BOM_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  // IN_PROGRESS: 2,
  // APPROVED: 3,
  // COMPLETED: 4,
  // REJECTED: 5,
}
export const BOM_STATUS_MAP = {
  [BOM_STATUS.PENDING]: 'bomStatus.pending',
  [BOM_STATUS.CONFIRMED]: 'bomStatus.confirmed',
  // [BOM_STATUS.IN_PROGRESS]: 'bomStatus.inProgress',
  // [BOM_STATUS.APPROVED]: 'bomStatus.approved',
  // [BOM_STATUS.REJECTED]: 'bomStatus.rejected',
  // [BOM_STATUS.COMPLETED]: 'bomStatus.completed',
}
export const BOM_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'bomStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'bomStatus.confirmed',
    color: 'confirmed',
  },
  // {
  //   id: 2,
  //   text: 'bomStatus.inProgress',
  //   color: 'inprogress',
  // },
  // {
  //   id: 3,
  //   text: 'bomStatus.approved',
  //   color: 'approved',
  // },
  // {
  //   id: 4,
  //   text: 'bomStatus.completed',
  //   color: 'completed',
  // },
  // {
  //   id: 5,
  //   text: 'bomStatus.rejected',
  //   color: 'rejected',
  // },
]

export const ROUTING_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const ROUTING_STATUS_MAP = {
  [ROUTING_STATUS.PENDING]: 'orderStatus.pending',
  [ROUTING_STATUS.CONFIRMED]: 'orderStatus.confirmed',
}

export const ROUTING_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
]

export const ROUTING_VERSION_STATUS = {
  CREATED: 0,
  CONFIRMED: 1,
}

export const ROUTING_VERSION_STATUS_MAP = {
  [ROUTING_VERSION_STATUS.PENDING]: 'orderStatus.pending',
  [ROUTING_VERSION_STATUS.CONFIRMED]: 'orderStatus.confirmed',
}

export const ROUTING_VERSION_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
  },
]
export const QUALITY_REPORT_SCREEN_TYPE = {
  QUALITY_REPORT_LIST: 'QUALITY_REPORT_LIST',
  QUALITY_REPORT_DETAIL: 'QUALITY_REPORT_DETAIL',
}
export const BOM_STATUS_TO_DELETE = [BOM_STATUS.PENDING, BOM_STATUS.REJECTED]
export const BOM_STATUS_TO_CONFIRM = [BOM_STATUS.PENDING, BOM_STATUS.REJECTED]
export const BOM_STATUS_TO_EDIT = [BOM_STATUS.PENDING, BOM_STATUS.REJECTED]
export const BOM_STATUS_TO_CREATE_WORK_ORDER = [
  BOM_STATUS.CONFIRMED,
  BOM_STATUS.COMPLETED,
]

export const BOQ_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}

export const BOQ_STATUS_MAP = {
  [BOQ_STATUS.PENDING]: 'boqStatus.pending',
  [BOQ_STATUS.CONFIRMED]: 'boqStatus.confirmed',
  [BOQ_STATUS.IN_PROGRESS]: 'boqStatus.inProgress',
  [BOQ_STATUS.REJECTED]: 'boqStatus.rejected',
  [BOQ_STATUS.COMPLETED]: 'boqStatus.completed',
}

export const BOQ_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'boqStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'boqStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'boqStatus.rejected',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'boqStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'boqStatus.inProgress',
    color: 'inProgress',
  },
]
export const BOQ_STATUS_TO_DELETE = [BOQ_STATUS.PENDING, BOQ_STATUS.REJECTED]
export const BOQ_STATUS_TO_CONFIRM = [BOQ_STATUS.PENDING, BOQ_STATUS.REJECTED]
export const BOQ_STATUS_TO_EDIT = [BOQ_STATUS.PENDING, BOQ_STATUS.REJECTED]
export const BOQ_STATUS_PLAN = [BOQ_STATUS.COMPLETED, BOQ_STATUS.IN_PROGRESS]

export const BOQ_STATUS_OPTIONS_FILTER = [
  {
    id: 0,
    text: 'boqStatus.pending',
  },
  {
    id: 1,
    text: 'boqStatus.confirmed',
  },
]

export const PLAN_STATUS = {
  REJECTED: 0,
  CREATED: 1,
  CONFIRMED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}

export const PLAN_STATUS_MAP = {
  [PLAN_STATUS.REJECTED]: 'planStatus.rejected',
  [PLAN_STATUS.CREATED]: 'planStatus.created',
  [PLAN_STATUS.CONFIRMED]: 'planStatus.confirmed',
  [PLAN_STATUS.IN_PROGRESS]: 'planStatus.inProgress',
  [PLAN_STATUS.COMPLETED]: 'planStatus.completed',
}

export const PLAN_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'planStatus.rejected',
    color: 'rejected',
  },
  {
    id: 1,
    text: 'planStatus.created',
    color: 'created',
  },
  {
    id: 2,
    text: 'planStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 3,
    text: 'planStatus.inProgress',
    color: 'inprogress',
  },
  {
    id: 4,
    text: 'planStatus.completed',
    color: 'completed',
  },
]

export const PLAN_STATUS_TO_DELETE = [PLAN_STATUS.CREATED, PLAN_STATUS.REJECTED]
export const PLAN_STATUS_TO_CONFIRM = [
  PLAN_STATUS.CREATED,
  PLAN_STATUS.REJECTED,
]
export const PLAN_STATUS_TO_EDIT = [PLAN_STATUS.CREATED, PLAN_STATUS.REJECTED]

export const BOMTYPE = {
  PARENT: 'id',
  CHILD: 'bomParentId',
}
export const IS_PRODUCT_OBJECT = {
  TRUE: true,
  FALSE: false,
}

export const USER_ROLE = {
  PROJECT_MANAGER: {
    code: '03',
    name: 'PM',
  },
  LEADER: {
    code: '01',
    name: 'Leader',
  },
}
export const ITEM_TYPE_PRODUCT = 2

export const PROGRESS_STATUS = {
  NOT_IMPLEMENTED: 1,
  FINISHED: 2,
  LATE: 3,
}

export const PROGRESS_STATUS_MAP = {
  [PROGRESS_STATUS.NOT_IMPLEMENTED]: 'progressStatus.not_implemented',
  [PROGRESS_STATUS.FINISHED]: 'progressStatus.finished',
  [PROGRESS_STATUS.LATE]: 'progressStatus.late',
}

export const PROGRESS_STATUS_OPTIONS = [
  {
    id: 1,
    text: 'progressStatus.not_implemented',
  },
  {
    id: 2,
    text: 'progressStatus.finished',
  },
  {
    id: 3,
    text: 'progressStatus.late',
  },
]
export const PRODUCING_STEP_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  APPROVED: 5,
}
export const PRODUCING_STEP_STATUS_MAP = {
  [PRODUCING_STEP_STATUS.PENDING]: 'producingStepStatus.pending',
  [PRODUCING_STEP_STATUS.CONFIRMED]: 'producingStepStatus.confirmed',
  [PRODUCING_STEP_STATUS.IN_PROGRESS]: 'producingStepStatus.inProgress',
  [PRODUCING_STEP_STATUS.APPROVED]: 'producingStepStatus.approved',
  [PRODUCING_STEP_STATUS.REJECTED]: 'producingStepStatus.rejected',
  [PRODUCING_STEP_STATUS.COMPLETED]: 'producingStepStatus.completed',
}
export const PRODUCING_STEP_OPTIONS = [
  {
    id: 0,
    text: 'producingStepStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'producingStepStatus.confirmed',
    color: 'confirmed',
  },
]
export const PRODUCING_STEP_STATUS_TO_CONFIRM = [
  PRODUCING_STEP_STATUS.PENDING,
  PRODUCING_STEP_STATUS.REJECTED,
]

export const PRODUCING_STEP_STATUS_TO_EDIT = [
  PRODUCING_STEP_STATUS.PENDING,
  PRODUCING_STEP_STATUS.REJECTED,
]

export const PRODUCING_STEP_STATUS_TO_DELETE = [
  PRODUCING_STEP_STATUS.PENDING,
  PRODUCING_STEP_STATUS.REJECTED,
]
export const WORK_TIME_OPTIONS = [
  {
    id: 0,
    name: 'workCenter.workTime.standard',
  },
  {
    id: 1,
    name: 'workCenter.workTime.other',
  },
]

export const MO_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}

export const MO_STATUS_MAP = {
  [MO_STATUS.PENDING]: 'moStatus.pending',
  [MO_STATUS.CONFIRMED]: 'moStatus.confirmed',
  [MO_STATUS.IN_PROGRESS]: 'moStatus.inProgress',
  [MO_STATUS.REJECTED]: 'moStatus.rejected',
  [MO_STATUS.COMPLETED]: 'moStatus.completed',
}

export const MO_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'moStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'moStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'moStatus.rejected',
    color: 'rejected',
  },
  {
    id: 3,
    text: 'moStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'moStatus.completed',
    color: 'completed',
  },
]

export const MO_STATUS_TO_DELETE = [MO_STATUS.PENDING, MO_STATUS.REJECTED]
export const MO_STATUS_TO_CONFIRM = [MO_STATUS.PENDING, MO_STATUS.REJECTED]
export const MO_STATUS_TO_EDIT = [MO_STATUS.PENDING, MO_STATUS.REJECTED]
export const MO_STATUS_PLAN = [MO_STATUS.COMPLETED, MO_STATUS.IN_PROGRESS]

export const SALE_ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const SALE_ORDER_STATUS_MAP = {
  [SALE_ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [SALE_ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
}

export const SALE_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
]

export const PURCHASED_ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}

export const PURCHASED_ORDER_STATUS_MAP = {
  [PURCHASED_ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [PURCHASED_ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [PURCHASED_ORDER_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [PURCHASED_ORDER_STATUS.APPROVED]: 'orderStatus.approved',
  [PURCHASED_ORDER_STATUS.COMPLETED]: 'orderStatus.completed',
  [PURCHASED_ORDER_STATUS.REJECTED]: 'orderStatus.rejected',
}

export const PURCHASED_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'orderStatus.approved',
    color: 'approved',
  },
  {
    id: 4,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
]

export const WMS_URL = process.env.REACT_APP_WMS_URL
export const STAGES_OPTION = {
  PO_IMPORT: 0,
  PRO_IMPORT: 2,
  PRO_EXPORT: 3,
  SO_EXPORT: 5,
  PRODUCTION_OUTPUT: 8,
  PRODUCTION_INPUT: 9,
}

export const DETAIL_SCHEDULE_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}
export const PROGRESS_MANUFACTURING_BY_ORDER_STATUS_OPTION = [
  {
    id: 0,
    text: 'progressManufacturingByOrderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'progressManufacturingByOrderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'progressManufacturingByOrderStatus.rejected',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'progressManufacturingByOrderStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'progressManufacturingByOrderStatus.inProgress',
    color: 'inprogress',
  },
]
export const DETAIL_SCHEDULE_STATUS_MAP = {
  [DETAIL_SCHEDULE_STATUS.PENDING]: 'detailScheduleStatus.pending',
  [DETAIL_SCHEDULE_STATUS.CONFIRMED]: 'detailScheduleStatus.confirmed',
  [DETAIL_SCHEDULE_STATUS.IN_PROGRESS]: 'detailScheduleStatus.inProgress',
  [DETAIL_SCHEDULE_STATUS.REJECTED]: 'detailScheduleStatus.rejected',
  [DETAIL_SCHEDULE_STATUS.COMPLETED]: 'detailScheduleStatus.completed',
}

export const DETAIL_SCHEDULE_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'detailScheduleStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'detailScheduleStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'detailScheduleStatus.rejected',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'detailScheduleStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'detailScheduleStatus.inProgress',
    color: 'inprogress',
  },
]

export const DETAIL_SCHEDULE_STATUS_TO_DELETE = [
  DETAIL_SCHEDULE_STATUS.PENDING,
  DETAIL_SCHEDULE_STATUS.REJECTED,
]
export const DETAIL_SCHEDULE_STATUS_TO_CONFIRM = [
  DETAIL_SCHEDULE_STATUS.PENDING,
  DETAIL_SCHEDULE_STATUS.REJECTED,
]
export const DETAIL_SCHEDULE_STATUS_TO_EDIT = [
  DETAIL_SCHEDULE_STATUS.PENDING,
  DETAIL_SCHEDULE_STATUS.REJECTED,
  DETAIL_SCHEDULE_STATUS.IN_PROGRESS,
]

export const BOM_PRODUCING_STEP_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}
export const BOM_PRODUCING_STEP_STATUS_MAP = {
  [BOM_PRODUCING_STEP_STATUS.PENDING]: 'bomProducingStepStatus.pending',
  [BOM_PRODUCING_STEP_STATUS.CONFIRMED]: 'bomProducingStepStatus.confirmed',
  [BOM_PRODUCING_STEP_STATUS.IN_PROGRESS]: 'bomProducingStepStatus.inProgress',
  [BOM_PRODUCING_STEP_STATUS.APPROVED]: 'bomProducingStepStatus.approved',
  [BOM_PRODUCING_STEP_STATUS.REJECTED]: 'bomProducingStepStatus.rejected',
  [BOM_PRODUCING_STEP_STATUS.COMPLETED]: 'bomProducingStepStatus.completed',
}

export const BOM_PRODUCING_STEP_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'bomProducingStepStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'bomProducingStepStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'bomProducingStepStatus.inProgress',
    color: 'inprogress',
  },
  {
    id: 3,
    text: 'bomProducingStepStatus.approved',
    color: 'approved',
  },
  {
    id: 4,
    text: 'bomProducingStepStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'bomProducingStepStatus.rejected',
    color: 'rejected',
  },
]

export const BOM_PRODUCING_STEP_STATUS_TO_DELETE = [
  BOM_PRODUCING_STEP_STATUS.PENDING,
  BOM_PRODUCING_STEP_STATUS.REJECTED,
]
export const BOM_PRODUCING_STEP_STATUS_TO_CONFIRM = [
  BOM_PRODUCING_STEP_STATUS.PENDING,
  BOM_PRODUCING_STEP_STATUS.REJECTED,
]
export const BOM_PRODUCING_STEP_STATUS_TO_EDIT = [
  BOM_PRODUCING_STEP_STATUS.PENDING,
  BOM_PRODUCING_STEP_STATUS.REJECTED,
]

export const WORK_CENTER_PLAN_STATUS = {
  CREATED: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}

export const WORK_CENTER_PLAN_STATUS_MAP = {
  [WORK_CENTER_PLAN_STATUS.CREATED]: 'workCenterPlanStatus.created',
  [WORK_CENTER_PLAN_STATUS.CONFIRMED]: 'workCenterPlanStatus.confirmed',
  [WORK_CENTER_PLAN_STATUS.IN_PROGRESS]: 'workCenterPlanStatus.inProgress',
  [WORK_CENTER_PLAN_STATUS.REJECTED]: 'workCenterPlanStatus.rejected',
  [WORK_CENTER_PLAN_STATUS.COMPLETED]: 'workCenterPlanStatus.completed',
}

export const WORK_CENTER_PLAN_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'workCenterPlanStatus.created',
    color: 'created',
  },
  {
    id: 1,
    text: 'workCenterPlanStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'workCenterPlanStatus.rejected',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'workCenterPlanStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'workCenterPlanStatus.inProgress',
    color: 'inProgress',
  },
]
export const WORK_CENTER_PLAN_STATUS_TO_DELETE = [
  WORK_CENTER_PLAN_STATUS.CREATED,
  WORK_CENTER_PLAN_STATUS.REJECTED,
]
export const WORK_CENTER_PLAN_STATUS_TO_CONFIRM = [
  WORK_CENTER_PLAN_STATUS.CREATED,
  WORK_CENTER_PLAN_STATUS.REJECTED,
]
export const WORK_CENTER_PLAN_STATUS_TO_EDIT = [
  WORK_CENTER_PLAN_STATUS.IN_PROGRESS,
  WORK_CENTER_PLAN_STATUS.CONFIRMED,
  WORK_CENTER_PLAN_STATUS.REJECTED,
  WORK_CENTER_PLAN_STATUS.COMPLETED,
]
export const WORK_CENTER_PLAN_STATUS_TO_VIEW = [
  WORK_CENTER_PLAN_STATUS.IN_PROGRESS,
  WORK_CENTER_PLAN_STATUS.CONFIRMED,
  WORK_CENTER_PLAN_STATUS.REJECTED,
  WORK_CENTER_PLAN_STATUS.COMPLETED,
]

export const END_TIME = '23:59'
export const WORK_CENTER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}
export const WORK_CENTER_STATUS_MAP = {
  [WORK_CENTER_STATUS.PENDING]: 'workCenterStatus.pending',
  [WORK_CENTER_STATUS.CONFIRMED]: 'workCenterStatus.confirmed',
  [WORK_CENTER_STATUS.IN_PROGRESS]: 'workCenterStatus.inProgress',
  [WORK_CENTER_STATUS.APPROVED]: 'workCenterStatus.approved',
  [WORK_CENTER_STATUS.REJECTED]: 'workCenterStatus.rejected',
  [WORK_CENTER_STATUS.COMPLETED]: 'workCenterStatus.completed',
}
export const WORK_CENTER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'workCenterStatus.pending',
    color: 'pending',
  },
  {
    id: 2,
    text: 'workCenterStatus.confirmed',
    color: 'confirmed',
  },
]
export const WORK_CENTER_STATUS_TO_CONFIRM = [
  WORK_CENTER_STATUS.PENDING,
  WORK_CENTER_STATUS.REJECTED,
]
export const WORK_CENTER_STATUS_TO_EDIT = [
  WORK_CENTER_STATUS.PENDING,
  WORK_CENTER_STATUS.REJECTED,
]
export const WORK_CENTER_STATUS_CONFIRM_TO_EDIT = [
  WORK_CENTER_STATUS.IN_PROGRESS,
]
export const WORK_CENTER_STATUS_TO_DELETE = [
  WORK_CENTER_STATUS.PENDING,
  WORK_CENTER_STATUS.REJECTED,
]
export const EVENT_TYPE_OPTIONS = [
  { id: 0, name: 'planCalendar.holiday' },
  { id: 1, name: 'planCalendar.workingDay' },
]

export const MODERATION_TYPE = {
  EXTEND_DEADLINE: 1,
  SPREAD_EVENLY: 2,
  INPUT_MODERATION: 3,
}

export const MODERATION_TYPE_OPTIONS = [
  {
    id: MODERATION_TYPE.EXTEND_DEADLINE,
    text: 'defineMasterPlan.autoModeration.extendDeadline',
  },
  {
    id: MODERATION_TYPE.SPREAD_EVENLY,
    text: 'defineMasterPlan.autoModeration.spreadProductEvenly',
  },
  {
    id: MODERATION_TYPE.INPUT_MODERATION,
    text: 'defineMasterPlan.autoModeration.customProduct',
  },
]

export const USER_MANAGEMENT_STATUS = {
  TEMP_LOCKED: 0,
  ACTIVE: 1,
}

export const USER_MANAGEMENT_STATUS_MAP = {
  [USER_MANAGEMENT_STATUS.TEMP_LOCKED]: 'userStatus.tempLocked',
  [USER_MANAGEMENT_STATUS.ACTIVE]: 'userStatus.active',
}

export const USER_MANAGEMENT_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'userStatus.tempLocked',
    color: 'tempLocked',
  },
  {
    id: 1,
    text: 'userStatus.active',
    color: 'active',
  },
]

export const MASTER_PLAN_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'masterPlanStatus.created',
    color: 'created',
  },
  {
    id: 1,
    text: 'masterPlanStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'masterPlanStatus.rejected',
    color: 'rejected',
  },
  {
    id: 3,
    text: 'masterPlanStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'masterPlanStatus.completed',
    color: 'completed',
  },
]

export const MASTER_PLAN_STATUS = {
  CREATED: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}

export const PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  REJECTED: 4,
}

export const PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_MAP = {
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.PENDING]: 'orderStatus.pending',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.CONFIRMED]:
    'orderStatus.confirmed',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.IN_PROGRESS]:
    'orderStatus.inProgress',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.COMPLETED]:
    'orderStatus.completed',
  [PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS.REJECTED]:
    'orderStatus.rejected',
}

export const PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 4,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
]
