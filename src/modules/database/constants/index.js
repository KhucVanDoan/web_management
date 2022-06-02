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

export const ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
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

export const DEFAULT_ITEM_TYPES = {
  code: ['00', '04', '05', '06'],
}

export const ITEM_TYPES_TO_INT = {
  code: ['04', '06', '01', '02'],
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
export const ITEM_TYPE_PRODUCT = 2
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
