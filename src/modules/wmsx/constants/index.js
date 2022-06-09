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
  SEMI_PRODUCT: {
    id: 3,
    code: '03',
    name: 'itemType.semiProduct',
  },
  DEVICE: {
    id: 4,
    code: '04',
    name: 'itemType.device',
  },
  SUPPLY: {
    id: 5,
    code: '05',
    name: 'itemType.supply',
  },
  ACCESSORY: {
    id: 6,
    code: '06',
    name: 'itemType.accessory',
  },
}

export const PIE_CHART_COLORS = [
  '#0761AD',
  '#FF9054',
  '#B2DF8A',
  '#ff6361',
  '#58508d',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
]

export const LANGUAGES_ENUM = {
  VI: 0,
  EN: 1,
  JP: 2,
}

export const LANGUAGES_ENUM_MAP = {
  [LANGUAGES_ENUM.VI]: 'vi',
  [LANGUAGES_ENUM.EN]: 'en',
  [LANGUAGES_ENUM.JP]: 'jp',
}

export const DEFAULT_LANGUAGE = LANGUAGES_ENUM.VI

export const ORDER_TYPE_ENUM = {
  PO: 1,
  PRO: 2,
  SO: 3,
  Transfer: 4,
  IMO: 5,
}

export const TRANSACTION_TYPE_ENUM = {
  IMPORT: 0,
  EXPORT: 1,
}

export const END_OF_DAY = {
  HOUR: 23,
  MINUTE: 59,
  SECOND: 59,
}

export const START_OF_DAY = {
  HOUR: 0,
  MINUTE: 0,
  SECOND: 0,
}

export const BOOLEAN_ENUM = {
  FALSE: '0',
  TRUE: '1',
}

export const CODE_SETTINGS = {
  ITEM: {
    DOMAIN: 'ITEM',
    PREFIX: '02',
    MAX_LENGTH: 7,
    FILLED_CHARACTER: '0',
  },
  BLOCK: {
    DOMAIN: 'BLOCK',
    PREFIX: '03',
    MAX_LENGTH: 12,
    FILLED_CHARACTER: '0',
  },
  PACKAGE: {
    DOMAIN: 'PACKAGE',
    PREFIX: '04',
    MAX_LENGTH: 12,
    FILLED_CHARACTER: '0',
  },
  PRODUCTION_ORDER: {
    DOMAIN: 'PRODUCTION_ORDER',
    PREFIX: 'PR',
    MAX_LENGTH: 10,
    FILLED_CHARACTER: '0',
  },
  PURCHASED_ORDER_IMPORT: {
    DOMAIN: 'PURCHASED_ORDER_IMPORT',
    PREFIX: 'PO',
    MAX_LENGTH: 10,
    FILLED_CHARACTER: '0',
  },
  IMPORT_MANUFACTURING_ORDER: {
    DOMAIN: 'IMPORT_MANUFACTURING_ORDER',
    PREFIX: 'IM',
    MAX_LENGTH: 10,
    FILLED_CHARACTER: '0',
  },
}

export const QC_CHECK = {
  TRUE: 1,
  FALSE: 0,
}

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
export const WAREHOUSE_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  APPROVED: 5,
}

export const WAREHOUSE_STATUS_TO_DELETE = [
  WAREHOUSE_STATUS.PENDING,
  WAREHOUSE_STATUS.REJECTED,
]

export const MOVEMENT_STATUS = [
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
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
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
  IMO_IMPORT: 8,
  EMO_EXPORT: 9,
}

export const MOVEMENT_TYPE_MAP = {
  [MOVEMENT_TYPE.PO_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.PO_EXPORT]: 'movements.export',
  [MOVEMENT_TYPE.PRO_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.PRO_EXPORT]: 'movements.export',
  [MOVEMENT_TYPE.SO_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.SO_EXPORT]: 'movements.export',
  [MOVEMENT_TYPE.TRANSFER_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.TRANSFER_EXPORT]: 'movements.export',
  [MOVEMENT_TYPE.IMO_IMPORT]: 'movements.import',
  [MOVEMENT_TYPE.EMO_EXPORT]: 'movements.export',
}

