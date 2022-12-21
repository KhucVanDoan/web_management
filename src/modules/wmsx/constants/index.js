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
    MAX_LENGTH: 2,
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

export const PALLET_ITEM_STORAGE_TYPE = {
  GROUP: 0,
  SINGLE: 1,
}

export const PALLET_ITEM_STORAGE_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'definePallet.palletGroupItem',
  },
  {
    id: 1,
    text: 'definePallet.palletSingleItem',
  },
]

export const PALLET_ITEM_STORAGE_TYPE_MAP = {
  [PALLET_ITEM_STORAGE_TYPE.GROUP]: 'definePallet.palletGroupItem',
  [PALLET_ITEM_STORAGE_TYPE.SINGLE]: 'definePallet.palletSingleItem',
}

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
  PO_IMPORT: 0, // Cất hàng
  PO_EXPORT: 1, // bỏ
  PRO_IMPORT: 2, // bỏ
  PRO_EXPORT: 3, // bỏ
  SO_IMPORT: 4, // bỏ
  SO_EXPORT: 5, // xuất kho
  TRANSFER_IMPORT: 6, // nhập chuyển kho
  TRANSFER_EXPORT: 7, // xuất chuyển kho
  IMO_IMPORT: 8, // bỏ
  EMO_EXPORT: 9, // bỏ
  PO_IMPORT_RETURN: 10, // bỏ
  SO_EXPORT_RETURN: 11, // bỏ
  RETURN_IMPORT: 12, // bỏ
  RETURN_EXPORT: 13, // bỏ
  RETURN_PO_ERROR: 14, // bỏ
  RETURN_SO_ERROR: 15, // bỏ
  SWIFT_FLOOR_IMPORT: 16, // nhập đảo hàng
  SWIFT_FLOOR_EXPORT: 17, // xuất đảo hàng
  PO_IMPORT_RECEIVE: 18, // lấy hàng
  PO_EXPORT_RECEIVE: 19, // xuất lấy hàng
}

export const MOVEMENT_TYPE_MAP = {
  [MOVEMENT_TYPE.PO_IMPORT]: 'movementType.stored',
  [MOVEMENT_TYPE.PO_EXPORT]: 'movementType.export',
  [MOVEMENT_TYPE.PRO_IMPORT]: 'movementType.import',
  [MOVEMENT_TYPE.PRO_EXPORT]: 'movementType.warehouseExportReceipt',
  [MOVEMENT_TYPE.SO_IMPORT]: 'movementType.import',
  [MOVEMENT_TYPE.SO_EXPORT]: 'movementType.picked',
  [MOVEMENT_TYPE.TRANSFER_IMPORT]: 'movementType.stored',
  [MOVEMENT_TYPE.TRANSFER_EXPORT]: 'movementType.export',
  [MOVEMENT_TYPE.IMO_IMPORT]: 'movementType.import',
  [MOVEMENT_TYPE.EMO_EXPORT]: 'movementType.export',
  [MOVEMENT_TYPE.PO_IMPORT_RETURN]: 'movementType.import',
  [MOVEMENT_TYPE.SO_EXPORT_RETURN]: 'movementType.export',
  [MOVEMENT_TYPE.RETURN_IMPORT]: 'movementType.import',
  [MOVEMENT_TYPE.RETURN_EXPORT]: 'movementType.export',
  [MOVEMENT_TYPE.RETURN_PO_ERROR]: 'movementType.import',
  [MOVEMENT_TYPE.RETURN_SO_ERROR]: 'movementType.export',
  [MOVEMENT_TYPE.SWIFT_FLOOR_IMPORT]: 'movementType.stored',
  [MOVEMENT_TYPE.SWIFT_FLOOR_EXPORT]: 'movementType.picked',
  [MOVEMENT_TYPE.PO_IMPORT_RECEIVE]: 'movementType.import',
  [MOVEMENT_TYPE.PO_EXPORT_RECEIVE]: 'movementType.stored',
}

export const MOVEMENT_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'movementType.stored',
  },
  {
    id: 5,
    text: 'movementType.picked',
  },
  {
    id: 6,
    text: 'movementType.stored',
  },
  {
    id: 7,
    text: 'movementType.export',
  },
  {
    id: 16,
    text: 'movementType.stored',
  },
  {
    id: 17,
    text: 'movementType.picked',
  },
  {
    id: 18,
    text: 'movementType.import',
  },
  {
    id: 19,
    text: 'movementType.stored',
  },
]

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
  IN_RECEIVING: 6,
  RECEIVED: 7,
  DELIVERED: 8,
  IN_COLLECTING: 9,
  COLLECTED: 10,
  EXPORTED: 11,
  REJECTED_RECEIVED: 12,
  IN_PRODUCING: 13,
  PRODUCED: 14,
  IN_RETURNING: 15,
  RETURNED: 16,
  STORED: 17,
}

