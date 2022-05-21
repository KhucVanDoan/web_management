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

export const DEFINE_TYPE_UNIT_STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  DISABLED: 2,
}

export const DEFINE_TYPE_UNIT_STATUS_MAP = {
  [DEFINE_TYPE_UNIT_STATUS.PENDING]: 'defineTypeUnit.pending',
  [DEFINE_TYPE_UNIT_STATUS.ACTIVE]: 'defineTypeUnit.active',
  [DEFINE_TYPE_UNIT_STATUS.DISABLED]: 'defineTypeUnit.disabled',
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
  PRO: 1,
  SO: 2,
  TRANSFER: 3,
}

export const WAREHOUSE_IMPORT_STATUS_MAP = {
  [WAREHOUSE_IMPORT_STATUS.PO]: 'movementsStatus.po',
  [WAREHOUSE_IMPORT_STATUS.PRO]: 'movementsStatus.pro',
  [WAREHOUSE_IMPORT_STATUS.SO]: 'movementsStatus.so',
  [WAREHOUSE_IMPORT_STATUS.TRANSFER]: 'movementsStatus.transfer',
}
export const WAREHOUSE_IMPORT_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'movementsStatus.po',
  },
  {
    id: 1,
    text: 'movementsStatus.pro',
  },
  {
    id: 2,
    text: 'movementsStatus.so',
  },
  {
    id: 3,
    text: 'movementsStatus.transfer',
  },
]

export const WAREHOUSE_EXPORT_STATUS = {
  PO: 0,
  PRO: 1,
  SO: 2,
  TRANSFER: 3,
}

export const WAREHOUSE_EXPORT_STATUS_MAP = {
  [WAREHOUSE_EXPORT_STATUS.PO]: 'movementsStatus.po',
  [WAREHOUSE_EXPORT_STATUS.PRO]: 'movementsStatus.pro',
  [WAREHOUSE_EXPORT_STATUS.SO]: 'movementsStatus.so',
  [WAREHOUSE_EXPORT_STATUS.TRANSFER]: 'movementsStatus.transfer',
}

export const WAREHOUSE_EXPORT_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'movementsStatus.po',
  },
  {
    id: 1,
    text: 'movementsStatus.pro',
  },
  {
    id: 2,
    text: 'movementsStatus.so',
  },
  {
    id: 3,
    text: 'movementsStatus.transfer',
  },
]

export const INVENTORY_CALENDAR_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}

export const INVENTORY_CALENDAR_STATUS_MAP = {
  [ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [ORDER_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [ORDER_STATUS.APPROVED]: 'orderStatus.approved',
  [ORDER_STATUS.COMPLETED]: 'orderStatus.completed',
  [ORDER_STATUS.REJECTED]: 'orderStatus.rejected',
}

export const INVENTORY_CALENDAR_STATUS_OPTIONS = [
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