export const MOVEMENT_ORDER_TYPE_MAP = {
  [MOVEMENT_TYPE.PO_IMPORT]: 'movements.purchasedOrder',
  [MOVEMENT_TYPE.PO_EXPORT]: 'movements.purchasedOrder',
  [MOVEMENT_TYPE.PRO_IMPORT]: 'movements.productionOrder',
  [MOVEMENT_TYPE.PRO_EXPORT]: 'movements.productionOrder',
  [MOVEMENT_TYPE.SO_IMPORT]: 'movements.saleOrder',
  [MOVEMENT_TYPE.SO_EXPORT]: 'movements.saleOrder',
  [MOVEMENT_TYPE.TRANSFER_IMPORT]: 'movements.transferOrder',
  [MOVEMENT_TYPE.TRANSFER_EXPORT]: 'movements.transferOrder',
}

export const MOVEMENT_WAREHOUSE_TRANSFER_ORDER_TYPE_MAP_TEXT = {
  [MOVEMENT_TYPE.TRANSFER_IMPORT]: 'warehouseTransferMovement.transferImport',
  [MOVEMENT_TYPE.TRANSFER_EXPORT]: 'warehouseTransferMovement.transferExport',
}

export const ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
  INRECEIVING: 6,
  RECEIVED: 7,
  DELIVERED: 8,
  INCOLLECTING: 9,
  COLLECTED: 10,
  EXPORTED: 11,
}

export const ORDER_STATUS_MAP = {
  [ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [ORDER_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [ORDER_STATUS.REJECTED]: 'orderStatus.rejected',
  [ORDER_STATUS.COMPLETED]: 'orderStatus.completed',
  [ORDER_STATUS.INRECEIVING]: 'orderStatus.inReceiving',
  [ORDER_STATUS.RECEIVED]: 'orderStatus.received',
  [ORDER_STATUS.DELIVERED]: 'orderStatus.delivered',
  [ORDER_STATUS.INCOLLECTING]: 'orderStatus.inCollecting',
  [ORDER_STATUS.COLLECTED]: 'orderStatus.collected',
  [ORDER_STATUS.EXPORTED]: 'orderStatus.exported',
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
    id: 4,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
  {
    id: 6,
    text: 'orderStatus.inReceiving',
  },
  {
    id: 7,
    text: 'orderStatus.received',
  },
  {
    id: 8,
    text: 'orderStatus.delivered',
  },
  {
    id: 9,
    text: 'orderStatus.inCollecting',
  },
  {
    id: 10,
    text: 'orderStatus.collected',
  },
  {
    id: 11,
    text: 'orderStatus.exported',
    color: 'completed',
  },
]

export const ORDER_TYPE = [
  {
    id: 0,
    name: 'orderType.import',
  },
  {
    id: 1,
    name: 'orderType.export',
  },
]

export const TRANSFER_STATUS = {
  PENDING: 0,
  COMPLETED: 2,
  REJECTED: 3,
  CONFIRMED: 4,
  EXPORTING: 5,
}

export const TRANSFER_STATUS_MAP = {
  [TRANSFER_STATUS.PENDING]: 'warehouseTransfer.transferStatus.pending',
  [TRANSFER_STATUS.COMPLETED]: 'warehouseTransfer.transferStatus.completed',
  [TRANSFER_STATUS.REJECTED]: 'warehouseTransfer.transferStatus.rejected',
  [TRANSFER_STATUS.CONFIRMED]: 'warehouseTransfer.transferStatus.confirmed',
  [TRANSFER_STATUS.EXPORTING]: 'warehouseTransfer.transferStatus.exporting',
}
export const TRANSFER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'warehouseTransfer.transferStatus.pending',
    color: 'pending',
  },
  {
    id: 2,
    text: 'warehouseTransfer.transferStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'warehouseTransfer.transferStatus.rejected',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'warehouseTransfer.transferStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 5,
    text: 'warehouseTransfer.transferStatus.exporting',
    color: 'exporting',
  },
]