export const ORDER_STATUS_MAP = {
  [ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [ORDER_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [ORDER_STATUS.APPROVED]: 'returnOrderStatus.approved',
  [ORDER_STATUS.COMPLETED]: 'orderStatus.completed',
  [ORDER_STATUS.REJECTED]: 'orderStatus.rejected',
  [ORDER_STATUS.IN_RECEIVING]: 'orderStatus.inReceiving',
  [ORDER_STATUS.RECEIVED]: 'orderStatus.received',
  [ORDER_STATUS.DELIVERED]: 'orderStatus.delivered',
  [ORDER_STATUS.IN_COLLECTING]: 'orderStatus.inCollecting',
  [ORDER_STATUS.COLLECTED]: 'orderStatus.collected',
  [ORDER_STATUS.EXPORTED]: 'orderStatus.exported',
  [ORDER_STATUS.REJECTED_RECEIVED]: 'orderStatus.rejectedReceived',
  [ORDER_STATUS.IN_PRODUCING]: 'orderStatus.inProducing',
  [ORDER_STATUS.PRODUCED]: 'orderStatus.produced',
  [ORDER_STATUS.IN_RETURNING]: 'orderStatus.inReturning',
  [ORDER_STATUS.RETURNED]: 'orderStatus.returned',
  [ORDER_STATUS.STORED]: 'orderStatus.stored',
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
  // {
  //   id: 3,
  //   text: 'orderStatus.approved',
  //   color: 'approved',
  // },
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
    color: 'inReceiving',
  },
  {
    id: 7,
    text: 'orderStatus.received',
    color: 'received',
  },
  // {
  //   id: 8,
  //   text: 'orderStatus.delivered',
  //   color: 'delivered',
  // },
  {
    id: 9,
    text: 'orderStatus.inCollecting',
    color: 'inCollecting',
  },
  {
    id: 10,
    text: 'orderStatus.collected',
    color: 'collected',
  },
  // {
  //   id: 11,
  //   text: 'orderStatus.exported',
  //   color: 'completed',
  // },
  {
    id: 12,
    text: 'orderStatus.rejectedReceived',
    color: 'rejectedReceived',
  },
  // {
  //   id: 13,
  //   text: 'orderStatus.inProducing',
  //   color: 'inProducing',
  // },
  // {
  //   id: 14,
  //   text: 'orderStatus.produced',
  //   color: 'produced',
  // },
  {
    id: 15,
    text: 'orderStatus.inReturning',
    color: 'inReturning',
  },
  {
    id: 16,
    text: 'orderStatus.returned',
    color: 'returned',
  },
  {
    id: 17,
    text: 'orderStatus.stored',
    color: 'stored',
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

export const PAYMENT_STATUS_OPTION = [
  {
    id: 0,
    text: 'paymentStatus.wait',
    color: 'pending',
  },
  {
    id: 1,
    text: 'paymentStatus.part',
    color: 'inProgress',
  },
  {
    id: 2,
    text: 'paymentStatus.paid',
    color: 'confirmed',
  },
]

export const LOCATION_SETTING_TYPE = {
  EVEN: 0,
  ODD: 1,
}

export const LOCATION_SETTING_TYPE_OPTION = [
  {
    id: 0,
    text: 'locationType.even',
    color: 'pending',
  },
  {
    id: 1,
    text: 'locationType.odd',
    color: 'confirmed',
  },
]

export const TRANSFER_STATUS = {
  PENDING: 0,
  COMPLETED: 2,
  REJECTED: 3,
  CONFIRMED: 4,
  INCOLLECTING: 12,
  EXPORTING: 5,
  INRECEIVING: 6,
  RECEIVED: 7,
  // INCOLLECTING: 8,
  COLLECTED: 9,
  EXPORTED: 10,
  INSTORING: 11,
}

export const TRANSFER_STATUS_MAP = {
  [TRANSFER_STATUS.PENDING]: 'warehouseTransfer.transferStatus.pending',
  [TRANSFER_STATUS.COMPLETED]: 'warehouseTransfer.transferStatus.completed',
  [TRANSFER_STATUS.REJECTED]: 'warehouseTransfer.transferStatus.rejected',
  [TRANSFER_STATUS.CONFIRMED]: 'warehouseTransfer.transferStatus.confirmed',
  [TRANSFER_STATUS.IN_PROGRESS]: 'warehouseTransfer.transferStatus.inProgress',
  [TRANSFER_STATUS.EXPORTING]: 'warehouseTransfer.transferStatus.exporting',
  [TRANSFER_STATUS.INRECEIVING]: 'warehouseTransfer.transferStatus.inReceiving',
  [TRANSFER_STATUS.RECEIVED]: 'warehouseTransfer.transferStatus.received',
  [TRANSFER_STATUS.INCOLLECTING]:
    'warehouseTransfer.transferStatus.incollecting',
  [TRANSFER_STATUS.COLLECTED]: 'warehouseTransfer.transferStatus.collected',
  [TRANSFER_STATUS.EXPORTED]: 'warehouseTransfer.transferStatus.exported',
  [TRANSFER_STATUS.INSTORING]: 'warehouseTransfer.transferStatus.inStoring',
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
  {
    id: 7,
    text: 'warehouseTransfer.transferStatus.received',
    color: 'received',
  },
  // {
  //   id: 8,
  //   text: 'warehouseTransfer.transferStatus.incollecting',
  //   color: 'incollecting',
  // },
  {
    id: 10,
    text: 'warehouseTransfer.transferStatus.exported',
    color: 'exported',
  },
  {
    id: 11,
    text: 'warehouseTransfer.transferStatus.inStoring',
    color: 'inStoring',
  },
  {
    id: 12,
    text: 'warehouseTransfer.transferStatus.incollecting',
    color: 'inProgress',
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

export const WAREHOUSE_IMPORT_TYPE = {
  PO: 1, //phiếu nhập kho
  TRANSFER: 4, //lệnh chuyển kho
  SWIFT_LOCATOR: 9, //đảo hàng
  INVENTORY: 10, //điều chuyển tồn kho fake
}

export const WAREHOUSE_IMPORT_TYPE_MAP = {
  [WAREHOUSE_IMPORT_TYPE.PO]: 'warehouseMovementOrderType.po',
  [WAREHOUSE_IMPORT_TYPE.TRANSFER]: 'warehouseMovementOrderType.transfer',
  [WAREHOUSE_IMPORT_TYPE.SWIFT_LOCATOR]:
    'warehouseMovementOrderType.swiftLocator',
  [WAREHOUSE_IMPORT_TYPE.INVENTORY]: 'warehouseMovementOrderType.inventory',
}
export const WAREHOUSE_IMPORT_TYPE_OPTIONS = [
  {
    id: 1,
    text: 'warehouseMovementOrderType.po',
  },
  {
    id: 10,
    text: 'warehouseMovementOrderType.inventory',
  },
  {
    id: 4,
    text: 'warehouseMovementOrderType.transfer',
  },
  {
    id: 9,
    text: 'warehouseMovementOrderType.swiftLocator',
  },
]

export const WAREHOUSE_EXPORT_TYPE = {
  SO: 3, //phiếu xuất kho
  TRANSFER: 4, //lệnh chuyển kho
  SWIFT_LOCATOR: 9, //đảo hàng
  INVENTORY: 10, //điều chuyển tồn kho fake
}

export const WAREHOUSE_EXPORT_TYPE_MAP = {
  [WAREHOUSE_EXPORT_TYPE.SO]: 'warehouseMovementOrderType.so',
  [WAREHOUSE_EXPORT_TYPE.TRANSFER]: 'warehouseMovementOrderType.transfer',
  [WAREHOUSE_EXPORT_TYPE.SWIFT_LOCATOR]:
    'warehouseMovementOrderType.swiftLocator',
  [WAREHOUSE_EXPORT_TYPE.INVENTORY]: 'warehouseMovementOrderType.inventory',
}
export const WAREHOUSE_EXPORT_TYPE_OPTIONS = [
  {
    id: 3,
    text: 'warehouseMovementOrderType.so',
  },
  {
    id: 10,
    text: 'warehouseMovementOrderType.inventory',
  },
  {
    id: 4,
    text: 'warehouseMovementOrderType.transfer',
  },
  {
    id: 9,
    text: 'warehouseMovementOrderType.swiftLocator',
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
    text: 'InventoryCalendarStatus.pending',
    color: 'pending',
  },
  {
    id: 2,
    text: 'InventoryCalendarStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 5,
    text: 'InventoryCalendarStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'InventoryCalendarStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'InventoryCalendarStatus.rejected',
    color: 'rejected',
  },
]

export const IMPORT_MANUFACTURNG_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'importManufacturingOrderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'importManufacturingOrderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'importManufacturingOrderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'importManufacturingOrderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'importManufacturingOrderStatus.rejected',
    color: 'rejected',
  },
]
export const PRODUCTION_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'importManufacturingOrderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'importManufacturingOrderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'importManufacturingOrderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 4,
    text: 'importManufacturingOrderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'importManufacturingOrderStatus.rejected',
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
    color: 'inactive',
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
  POI: 0, //bỏ
  PO: 1, //phiếu nhập kho
  PRO: 2, //bỏ
  SO: 3, //phiếu xuất kho
  TRANSFER: 4, //lệnh chuyển kho
  IMO: 5, //bỏ
  EXO: 6, //bỏ
  RO: 7, //bỏ
  PROPOSAL: 8, //giấy đề nghị
  SWIFT_LOCATOR: 9, //đảo hàng
  INVENTORY: 10, //điều chuyển tồn kho fake
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
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.RO]: 'warehouseMovementOrderType.ro',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.PROPOSAL]:
    'warehouseMovementOrderType.proposal',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.SWIFT_LOCATOR]:
    'warehouseMovementOrderType.swiftLocator',
  [WAREHOUSE_MOVEMENT_ORDER_TYPE.INVENTORY]:
    'warehouseMovementOrderType.inventory',
}

