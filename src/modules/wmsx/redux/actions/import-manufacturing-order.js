export const WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_START =
  'WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_START'
export const WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_SUCCESS =
  'WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_SUCCESS'
export const WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_FAILED =
  'WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_FAILED'

export const WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_START =
  'WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_START'
export const WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_SUCCESS =
  'WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_SUCCESS'
export const WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_FAILED =
  'WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_FAILED'

export const WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_START =
  'WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_START'
export const WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_SUCCESS =
  'WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_SUCCESS'
export const WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_FAILED =
  'WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_FAILED'

export const WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_START =
  'WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_START'
export const WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_SUCCESS =
  'WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_SUCCESS'
export const WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_FAILED =
  'WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_FAILED'

export const WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_START =
  'WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_START'
export const WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_SUCCESS =
  'WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_SUCCESS'
export const WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_FAILED =
  'WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_FAILED'

export const WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_START =
  'WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_START'
export const WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_SUCCESS =
  'WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_SUCCESS'
export const WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_FAILED =
  'WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_FAILED'

export const WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_START =
  'WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_START'
export const WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_SUCCESS =
  'WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_SUCCESS'
export const WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_FAILED =
  'WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_FAILED'

export const WMSX_GET_LOT_NUMBER_LIST_START = 'WMSX_GET_LOT_NUMBER_LIST_START'
export const WMSX_GET_LOT_NUMBER_LIST_SUCCESS =
  'WMSX_GET_LOT_NUMBER_LIST_SUCCESS'
export const WMSX_GET_LOT_NUMBER_LIST_FAILED = 'WMSX_GET_LOT_NUMBER_LIST_FAILED'

export const WMSX_RESET_IMPORT_MANUFACTURING_ORDER_STATE =
  'WMSX_RESET_IMPORT_MANUFACTURING_ORDER_STATE'
/**
 * Search importManufacturingOrder
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchImportManufacturingOrders(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search importManufacturingOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function searchImportManufacturingOrdersSuccess(payload) {
  return {
    type: WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search importManufacturingOrder failed action
 * @returns {object}
 */
export function searchImportManufacturingOrdersFailed() {
  return {
    type: WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_FAILED,
  }
}

/**
 * Create importManufacturingOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createImportManufacturingOrder(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create importManufacturingOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function createImportManufacturingOrderSuccess(payload) {
  return {
    type: WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create importManufacturingOrder failed action
 * @returns {object}
 */
export function createImportManufacturingOrderFailed() {
  return {
    type: WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_FAILED,
  }
}

/**
 * Update importManufacturingOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateImportManufacturingOrder(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update importManufacturingOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function updateImportManufacturingOrderSuccess(payload) {
  return {
    type: WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update importManufacturingOrder failed action
 * @returns {object}
 */
export function updateImportManufacturingOrderFailed() {
  return {
    type: WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_FAILED,
  }
}
/**
 * Delete importManufacturingOrder
 * @param {int} importManufacturingOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteImportManufacturingOrder(
  importManufacturingOrderId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_START,
    payload: importManufacturingOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete importManufacturingOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteImportManufacturingOrderSuccess(payload) {
  return {
    type: WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete importManufacturingOrder failed action
 * @returns {object}
 */
export function deleteImportManufacturingOrderFailed() {
  return {
    type: WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_FAILED,
  }
}

/**
 * Get importManufacturingOrder details
 * @param {int} importManufacturingOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getImportManufacturingOrderDetailsById(
  importManufacturingOrderId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_START,
    payload: importManufacturingOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get importManufacturingOrder details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getImportManufacturingOrderDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get importManufacturingOrder details by id failed action
 * @returns {object}
 */
export function getImportManufacturingOrderDetailsByIdFailed() {
  return {
    type: WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_FAILED,
  }
}

/**
 * Get confirm production order
 * @param {int} importManufacturingOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmImportManufacturingOrderById(
  importManufacturingOrderId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_START,
    payload: importManufacturingOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmImportManufacturingOrderByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmImportManufacturingOrderByIdFailed() {
  return {
    type: WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_FAILED,
  }
}

/**
 * Get reject production order
 * @param {int} importManufacturingOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectImportManufacturingOrderById(
  importManufacturingOrderId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_START,
    payload: importManufacturingOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectImportManufacturingOrderByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject production order by id failed action
 * @returns {object}
 */
export function rejectImportManufacturingOrderByIdFailed() {
  return {
    type: WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_FAILED,
  }
}

/**
 * Get lot number list
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getLotNumberList(itemIds, onSuccess, onError) {
  return {
    type: WMSX_GET_LOT_NUMBER_LIST_START,
    payload: itemIds,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get lot number list success action
 * @param {*} payload
 * @returns {object}
 */
export function getLotNumberListSuccess(payload) {
  return {
    type: WMSX_GET_LOT_NUMBER_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get lot number list failed action
 * @returns {object}
 */
export function getLotNumberListFailed() {
  return {
    type: WMSX_GET_LOT_NUMBER_LIST_FAILED,
  }
}

export function resetImportManufacturingOrder() {
  return {
    type: WMSX_RESET_IMPORT_MANUFACTURING_ORDER_STATE,
  }
}

export default {
  createImportManufacturingOrder,
  createImportManufacturingOrderFailed,
  createImportManufacturingOrderSuccess,
  updateImportManufacturingOrder,
  updateImportManufacturingOrderFailed,
  updateImportManufacturingOrderSuccess,
  deleteImportManufacturingOrder,
  deleteImportManufacturingOrderFailed,
  deleteImportManufacturingOrderSuccess,
  searchImportManufacturingOrders,
  searchImportManufacturingOrdersFailed,
  searchImportManufacturingOrdersSuccess,
  getImportManufacturingOrderDetailsById,
  getImportManufacturingOrderDetailsByIdFailed,
  getImportManufacturingOrderDetailsByIdSuccess,
  rejectImportManufacturingOrderById,
  rejectImportManufacturingOrderByIdFailed,
  rejectImportManufacturingOrderByIdSuccess,
  confirmImportManufacturingOrderById,
  confirmImportManufacturingOrderByIdFailed,
  confirmImportManufacturingOrderByIdSuccess,
  getLotNumberList,
  getLotNumberListFailed,
  getLotNumberListSuccess,
  resetImportManufacturingOrder,
}