export const DEFINE_CURRENCY_UNIT_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}

export const DEFINE_CURRENCY_UNIT_STATUS_MAP = {
  [DEFINE_CURRENCY_UNIT_STATUS.PENDING]: 'defineCurrencyUnit.pending',
  [DEFINE_CURRENCY_UNIT_STATUS.ACTIVE]: 'defineCurrencyUnit.active',
  [DEFINE_CURRENCY_UNIT_STATUS.DISABLED]: 'defineCurrencyUnit.disabled',
}

export const DEFINE_CURRENCY_UNIT_OPTIONS = [
  {
    id: 0,
    text: 'defineCurrencyUnit.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'defineCurrencyUnit.active',
    color: 'completed',
  },
  {
    id: 2,
    text: 'defineCurrencyUnit.disabled',
    color: 'rejected',
  },
]

export const DEFINE_SERVICE_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}

export const DEFINE_SERVICE_STATUS_MAP = {
  [DEFINE_CURRENCY_UNIT_STATUS.PENDING]: 'defineService.pending',
  [DEFINE_CURRENCY_UNIT_STATUS.ACTIVE]: 'defineService.active',
  [DEFINE_CURRENCY_UNIT_STATUS.DISABLED]: 'defineService.disabled',
}

export const DEFINE_SERVICE_OPTIONS = [
  {
    id: 0,
    text: 'defineService.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'defineService.active',
    color: 'completed',
  },
  {
    id: 2,
    text: 'defineService.disabled',
    color: 'rejected',
  },
]

export const DEFINE_TYPE_UNIT_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}

export const DEFINE_TYPE_SERVICE_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}

export const DEFINE_TYPE_UNIT_STATUS_MAP = {
  [DEFINE_TYPE_UNIT_STATUS.PENDING]: 'defineTypeUnit.pending',
  [DEFINE_TYPE_UNIT_STATUS.ACTIVE]: 'defineTypeUnit.active',
  [DEFINE_TYPE_UNIT_STATUS.DISABLED]: 'defineTypeUnit.disabled',
}

export const DEFINE_TYPE_SERVICE_STATUS_MAP = {
  [DEFINE_TYPE_SERVICE_STATUS.PENDING]: 'defineTypeService.pending',
  [DEFINE_TYPE_SERVICE_STATUS.ACTIVE]: 'defineTypeService.active',
  [DEFINE_TYPE_SERVICE_STATUS.DISABLED]: 'defineTypeService.disabled',
}

export const DEFINE_TYPE_UNIT_OPTIONS = [
  {
    id: 0,
    text: 'defineTypeUnit.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'defineTypeUnit.active',
    color: 'completed',
  },
  {
    id: 2,
    text: 'defineTypeUnit.disabled',
    color: 'rejected',
  },
]

export const TRANSFER_MOVEMENT_TYPE_OPTIONS = [
  {
    id: 6,
    name: 'warehouseTransferMovement.transferImport',
  },
  {
    id: 7,
    name: 'warehouseTransferMovement.transferExport',
  },
]

export const WAREHOUSE_IMPORT_STATUS = {
  PO: 0,
  PRO: 2,
  TRANSFER: 6,
  IMO: 8,
}

export const WAREHOUSE_IMPORT_STATUS_MAP = {
  [WAREHOUSE_IMPORT_STATUS.PO]: 'movementsStatus.po',
  [WAREHOUSE_IMPORT_STATUS.PRO]: 'movementsStatus.pro',
  [WAREHOUSE_IMPORT_STATUS.TRANSFER]: 'movementsStatus.transfer',
  [WAREHOUSE_IMPORT_STATUS.IMO]: 'movementsStatus.imo',
}
export const WAREHOUSE_IMPORT_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'movementsStatus.po',
  },
  {
    id: 2,
    text: 'movementsStatus.pro',
  },
  {
    id: 6,
    text: 'movementsStatus.transfer',
  },
  {
    id: 8,
    text: 'movementsStatus.imo',
  },
]