export const WAREHOUSE_MOVEMENT_ORDER_TYPE_OPTIONS = [
  // {
  //   id: 0,
  //   text: 'warehouseMovementOrderType.poi',
  // },
  {
    id: 1,
    text: 'warehouseMovementOrderType.po',
  },
  // {
  //   id: 2,
  //   text: 'warehouseMovementOrderType.pro',
  // },
  {
    id: 3,
    text: 'warehouseMovementOrderType.so',
  },
  {
    id: 10,
    text: 'warehouseMovementOrderType.inventory',
  },
  {
    id: 4,
    text: 'warehouseMovementOrderType.transfer',
  },
  // {
  //   id: 5,
  //   text: 'warehouseMovementOrderType.imo',
  // },
  // {
  //   id: 6,
  //   text: 'warehouseMovementOrderType.exo',
  // },
  // {
  //   id: 7,
  //   text: 'warehouseMovementOrderType.ro',
  // },
  // {
  //   id: 8,
  //   text: 'warehouseMovementOrderType.proposal',
  // },
  {
    id: 9,
    text: 'warehouseMovementOrderType.swiftLocator',
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
    color: 'inReceiving',
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

export const CM_TO_PIXEL = 37.7952755906
export const UNIT_ENUM = {
  M: 3,
  DM: 2,
  CM: 1,
}
export const WAREHOUSE_DOOR = {
  WIDTH: 66,
  HEIGHT: 66,
}
export const STAGES_OPTION = {
  PO_IMPORT: 0,
  PRO_IMPORT: 2,
  PRO_EXPORT: 3,
  SO_EXPORT: 5,
  PRODUCTION: 8,
  IMO: 10,
  EXO: 11,
}
export const DISTANCE_BETWEEN_SECTORS = 5

export const INVENTORY_TYPE = {
  PERIODIC: 0,
  UNEXPECTED: 1,
}

export const INVENTORY_TYPE_MAP = {
  [INVENTORY_TYPE.PERIODIC]: 'inventoryCalendar.periodic',
  [INVENTORY_TYPE.UNEXPECTED]: 'inventoryCalendar.unexpected',
}
export const INVENTORY_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'inventoryCalendar.periodic',
  },
  {
    id: 1,
    text: 'inventoryCalendar.unexpected',
  },
]
export const CHECK_POINT_DATA_TYPE = {
  EXTERNAL_SNAPSHOT: 0,
  INTERNAL_SNAPSHOT: 1,
}
export const CHECK_POINT_DATA_TYPE_MAP = {
  [CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT]: 'inventoryCalendar.dataSnapshot',
  [CHECK_POINT_DATA_TYPE.INTERNAL_SNAPSHOT]: 'inventoryCalendar.snapshotWmsx',
}
export const BLOCK_ITEM_LOCATION_STATUS = {
  UNLOCKED: 0,
  LOCKED: 1,
}
export const BLOCK_ITEM_LOCATION_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'blockItemLocation.statusBlocItemLocation.unlocked',
    color: 'confirmed',
  },
  {
    id: 1,
    text: 'blockItemLocation.statusBlocItemLocation.locked',
    color: 'rejected',
  },
]
export const BLOCK_ITEM_LOCATION_STATUS_MAP = {
  [BLOCK_ITEM_LOCATION_STATUS.UNLOCKED]:
    'blockItemLocation.statusBlocItemLocation.unlocked',
  [BLOCK_ITEM_LOCATION_STATUS.LOCKED]:
    'blockItemLocation.statusBlocItemLocation.locked',
}
export const BLOCK_ITEM_LOCATION_TYPE = {
  ITEM: 0,
  LOCATION: 1,
}

