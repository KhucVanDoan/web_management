export const WMSX_SEARCH_PRODUCTION_ORDERS_START =
  'WMSX_SEARCH_PRODUCTION_ORDERS_START'
export const WMSX_SEARCH_PRODUCTION_ORDERS_SUCCESS =
  'WMSX_SEARCH_PRODUCTION_ORDERS_SUCCESS'
export const WMSX_SEARCH_PRODUCTION_ORDERS_FAILED =
  'WMSX_SEARCH_PRODUCTION_ORDERS_FAILED'

export const WMSX_CREATE_PRODUCTION_ORDER_START =
  'WMSX_CREATE_PRODUCTION_ORDER_START'
export const WMSX_CREATE_PRODUCTION_ORDER_SUCCESS =
  'WMSX_CREATE_PRODUCTION_ORDER_SUCCESS'
export const WMSX_CREATE_PRODUCTION_ORDER_FAILED =
  'WMSX_CREATE_PRODUCTION_ORDER_FAILED'

export const WMSX_UPDATE_PRODUCTION_ORDER_START =
  'WMSX_UPDATE_PRODUCTION_ORDER_START'
export const WMSX_UPDATE_PRODUCTION_ORDER_SUCCESS =
  'WMSX_UPDATE_PRODUCTION_ORDER_SUCCESS'
export const WMSX_UPDATE_PRODUCTION_ORDER_FAILED =
  'WMSX_UPDATE_PRODUCTION_ORDER_FAILED'

export const WMSX_DELETE_PRODUCTION_ORDER_START =
  'WMSX_DELETE_PRODUCTION_ORDER_START'
export const WMSX_DELETE_PRODUCTION_ORDER_SUCCESS =
  'WMSX_DELETE_PRODUCTION_ORDER_SUCCESS'
export const WMSX_DELETE_PRODUCTION_ORDER_FAILED =
  'WMSX_DELETE_PRODUCTION_ORDER_FAILED'

export const WMSX_GET_PRODUCTION_ORDER_DETAILS_START =
  'WMSX_GET_PRODUCTION_ORDER_DETAILS_START'
export const WMSX_GET_PRODUCTION_ORDER_DETAILS_SUCCESS =
  'WMSX_GET_PRODUCTION_ORDER_DETAILS_SUCCESS'
export const WMSX_GET_PRODUCTION_ORDER_DETAILS_FAILED =
  'WMSX_GET_PRODUCTION_ORDER_DETAILS_FAILED'

export const WMSX_CONFIRM_PRODUCTION_ORDER_START =
  'WMSX_CONFIRM_PRODUCTION_ORDER_START'
export const WMSX_CONFIRM_PRODUCTION_ORDER_SUCCESS =
  'WMSX_CONFIRM_PRODUCTION_ORDER_SUCCESS'
export const WMSX_CONFIRM_PRODUCTION_ORDER_FAILED =
  'WMSX_CONFIRM_PRODUCTION_ORDER_FAILED'

export const WMSX_REJECT_PRODUCTION_ORDER_START =
  'WMSX_REJECT_PRODUCTION_ORDER_START'
export const WMSX_REJECT_PRODUCTION_ORDER_SUCCESS =
  'WMSX_REJECT_PRODUCTION_ORDER_SUCCESS'
export const WMSX_REJECT_PRODUCTION_ORDER_FAILED =
  'WMSX_REJECT_PRODUCTION_ORDER_FAILED'

export const WMSX_GET_IMPORT_LOT_NUMBER_START =
  'WMSX_GET_IMPORT_LOT_NUMBER_START'
export const WMSX_GET_IMPORT_LOT_NUMBER_SUCCESS =
  'WMSX_GET_IMPORT_LOT_NUMBER_SUCCESS'
export const WMSX_GET_IMPORT_LOT_NUMBER_FAILED =
  'WMSX_GET_IMPORT_LOT_NUMBER_FAILED'

export const WMSX_GET_EXPORT_LOT_NUMBER_START =
  'WMSX_GET_EXPORT_LOT_NUMBER_START'
export const WMSX_GET_EXPORT_LOT_NUMBER_SUCCESS =
  'WMSX_GET_EXPORT_LOT_NUMBER_SUCCESS'
export const WMSX_GET_EXPORT_LOT_NUMBER_FAILED =
  'WMSX_GET_EXPORT_LOT_NUMBER_FAILED'
export const WMSX_RESET_PRODUCTION_ORDER_DETAIL =
  'WMSX_RESET_PRODUCTION_ORDER_DETAIL'

/**
 * Search productionOrder
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProductionOrders(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_PRODUCTION_ORDERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search productionOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProductionOrdersSuccess(payload) {
  return {
    type: WMSX_SEARCH_PRODUCTION_ORDERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search productionOrder failed action
 * @returns {object}
 */
export function searchProductionOrdersFailed() {
  return {
    type: WMSX_SEARCH_PRODUCTION_ORDERS_FAILED,
  }
}