export const WAREHOUSE_EXPORT_STATUS = {
  PRO: 3,
  SO: 5,
  TRANSFER: 7,
  EXO: 9,
}

export const WAREHOUSE_EXPORT_STATUS_MAP = {
  [WAREHOUSE_EXPORT_STATUS.PRO]: 'movementsStatus.pro',
  [WAREHOUSE_EXPORT_STATUS.SO]: 'movementsStatus.so',
  [WAREHOUSE_EXPORT_STATUS.TRANSFER]: 'movementsStatus.transfer',
  [WAREHOUSE_EXPORT_STATUS.EXO]: 'movementsStatus.exo',
}

export const WAREHOUSE_EXPORT_STATUS_OPTIONS = [
  {
    id: 3,
    text: 'movementsStatus.pro',
  },
  {
    id: 5,
    text: 'movementsStatus.so',
  },
  {
    id: 7,
    text: 'movementsStatus.transfer',
  },
  {
    id: 9,
    text: 'movementsStatus.exo',
  },
]

export const INVENTORY_CALENDAR_STATUS = {
  PENDING: 1,
  CONFIRMED: 2,
  IN_PROGRESS: 5,
  COMPLETED: 4,
  REJECTED: 3,
}

export const INVENTORY_CALENDAR_STATUS_MAP = {
  [INVENTORY_CALENDAR_STATUS.PENDING]: 'orderStatus.pending',
  [INVENTORY_CALENDAR_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [INVENTORY_CALENDAR_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [INVENTORY_CALENDAR_STATUS.COMPLETED]: 'orderStatus.completed',
  [INVENTORY_CALENDAR_STATUS.REJECTED]: 'orderStatus.rejected',
}

export const INVENTORY_CALENDAR_STATUS_OPTIONS = [
  {
    id: 1,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 2,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 5,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
]

export const DEFINE_BILL_STATUS = {
  PENDING: 0,
  WAIT_FOR_PAY: 1,
  PAID: 2,
  REJECTED: 3,
}

export const DEFINE_BILL_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'defineBill.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'defineBill.waitForPay',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'defineBill.paid',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'defineBill.rejected',
    color: 'rejected',
  },
]

export const DEFINE_VOUCHER_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}

export const SPACE_UNITS = [
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

export const CUSTOMER_LEVEL_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}
export const CUSTOMER_LEVEL_STATUS_MAP = {
  [CUSTOMER_LEVEL_STATUS.PENDING]: 'defineCustomerLevel.pending',
  [CUSTOMER_LEVEL_STATUS.ACTIVE]: 'defineCustomerLevel.active',
  [CUSTOMER_LEVEL_STATUS.DISABLED]: 'defineCustomerLevel.disabled',
}
export const CUSTOMER_LEVEL_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'defineCustomerLevel.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'defineCustomerLevel.active',
    color: 'active',
  },
  {
    id: 2,
    text: 'defineCustomerLevel.disabled',
    color: 'tempLocked',
  },
]
export const DEFINE_PAYMENT_TYPE_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}
export const DEFINE_PAYMENT_TYPE_STATUS_MAP = [
  {
    id: 0,
    text: 'definePaymentType.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'definePaymentType.confirmed',
    color: 'confirmed',
  },
]
export const DEFINE_INVOICE_TYPE_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}
export const DEFINE_INVOICE_TYPE_STATUS_OPTION = [
  {
    id: 0,
    text: 'definePaymentType.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'definePaymentType.confirmed',
    color: 'confirmed',
  },
]
export const SERVICE_PRICE_TYPE = [
  { value: 0, suffix: 'defineService.day' },
  { value: 1, suffix: 'defineService.month' },
  { value: 2, suffix: 'defineService.quarter' },
  { value: 3, suffix: 'defineService.year' },
]