export const LETTER_TYPE = {
  PAY_SUPPLIER: 0,
  PAY_CUSTOMER: 1,
}

export const LETTER_TYPE_MAP = {
  [LETTER_TYPE.PAY_SUPPLIER]: 'returnOrder.paySupplier',
  [LETTER_TYPE.PAY_CUSTOMER]: 'returnOrder.payCustomer',
}

export const LETTER_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'returnOrder.paySupplier',
  },
  {
    id: 1,
    text: 'returnOrder.payCustomer',
  },
]

export const RETURN_ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
  IN_RECEIVING: 6,
  RECEIVED: 7,
  DELIVERED: 8,
  IN_COLLECTING: 9,
  COLLECTED: 10,
  EXPORTED: 11,
  REJECTED_RECEIVED: 12,
  IN_PRODUCING: 13,
  PRODUCED: 14,
  IN_RETURNING: 15,
  RETURNED: 16,
}

export const RETURN_ORDER_STATUS_MAP = {
  [RETURN_ORDER_STATUS.PENDING]: 'returnOrderStatus.pending',
  [RETURN_ORDER_STATUS.CONFIRMED]: 'returnOrderStatus.confirmed',
  [RETURN_ORDER_STATUS.IN_PROGRESS]: 'returnOrderStatus.inProgress',
  [RETURN_ORDER_STATUS.APPROVED]: 'returnOrderStatus.approved',
  [RETURN_ORDER_STATUS.COMPLETED]: 'returnOrderStatus.completed',
  [RETURN_ORDER_STATUS.REJECTED]: 'returnOrderStatus.rejected',
  [RETURN_ORDER_STATUS.IN_RECEIVING]: 'returnOrderStatus.inReceiving',
  [RETURN_ORDER_STATUS.RECEIVED]: 'returnOrderStatus.received',
  [RETURN_ORDER_STATUS.DELIVERED]: 'returnOrderStatus.delivered',
  [RETURN_ORDER_STATUS.IN_COLLECTING]: 'returnOrderStatus.inCollecting',
  [RETURN_ORDER_STATUS.COLLECTED]: 'returnOrderStatus.collected',
  [RETURN_ORDER_STATUS.EXPORTED]: 'returnOrderStatus.exported',
  [RETURN_ORDER_STATUS.REJECTED_RECEIVED]: 'returnOrderStatus.rejectedReceived',
  [RETURN_ORDER_STATUS.IN_PRODUCING]: 'returnOrderStatus.inProducing',
  [RETURN_ORDER_STATUS.PRODUCED]: 'returnOrderStatus.produced',
  [RETURN_ORDER_STATUS.IN_RETURNING]: 'returnOrderStatus.inReturning',
  [RETURN_ORDER_STATUS.RETURNED]: 'returnOrderStatus.returned',
}

export const RETURN_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'returnOrderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'returnOrderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'returnOrderStatus.inProgress',
    color: 'inProgress',
  },
  // {
  //   id: 3,
  //   text: 'returnOrderStatus.approved',
  //   color: 'approved',
  // },
  {
    id: 4,
    text: 'returnOrderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'returnOrderStatus.rejected',
    color: 'rejected',
  },
]

export const DEFINE_PACKAGE_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const DEFINE_PACKAGE_STATUS_MAP = {
  [DEFINE_PACKAGE_STATUS.PENDING]: 'definePackageStatus.pending',
  [DEFINE_PACKAGE_STATUS.CONFIRMED]: 'definePackageStatus.confirmed',
}

export const DEFINE_PACKAGE_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'definePackageStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'definePackageStatus.confirmed',
    color: 'confirmed',
  },
]

export const ACTIVE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
}

export const ACTIVE_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'general.inactive',
    color: 'inactive',
  },
  {
    id: 1,
    text: 'general.active',
    color: 'active',
  },
]

export const ACTIVE_STATUS_MAP = {
  [ACTIVE_STATUS.INACTIVE]: 'general.inactive',
  [ACTIVE_STATUS.ACTIVE]: 'general.active',
}

export const PARENT_BUSINESS_TYPE = {
  IMPORT: 0,
  EXPORT: 1,
  TRANSFER: 2,
}

export const PARENT_BUSINESS_TYPE_MAP = {
  [PARENT_BUSINESS_TYPE.IMPORT]: 'businessTypeManagement.import',
  [PARENT_BUSINESS_TYPE.EXPORT]: 'businessTypeManagement.export',
  [PARENT_BUSINESS_TYPE.TRANSFER]: 'businessTypeManagement.transfer',
}

export const PARENT_BUSINESS_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'businessTypeManagement.import',
  },
  {
    id: 1,
    text: 'businessTypeManagement.export',
  },
  {
    id: 2,
    text: 'businessTypeManagement.transfer',
  },
]

export const DATA_TYPE = {
  TEXT: 0,
  LIST: 1,
  DATE: 2,
  NUMBER: 5,
}

export const DATA_TYPE_MAP = {
  [DATA_TYPE.TEXTFIELD]: 'businessTypeManagement.types.textField',
  [DATA_TYPE.LIST]: 'businessTypeManagement.types.list',
}