/**
 * Create productionOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createProductionOrder(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_PRODUCTION_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create productionOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function createProductionOrderSuccess(payload) {
  return {
    type: WMSX_CREATE_PRODUCTION_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create productionOrder failed action
 * @returns {object}
 */
export function createProductionOrderFailed() {
  return {
    type: WMSX_CREATE_PRODUCTION_ORDER_FAILED,
  }
}

/**
 * Update productionOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateProductionOrder(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_PRODUCTION_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update productionOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function updateProductionOrderSuccess(payload) {
  return {
    type: WMSX_UPDATE_PRODUCTION_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update productionOrder failed action
 * @returns {object}
 */
export function updateProductionOrderFailed() {
  return {
    type: WMSX_UPDATE_PRODUCTION_ORDER_FAILED,
  }
}
/**
 * Delete productionOrder
 * @param {int} productionOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteProductionOrder(productionOrderId, onSuccess, onError) {
  return {
    type: WMSX_DELETE_PRODUCTION_ORDER_START,
    payload: productionOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete productionOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteProductionOrderSuccess(payload) {
  return {
    type: WMSX_DELETE_PRODUCTION_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete productionOrder failed action
 * @returns {object}
 */
export function deleteProductionOrderFailed() {
  return {
    type: WMSX_DELETE_PRODUCTION_ORDER_FAILED,
  }
}

/**
 * Get productionOrder details
 * @param {int} productionOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getProductionOrderDetailsById(
  productionOrderId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_GET_PRODUCTION_ORDER_DETAILS_START,
    payload: productionOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get productionOrder details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getProductionOrderDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_PRODUCTION_ORDER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get productionOrder details by id failed action
 * @returns {object}
 */
export function getProductionOrderDetailsByIdFailed() {
  return {
    type: WMSX_GET_PRODUCTION_ORDER_DETAILS_FAILED,
  }
}

/**
 * Get confirm production order
 * @param {int} productionOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmProductionOrderById(
  productionOrderId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_CONFIRM_PRODUCTION_ORDER_START,
    payload: productionOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmProductionOrderByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_PRODUCTION_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmProductionOrderByIdFailed() {
  return {
    type: WMSX_CONFIRM_PRODUCTION_ORDER_FAILED,
  }
}

/**
 * Get reject production order
 * @param {int} productionOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectProductionOrderById(
  productionOrderId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_REJECT_PRODUCTION_ORDER_START,
    payload: productionOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectProductionOrderByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_PRODUCTION_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject production order by id failed action
 * @returns {object}
 */
export function rejectProductionOrderByIdFailed() {
  return {
    type: WMSX_REJECT_PRODUCTION_ORDER_FAILED,
  }
}

/**
 * Get import lot number
 * @param {int} productionOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getImportLotNumber(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_IMPORT_LOT_NUMBER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get import lot number success action
 * @param {*} payload
 * @returns {object}
 */
export function getImportLotNumberSuccess(payload) {
  return {
    type: WMSX_GET_IMPORT_LOT_NUMBER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get import lot number failed action
 * @returns {object}
 */
export function getImportLotNumberFailed() {
  return {
    type: WMSX_GET_IMPORT_LOT_NUMBER_FAILED,
  }
}

/**
 * Get export lot number
 * @param {int} productionOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getExportLotNumber(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_EXPORT_LOT_NUMBER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get export lot number success action
 * @param {*} payload
 * @returns {object}
 */
export function getExportLotNumberSuccess(payload) {
  return {
    type: WMSX_GET_EXPORT_LOT_NUMBER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get export lot number failed action
 * @returns {object}
 */
export function getExportLotNumberFailed() {
  return {
    type: WMSX_GET_EXPORT_LOT_NUMBER_FAILED,
  }
}

export function resetProductionOrderDetail() {
  return {
    type: WMSX_RESET_PRODUCTION_ORDER_DETAIL,
  }
}

export default {
  createProductionOrder,
  searchProductionOrders,
  searchProductionOrdersSuccess,
  searchProductionOrdersFailed,
  createProductionOrderSuccess,
  createProductionOrderFailed,
  confirmProductionOrderById,
  confirmProductionOrderByIdSuccess,
  confirmProductionOrderByIdFailed,
  updateProductionOrder,
  updateProductionOrderSuccess,
  updateProductionOrderFailed,
  deleteProductionOrder,
  deleteProductionOrderSuccess,
  deleteProductionOrderFailed,
  getProductionOrderDetailsById,
  getProductionOrderDetailsByIdSuccess,
  getProductionOrderDetailsByIdFailed,
  getExportLotNumber,
  getExportLotNumberSuccess,
  getExportLotNumberFailed,
  getImportLotNumber,
  getImportLotNumberSuccess,
  getImportLotNumberFailed,
  rejectProductionOrderById,
  rejectProductionOrderByIdSuccess,
  rejectProductionOrderByIdFailed,
  resetProductionOrderDetail,
}