export const WAREHOUSE_MOVEMENT_ORDER_TYPE = {
  POI: 0,
  PO: 1,
  PRO: 2,
  SO: 3,
  TRANSFER: 4,
  IMO: 5,
  EXO: 6,
}

export const WAREHOUSE_MOVEMENT_ORDER_TYPE_MAP = {
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.POI]: 'warehouseMovementOrderType.poi',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.PO]: 'warehouseMovementOrderType.po',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.PRO]: 'warehouseMovementOrderType.pro',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.SO]: 'warehouseMovementOrderType.so',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.TRANSFER]:
    'warehouseMovementOrderType.transfer',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.IMO]: 'warehouseMovementOrderType.imo',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.EXO]: 'warehouseMovementOrderType.exo',
}

export const WAREHOUSE_MOVEMENT_ORDER_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'warehouseMovementOrderType.poi',
  },
  {
    id: 1,
    text: 'warehouseMovementOrderType.po',
  },
  {
    id: 2,
    text: 'warehouseMovementOrderType.pro',
  },
  {
    id: 3,
    text: 'warehouseMovementOrderType.so',
  },
  {
    id: 6,
    text: 'warehouseMovementOrderType.transfer',
  },
  {
    id: 5,
    text: 'warehouseMovementOrderType.imo',
  },
  {
    id: 7,
    text: 'warehouseMovementOrderType.exo',
  },
]

export const WAREHOUSE_MOVEMENT_STATUS = {
  CREATED: 0,
  APPROVED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 4,
}

export const WAREHOUSE_MOVEMENT_STATUS_MAP = {
  [WAREHOUSE_MOVEMENT_STATUS.CREATED]: 'warehouseMovementStatus.created',
  [WAREHOUSE_MOVEMENT_STATUS.APPROVED]: 'warehouseMovementStatus.approved',
  [WAREHOUSE_MOVEMENT_STATUS.IN_PROGRESS]: 'warehouseMovementStatus.inProgress',
  [WAREHOUSE_MOVEMENT_STATUS.COMPLETED]: 'warehouseMovementStatus.completed',
}

export const WAREHOUSE_MOVEMENT_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'warehouseMovementStatus.created',
    color: 'pending',
  },
  {
    id: 1,
    text: 'warehouseMovementStatus.approved',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'warehouseMovementStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'warehouseMovementStatus.completed',
    color: 'completed',
  },
]

export const ORDER_STATUS_SO_EXPORT = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
  INRECEIVING: 6,
  RECEIVED: 7,
  DELIVERED: 8,
  INCOLLECTING: 9,
  COLLECTED: 10,
  EXPORTED: 11,
}

export const ORDER_STATUS_SO_EXPORT_OPTIONS = [
  {
    id: 0,
    text: 'orderStatusSoExport.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatusSoExport.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'orderStatusSoExport.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'orderStatusSoExport.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'orderStatusSoExport.rejected',
    color: 'rejected',
  },
  {
    id: 6,
    text: 'orderStatusSoExport.inReceiving',
    color: 'InReceiving',
  },
  {
    id: 7,
    text: 'orderStatusSoExport.received',
    color: 'received',
  },
  {
    id: 8,
    text: 'orderStatusSoExport.delivered',
    color: 'delivered',
  },
  {
    id: 9,
    text: 'orderStatusSoExport.inCollecting',
    color: 'inCollecting',
  },
  {
    id: 10,
    text: 'orderStatusSoExport.collected',
    color: 'collected',
  },
  {
    id: 11,
    text: 'orderStatusSoExport.exported',
    color: 'exported',
  },
]
export const DRAG_TYPE = {
  SECTOR: 'sector',
  DOOR: 'door',
}

export const UNIT_ENUM = {
  M: 3,
  DM: 2,
  CM: 1,
}
export const WAREHOUSE_DOOR = {
  WIDTH: 68,
  HEIGHT: 66,
}
export const DISTANCE_BETWEEN_SECTORS = 5
export const CM_TO_PIXEL = 37.7952755906