export const TABLE_NAME_ENUM = {
  DEPARTMENT_RECEIPT: 'department_receipts',
  VENDOR: 'vendors',
  COST_TYPE: 'cost_types',
  ORGANIZATION_PAYMENT: 'organization_payments',
  PURCHASED_ODER_IMPORT: 'purchased_order_imports',
  SALE_ORDER_EXPORT: 'sale_order_exports',
  WAREHOUSE_EXPORT_PROPOSAL: 'warehouse_export_proposals',
  CONSTRUCTION: 'constructions',
  CATEGORY_CONSTRUCTION: 'category_constructions',
  RECEIPT: 'receipts',
}
export const DATA_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'businessTypeManagement.types.text',
    type: DATA_TYPE.TEXT,
    tableName: '',
    code: '',
  },
  {
    id: 2,
    text: 'businessTypeManagement.types.date',
    type: DATA_TYPE.DATE,
    tableName: '',
    code: '',
  },
  {
    id: 5,
    text: 'businessTypeManagement.types.number',
    type: DATA_TYPE.NUMBER,
    tableName: '',
    code: '',
  },
  {
    id: 1,
    text: 'businessTypeManagement.types.defineReceptionDepartment',
    type: DATA_TYPE.LIST,
    tableName: TABLE_NAME_ENUM.DEPARTMENT_RECEIPT,
    code: 'code',
  },
  {
    id: 3,
    text: 'businessTypeManagement.types.defineVendor',
    type: DATA_TYPE.LIST,
    tableName: TABLE_NAME_ENUM.VENDOR,
    code: 'code',
  },
  {
    id: 4,
    text: 'businessTypeManagement.types.defineCost',
    type: DATA_TYPE.LIST,
    tableName: TABLE_NAME_ENUM.COST_TYPE,
    code: 'code',
  },
  {
    id: 6,
    text: 'businessTypeManagement.types.defineOrganization',
    type: DATA_TYPE.LIST,
    tableName: TABLE_NAME_ENUM.ORGANIZATION_PAYMENT,
    code: 'code',
  },
]

export const UOM_ACTIVE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  REJECTED: 2,
}

export const UOM_ACTIVE_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'general.inactive',
    color: 'inactive',
  },
  {
    id: 1,
    text: 'general.active',
    color: 'active',
  },
  {
    id: 2,
    text: 'general.inactive',
    color: 'inactive',
  },
]

export const UOM_ACTIVE_STATUS_MAP = {
  [UOM_ACTIVE_STATUS.INACTIVE]: 'general.inactive',
  [UOM_ACTIVE_STATUS.ACTIVE]: 'general.active',
  [UOM_ACTIVE_STATUS.REJECTED]: 'general.inactive',
}

export const RECEIPT_DEPARTMENT_TYPE = {
  INTERNAL: 0,
  OUTSIDE: 1,
}

export const RECEIPT_DEPARTMENT_TYPE_MAP = {
  [RECEIPT_DEPARTMENT_TYPE.INTERNAL]: 'receiptDepartmentManagement.internal',
  [RECEIPT_DEPARTMENT_TYPE.OUTSIDE]: 'receiptDepartmentManagement.outside',
}

export const RECEIPT_DEPARTMENT_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'receiptDepartmentManagement.internal',
  },
  {
    id: 1,
    text: 'receiptDepartmentManagement.outside',
  },
]
export const CODE_TYPE_DATA_FATHER_JOB = {
  PO_IMPORT_ID: 'PO_IMPORT_ID',
  WAREHOUSE_EXPORT_PROPOSAL_ID: 'WAREHOUSE_EXPORT_PROPOSAL_ID',
  CONSTRUCTION_ID: 'CONSTRUCTION_ID',
  CATEGORY_CONSTRUCTION_ID: 'CATEGORY_CONSTRUCTION_ID',
  RECEIPT_ID: 'RECEIPT_ID',
  SO_EXPORT_ID: 'SO_EXPORT_ID',
}
export const BUSINESS_TYPE_REQUIRED = {
  REQUIRED: 1,
  NO_REQUIRED: 0,
}
export const TYPE_DATA_FATHER_JOB_OPTIONS = [
  {
    id: 0,
    name: 'businessTypeManagement.poImport',
    code: CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID,
    tableName: TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
    columnName: 'id',
  },
  {
    id: 1,
    name: 'businessTypeManagement.proposalPaperExportSupplies',
    code: CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID,
    tableName: TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
    columnName: 'id',
  },
  {
    id: 2,
    name: 'businessTypeManagement.constructionManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CONSTRUCTION,
    columnName: 'id',
  },
  {
    id: 3,
    name: 'businessTypeManagement.categoryManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CATEGORY_CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CATEGORY_CONSTRUCTION,
    columnName: 'id',
  },
  {
    id: 4,
    name: 'businessTypeManagement.receiptManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.RECEIPT_ID,
    tableName: TABLE_NAME_ENUM.RECEIPT,
    columnName: 'id',
  },
  {
    id: 5,
    name: 'businessTypeManagement.poExport',
    code: CODE_TYPE_DATA_FATHER_JOB.SO_EXPORT_ID,
    tableName: TABLE_NAME_ENUM.SALE_ORDER_EXPORT,
    columnName: 'id',
  },
]
export const DEFAULT_FIELD_LIST_WAREHOUSE_EXPORT = [
  {
    labelEBS: '',
    fieldName: 'businessTypeManagement.poImportId',
    type: 'businessTypeManagement.poImport',
    code: CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID,
    tableName: TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: '',
    fieldName: 'businessTypeManagement.proposalPaperExportSupplies',
    type: 'businessTypeManagement.proposalPaperExportSupplies',
    code: CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID,
    tableName: TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: 'Source Project',
    fieldName: 'businessTypeManagement.construction',
    type: 'businessTypeManagement.constructionManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CONSTRUCTION,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: 'Source Task',
    fieldName: 'businessTypeManagement.category',
    type: 'businessTypeManagement.categoryManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CATEGORY_CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CATEGORY_CONSTRUCTION,
    columnName: 'id',
    show: false,
    required: false,
  },
]

export const DEFAULT_FIELD_LIST_WAREHOUSE_IMPORT = [
  {
    labelEBS: '',
    fieldName: 'businessTypeManagement.poExportId',
    type: 'businessTypeManagement.poExport',
    code: CODE_TYPE_DATA_FATHER_JOB.SO_EXPORT_ID,
    tableName: TABLE_NAME_ENUM.SALE_ORDER_EXPORT,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: '',
    fieldName: 'businessTypeManagement.proposalPaperExportSupplies',
    type: 'businessTypeManagement.proposalPaperExportSupplies',
    code: CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID,
    tableName: TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: 'Receipt',
    fieldName: 'businessTypeManagement.receipt',
    type: 'businessTypeManagement.receiptManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.RECEIPT_ID,
    tableName: TABLE_NAME_ENUM.RECEIPT,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: 'Source Project',
    fieldName: 'businessTypeManagement.construction',
    type: 'businessTypeManagement.constructionManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CONSTRUCTION,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: 'Source Task',
    fieldName: 'businessTypeManagement.category',
    type: 'businessTypeManagement.categoryManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CATEGORY_CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CATEGORY_CONSTRUCTION,
    columnName: 'id',
    show: false,
    required: false,
  },
]

export const DEFAULT_FIELD_LIST_WAREHOUSE_TRANSFER = [
  {
    labelEBS: 'Source Project',
    fieldName: 'businessTypeManagement.construction',
    type: 'businessTypeManagement.constructionManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CONSTRUCTION,
    columnName: 'id',
    show: false,
    required: false,
  },
  {
    labelEBS: 'Source Task',
    fieldName: 'businessTypeManagement.category',
    type: 'businessTypeManagement.categoryManagement',
    code: CODE_TYPE_DATA_FATHER_JOB.CATEGORY_CONSTRUCTION_ID,
    tableName: TABLE_NAME_ENUM.CATEGORY_CONSTRUCTION,
    columnName: 'id',
    show: false,
    required: false,
  },
]
export const WAREHOUSE_TYPE = {
  SXKD: 0,
  XDCB: 1,
}

export const WAREHOUSE_TYPE_MAP = {
  [WAREHOUSE_TYPE.SXKD]: 'defineWarehouse.sxkd',
  [WAREHOUSE_TYPE.XDCB]: 'defineWarehouse.xdcb',
}

export const WAREHOUSE_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'defineWarehouse.sxkd',
  },
  {
    id: 1,
    text: 'defineWarehouse.xdcb',
  },
]

export const WAREHOUSE_NATURE = {
  SHORT_TERM: 0,
  LONG_TERM: 1,
}

export const WAREHOUSE_NATURE_MAP = {
  [WAREHOUSE_NATURE.SHORT_TERM]: 'defineWarehouse.shortTerm',
  [WAREHOUSE_NATURE.LONG_TERM]: 'defineWarehouse.longTerm',
}

export const WAREHOUSE_NATURE_OPTIONS = [
  {
    id: 0,
    text: 'defineWarehouse.shortTerm',
  },
  {
    id: 1,
    text: 'defineWarehouse.longTerm',
  },
]

export const WAREHOUSE_LOT_TYPE = {
  NO_LOT: 0,
  LOT: 1,
}

export const WAREHOUSE_LOT_TYPE_MAP = {
  [WAREHOUSE_LOT_TYPE.NO_LOT]: 'defineWarehouse.noLot',
  [WAREHOUSE_LOT_TYPE.LOT]: 'defineWarehouse.lot',
}

export const WAREHOUSE_LOT_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'defineWarehouse.noLot',
  },
  {
    id: 1,
    text: 'defineWarehouse.lot',
  },
]

export const MATERIAL_ACTIVE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  REJECTED: 2,
}

export const MATERIAL_ACTIVE_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'general.inactive',
    color: 'inactive',
  },
  {
    id: 1,
    text: 'general.active',
    color: 'active',
  },
  {
    id: 2,
    text: 'general.inactive',
    color: 'inactive',
  },
]

export const MATERIAL_ACTIVE_STATUS_MAP = {
  [MATERIAL_ACTIVE_STATUS.INACTIVE]: 'general.inactive',
  [MATERIAL_ACTIVE_STATUS.ACTIVE]: 'general.active',
  [MATERIAL_ACTIVE_STATUS.REJECTED]: 'general.inactive',
}
export const WAREHOUSE_EXPORT_PROPOSAL_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
}

export const WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION = [
  {
    id: 0,
    text: 'warehouseExportProposal.warehouseExportProposalStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'warehouseExportProposal.warehouseExportProposalStatus.comfirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'warehouseExportProposal.warehouseExportProposalStatus.rejected',
    color: 'rejected',
  },
]
export const WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS = {
  UN_EXPORTED: 5,
  IN_PROGRESS: 3,
  COMPLETED: 4,
}
export const WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION = [
  {
    id: 0,
    text: 'warehouseExportProposal.warehouseExportProposalExportStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'warehouseExportProposal.warehouseExportProposalExportStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 2,
    text: 'warehouseExportProposal.warehouseExportProposalExportStatus.completed',
    color: 'completed',
  },
]
export const RECEIPT_MANAGEMENT_STATUS = {
  NOT_YET_STOCKED: 0,
  STOCKED: 1,
}

export const RECEIPT_MANAGEMENT_STATUS_MAP = {
  [RECEIPT_MANAGEMENT_STATUS.NOT_YET_STOCKED]:
    'receiptManagement.notYetStocked',
  [RECEIPT_MANAGEMENT_STATUS.STOCKED]: 'receiptManagement.stocked',
}

export const RECEIPT_MANAGEMENT_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'receiptManagement.notYetStocked',
    color: 'pending',
  },
  {
    id: 1,
    text: 'receiptManagement.stocked',
    color: 'confirmed',
  },
]

export const WAREHOUSE_LAYOUTS = {
  ASSEMBLY: 0,
  SHELF: 1,
  DRAWER: 2,
  BIN: 3,
}
export const WAREHOUSE_TRANSFER_TYPE = {
  WAREHOUSE_TRANSFER_LONG: 2,
  WAREHOUSE_TRANSFER_SHORT: 1,
}
export const WAREHOUSE_TRANSFER_MAP = {
  [WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG]: 'warehouseTransfer.long',
  [WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT]: 'warehouseTransfer.short',
}

export const WAREHOUSE_TRANSFER_TYPE_OPTIONS = [
  {
    id: 1,
    text: 'warehouseTransfer.short',
  },
  {
    id: 2,
    text: 'warehouseTransfer.long',
  },
]

export const REPORT_TYPE = {
  ITEM_INVENTORY_BELOW_MINIMUM: 1,
  ITEM_INVENTORY_BELOW_SAFE: 2,
  ORDER_TRANSFER_INCOMPLETED: 3,
  ORDER_EXPORT_INCOMPLETED: 4,
  ORDER_IMPORT_INCOMPLETED: 5,
  ITEM_IMPORTED_BUT_NOT_PUT_TO_POSITION: 6,
  ITEM_INVENTORY: 7,
  ORDER_IMPORT_BY_REQUEST_FOR_ITEM: 8,
  INVENTORY: 9,
  ITEM_INVENTORY_IMPORTED_NO_QR_CODE: 10,
  ORDER_EXPORT_BY_REQUEST_FOR_ITEM: 11,
  SITUATION_TRANSFER: 12,
  SITUATION_INVENTORY_PERIOD: 13,
  SITUATION_IMPORT_PERIOD: 14,
  SITUATION_EXPORT_PERIOD: 15,
  AGE_OF_ITEM_STOCK: 16,
  STORED: 17,
}

export const REPORT_TYPE_MAP = {
  [REPORT_TYPE.ITEM_INVENTORY_BELOW_MINIMUM]:
    'reportType.itemInventoryBelowMinimum',
  [REPORT_TYPE.ITEM_INVENTORY_BELOW_SAFE]: 'reportType.itemInventoryBelowSafe',
  [REPORT_TYPE.ORDER_TRANSFER_INCOMPLETED]:
    'returnOrderStatus.orderTransferInCompleted',
  [REPORT_TYPE.ORDER_EXPORT_INCOMPLETED]: 'reportType.orderExportInCompleted',
  [REPORT_TYPE.ORDER_IMPORT_INCOMPLETED]: 'reportType.orderImportInCompleted',
  [REPORT_TYPE.ITEM_IMPORTED_BUT_NOT_PUT_TO_POSITION]:
    'reportType.itemImportedButNotPutToPosition',
  [REPORT_TYPE.ITEM_INVENTORY]: 'reportType.itemInventory',
  [REPORT_TYPE.ORDER_IMPORT_BY_REQUEST_FOR_ITEM]:
    'reportType.orderImportByRequestForItem',
  [REPORT_TYPE.INVENTORY]: 'reportType.inventory',
  [REPORT_TYPE.ITEM_INVENTORY_IMPORTED_NO_QR_CODE]:
    'reportType.itemInventoryImportedNoQRCode',
  [REPORT_TYPE.ORDER_EXPORT_BY_REQUEST_FOR_ITEM]:
    'reportType.orderExportByRequestForItem',
  [REPORT_TYPE.SITUATION_TRANSFER]: 'reportType.situationTransfer',
  [REPORT_TYPE.SITUATION_INVENTORY_PERIOD]:
    'reportType.situationInventoryPeriod',
  [REPORT_TYPE.SITUATION_IMPORT_PERIOD]: 'reportType.situationImportPeriod',
  [REPORT_TYPE.SITUATION_EXPORT_PERIOD]: 'reportType.situationExportPeriod',
  [REPORT_TYPE.AGE_OF_ITEM_STOCK]: 'reportType.ageOfItemStock',
  [REPORT_TYPE.STORED]: 'reportType.stored',
}

export const REPORT_TYPE_OPTIONS = [
  {
    id: 5,
    text: 'reportType.orderImportInCompleted',
    code: 'W001',
  },
  {
    id: 6,
    text: 'reportType.itemImportedButNotPutToPosition',
    code: 'W002',
  },
  {
    id: 4,
    text: 'reportType.orderExportInCompleted',
    code: 'W003',
  },
  {
    id: 3,
    text: 'reportType.orderTransferInCompleted',
    code: 'W004',
  },
  {
    id: 2,
    text: 'reportType.itemInventoryBelowSafe',
    code: 'W005',
  },
  {
    id: 1,
    text: 'reportType.itemInventoryBelowMinimum',
    code: 'W006',
  },
  {
    id: 9,
    text: 'reportType.inventory',
    code: 'W007',
  },
  // {
  //   id: 8,
  //   text: 'reportType.orderImportByRequestForItem',
  //   code: 'W008',
  // },
  {
    id: 16,
    text: 'reportType.ageOfItemStock',
    code: 'W009',
  },
  {
    id: 7,
    text: 'reportType.itemInventory',
    code: 'W010',
  },
  {
    id: 14,
    text: 'reportType.situationImportPeriod',
    code: 'W011',
  },
  {
    id: 15,
    text: 'reportType.situationExportPeriod',
    code: 'W012',
  },
  {
    id: 12,
    text: 'reportType.situationTransfer',
    code: 'W013',
  },
  {
    id: 13,
    text: 'reportType.situationInventoryPeriod',
    code: 'W014',
  },
  {
    id: 10,
    text: 'reportType.itemInventoryImportedNoQRCode',
    code: 'W015',
  },
  {
    id: 11,
    text: 'reportType.orderExportByRequestForItem',
    code: 'W016',
  },
  {
    id: 17,
    text: 'reportType.stored',
    code: 'W017',
  },
]

export const REPORT_FILE_TYPE = {
  EXCEL: 0,
  WORD: 1,
}
export const REPORT_FILE_TYPE_MAP = {
  [REPORT_FILE_TYPE.EXCEL]: 'reportExport.excel',
  [REPORT_FILE_TYPE.WORD]: 'reportExport.word',
}

export const REPORT_FILE_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'reportExport.excel',
  },
  {
    id: 1,
    text: 'reportExport.word',
  },
]

export const UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE = {
  UPDATE_WAREHOUSE: 'updateWarehouse',
  UPDATE_SOURCE: 'updateSource',
}

export const CREATE_ITEM_WAREHOUSE_SOURCE_PERMISSION =
  'ITEM_CREATE_ITEM_WAREHOUSE_SOURCE_PERMISSION'
export const UPDATE_ITEM_WAREHOUSE_SOURCE_PERMISSION =
  'ITEM_UPDATE_ITEM_WAREHOUSE_SOURCE_PERMISSION'

export const DATA_SYNC_STATUS = {
  PENDING: 0,
  IN_PROGRESS: 1,
  ERROR_TRANSACTION: 2,
  ERROR_SYNC: 3,
  SUCCESS: 4,
  CANCEL: 5,
}

export const DATA_SYNC_STATUS_MAP = {
  [WAREHOUSE_MOVEMENT_STATUS.PENDING]:
    'dataSyncManagement.dataSyncManagementStatus.pending',
  [WAREHOUSE_MOVEMENT_STATUS.ERROR]:
    'dataSyncManagement.dataSyncManagementStatus.error',
  [WAREHOUSE_MOVEMENT_STATUS.IN_PROGRESS]:
    'dataSyncManagement.dataSyncManagementStatus.inProgress',
  [WAREHOUSE_MOVEMENT_STATUS.SUCCESS]:
    'dataSyncManagement.dataSyncManagementStatus.success',
  [WAREHOUSE_MOVEMENT_STATUS.ERROR_TRANSACTION]:
    'dataSyncManagement.dataSyncManagementStatus.errorTransaction',
  [WAREHOUSE_MOVEMENT_STATUS.ERROR_SYNC]:
    'dataSyncManagement.dataSyncManagementStatus.errorSync',
  [WAREHOUSE_MOVEMENT_STATUS.CANCEL]:
    'dataSyncManagement.dataSyncManagementStatus.cancel',
}

export const DATA_SYNC_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'dataSyncManagement.dataSyncManagementStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'dataSyncManagement.dataSyncManagementStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 2,
    text: 'dataSyncManagement.dataSyncManagementStatus.errorTransaction',
    color: 'rejected',
  },
  {
    id: 3,
    text: 'dataSyncManagement.dataSyncManagementStatus.errorSync',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'dataSyncManagement.dataSyncManagementStatus.success',
    color: 'completed',
  },
  {
    id: 5,
    text: 'dataSyncManagement.dataSyncManagementStatus.cancel',
    color: 'rejected',
  },
]

export const MAINTENANCE_TEAM_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'maintenanceTeam.outer',
  },
  {
    id: 1,
    text: 'maintenanceTeam.inner',
  },
]

export const INVENTORY_ADJUST_STATUS = {
  PENDING: 0,
  CONFIRM: 1,
  COMPLETED: 2,
  REJECTED: 3,
}

export const INVENTORY_ADJUST_STATUS_MAP = {
  [INVENTORY_ADJUST_STATUS.PENDING]:
    'inventoryAdjust.inventoryAdjustStatus.pending',
  [INVENTORY_ADJUST_STATUS.CONFIRM]:
    'inventoryAdjust.inventoryAdjustStatus.confirmed',
  [INVENTORY_ADJUST_STATUS.COMPLETED]:
    'inventoryAdjust.inventoryAdjustStatus.completed',
  [INVENTORY_ADJUST_STATUS.REJECTED]:
    'inventoryAdjust.inventoryAdjustStatus.rejected',
}

export const INVENTORY_ADJUST_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'inventoryAdjust.inventoryAdjustStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'inventoryAdjust.inventoryAdjustStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'inventoryAdjust.inventoryAdjustStatus.completed',
    color: 'completed',
  },
  {
    id: 3,
    text: 'inventoryAdjust.inventoryAdjustStatus.rejected',
    color: 'rejected',
  },
]

export const INVENTORY_ADJUST_TYPE = {
  WAREHOUSE_IMPORT: 0,
  WAREHOUSE_EXPORT: 1,
}
export const INVENTORY_ADJUST_TYPE_MAP = {
  [INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT]: 'inventoryAdjust.warehouseImport',
  [INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT]: 'inventoryAdjust.warehouseExport',
}

export const INVENTORY_ADJUST_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'inventoryAdjust.warehouseImport',
  },
  {
    id: 1,
    text: 'inventoryAdjust.warehouseExport',
  },
]
export const OPTIONS_QR_CODE = {
  qrOld: 0,
  qrNew: 1,
}

export const TYPE_OBJECT_ENUM = {
  PURCHASED_ORDER_IMPORT: 2,
  SALE_ORDER_EXPORT: 3,
  EXPORT_WAREHOUSE_TRANSFER: 4,
}

export const TYPE_OBJECT_MAP = {
  [TYPE_OBJECT_ENUM.PURCHASED_ORDER_IMPORT]: 'menu.warehouseImportReceipt',
  [TYPE_OBJECT_ENUM.SALE_ORDER_EXPORT]: 'menu.warehouseExportReceipt',
  [TYPE_OBJECT_ENUM.EXPORT_WAREHOUSE_TRANSFER]: 'menu.warehouseTransfer',
}

export const TYPE_OBJECT_OPTIONS = [
  {
    id: TYPE_OBJECT_ENUM.PURCHASED_ORDER_IMPORT,
    text: 'menu.warehouseImportReceipt',
  },
  {
    id: TYPE_OBJECT_ENUM.SALE_ORDER_EXPORT,
    text: 'menu.warehouseExportReceipt',
  },
  {
    id: TYPE_OBJECT_ENUM.EXPORT_WAREHOUSE_TRANSFER,
    text: 'menu.warehouseTransfer',
  },
]
export const OrderTypeEnum = {
  PO: 1,
  PRO: 2,
  SO: 3,
  TRANSFER: 4,
  IMO: 5,
  EXO: 6,
  RO: 7,
  PROPOSAL: 8,
}
