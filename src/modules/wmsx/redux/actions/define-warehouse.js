export const WMSX_SEARCH_WAREHOUSES_START = 'WMSX_SEARCH_WAREHOUSES_START'
export const WMSX_SEARCH_WAREHOUSES_SUCCESS = 'WMSX_SEARCH_WAREHOUSES_SUCCESS'
export const WMSX_SEARCH_WAREHOUSES_FAILED = 'WMSX_SEARCH_WAREHOUSES_FAILED'

export const WMSX_CREATE_WAREHOUSE_START = 'WMSX_CREATE_WAREHOUSE_START'
export const WMSX_CREATE_WAREHOUSE_SUCCESS = 'WMSX_CREATE_WAREHOUSE_SUCCESS'
export const WMSX_CREATE_WAREHOUSE_FAILED = 'WMSX_CREATE_WAREHOUSE_FAILED'

export const WMSX_UPDATE_WAREHOUSE_START = 'WMSX_UPDATE_WAREHOUSE_START'
export const WMSX_UPDATE_WAREHOUSE_SUCCESS = 'WMSX_UPDATE_WAREHOUSE_SUCCESS'
export const WMSX_UPDATE_WAREHOUSE_FAILED = 'WMSX_UPDATE_WAREHOUSE_FAILED'

export const WMSX_DELETE_WAREHOUSE_START = 'WMSX_DELETE_WAREHOUSE_START'
export const WMSX_DELETE_WAREHOUSE_SUCCESS = 'WMSX_DELETE_WAREHOUSE_SUCCESS'
export const WMSX_DELETE_WAREHOUSE_FAILED = 'WMSX_DELETE_WAREHOUSE_FAILED'

export const WMSX_CONFIRM_WAREHOUSE_START = 'WMSX_CONFIRM_WAREHOUSE_START'
export const WMSX_CONFIRM_WAREHOUSE_SUCCESS = 'WMSX_CONFIRM_WAREHOUSE_SUCCESS'
export const WMSX_CONFIRM_WAREHOUSE_FAILED = 'WMSX_CONFIRM_WAREHOUSE_FAILED'

export const WMSX_GET_WAREHOUSE_DETAILS_START =
  'WMSX_GET_WAREHOUSE_DETAILS_START'
export const WMSX_GET_WAREHOUSE_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_DETAILS_SUCCESS'
export const WMSX_GET_WAREHOUSE_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_DETAILS_FAILED'

export const WMSX_PRINT_QR_WAREHOUSES_START = 'WMSX_PRINT_QR_WAREHOUSES_START'
export const WMSX_PRINT_QR_WAREHOUSES_SUCCESS =
  'WMSX_PRINT_QR_WAREHOUSES_SUCCESS'
export const WMSX_PRINT_QR_WAREHOUSES_FAILED = 'WMSX_PRINT_QR_WAREHOUSES_FAILED'

export const WMSX_IMPORT_WAREHOUSE_START = 'WMSX_IMPORT_WAREHOUSE_START'
export const WMSX_IMPORT_WAREHOUSE_SUCCESS = 'WMSX_IMPORT_WAREHOUSE_SUCCESS'
export const WMSX_IMPORT_WAREHOUSE_FAILED = 'WMSX_IMPORT_WAREHOUSE_FAILED'
export const WMSX_RESET_WAREHOUSE_DETAIL_STATE =
  'WMSX_RESET_WAREHOUSE_DETAIL_STATE'
export const WMSX_RESET_WAREHOUSE_LIST_STATE = 'WMSX_RESET_WAREHOUSE_LIST_STATE'
export const GET_WAREHOUSE_DETAILS_CANVAS_START =
  'WMSX_GET_WAREHOUSE_DETAILS_CANVAS_START'
export const GET_WAREHOUSE_DETAILS_CANVAS_SUCCESS =
  'WMSX_GET_WAREHOUSE_DETAILS_CANVAS_SUCCESS'
export const GET_WAREHOUSE_DETAILS_CANVAS_FAILED =
  'WMSX_GET_WAREHOUSE_DETAILS_FAILED'
export const UPDATE_WAREHOUSE_CANVAS_START =
  'WMSX_UPDATE_WAREHOUSE_CANVAS_START'
export const UPDATE_WAREHOUSE_CANVAS_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_CANVAS_SUCCESS'
export const UPDATE_WAREHOUSE_CANVAS_FAILED =
  'WMSX_UPDATE_WAREHOUSE_CANVAS_FAILED'

export const RESET_STATE_WAREHOUSE_CANVAS = 'WMSX_RESET_STATE_WAREHOUSE_CANVAS'
/**
 * Search warehouse
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWarehouses(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_WAREHOUSES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWarehousesSuccess(payload) {
  return {
    type: WMSX_SEARCH_WAREHOUSES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse failed action
 * @returns {object}
 */
export function searchWarehousesFailed() {
  return {
    type: WMSX_SEARCH_WAREHOUSES_FAILED,
  }
}

/**
 * Create warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createWarehouse(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function createWarehouseSuccess(payload) {
  return {
    type: WMSX_CREATE_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create warehouse failed action
 * @returns {object}
 */
export function createWarehouseFailed() {
  return {
    type: WMSX_CREATE_WAREHOUSE_FAILED,
  }
}

/**
 * Update warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWarehouse(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWarehouseSuccess(payload) {
  return {
    type: WMSX_UPDATE_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update warehouse failed action
 * @returns {object}
 */
export function updateWarehouseFailed() {
  return {
    type: WMSX_UPDATE_WAREHOUSE_FAILED,
  }
}
/**
 * Delete warehouse
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteWarehouse(warehouseId, onSuccess, onError) {
  return {
    type: WMSX_DELETE_WAREHOUSE_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteWarehouseSuccess(payload) {
  return {
    type: WMSX_DELETE_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete warehouse failed action
 * @returns {object}
 */
export function deleteWarehouseFailed() {
  return {
    type: WMSX_DELETE_WAREHOUSE_FAILED,
  }
}

/**
 * Confirmwarehouse
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function confirmWarehouse(payload, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Confirm warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWarehouseSuccess(payload) {
  return {
    type: WMSX_CONFIRM_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

/**
 * Confirm warehouse failed action
 * @returns {object}
 */
export function confirmWarehouseFailed() {
  return {
    type: WMSX_CONFIRM_WAREHOUSE_FAILED,
  }
}

/**
 * Get warehouse details
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseDetailsById(warehouseId, onSuccess, onError) {
  return {
    type: WMSX_GET_WAREHOUSE_DETAILS_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_WAREHOUSE_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getWarehouseDetailsByIdFailed() {
  return {
    type: WMSX_GET_WAREHOUSE_DETAILS_FAILED,
  }
}

/**
 * Print QR warehouses
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function printQRWarehouses(warehouseId, onSuccess, onError) {
  return {
    type: WMSX_PRINT_QR_WAREHOUSES_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Print QR warehouses by id success action
 * @param {*} payload
 * @returns {object}
 */
export function printQRWarehousesSuccess(payload) {
  return {
    type: WMSX_PRINT_QR_WAREHOUSES_SUCCESS,
    payload: payload,
  }
}

/**
 * Print QR warehouses by id failed action
 * @returns {object}
 */
export function printQRWarehousesFailed() {
  return {
    type: WMSX_PRINT_QR_WAREHOUSES_FAILED,
  }
}

/**
 * import warehouse
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importWarehouse(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import warehouse success
 * @param {*} payload
 * @returns {object}
 */
export function importWarehouseSuccess(payload) {
  return {
    type: WMSX_IMPORT_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

/**
 * import warehouse failed
 * @returns {object}
 */
export function importWarehouseFailed() {
  return {
    type: WMSX_IMPORT_WAREHOUSE_FAILED,
  }
}

export function resetWarehouseState() {
  return {
    type: WMSX_RESET_WAREHOUSE_DETAIL_STATE,
  }
}

export function resetWarehouseListState() {
  return {
    type: WMSX_RESET_WAREHOUSE_LIST_STATE,
  }
}
export function getWarehouseDetailsCanvasById(warehouseId, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_DETAILS_CANVAS_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseDetailsCanvasByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_DETAILS_CANVAS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getWarehouseDetailsCanvasByIdFailed() {
  return {
    type: GET_WAREHOUSE_DETAILS_CANVAS_FAILED,
  }
}
export function updateWarehouseCanvas(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_CANVAS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWarehouseCanvasSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_CANVAS_SUCCESS,
    payload: payload,
  }
}

/**
 * Update warehouse failed action
 * @returns {object}
 */
export function updateWarehouseCanvasFailed() {
  return {
    type: UPDATE_WAREHOUSE_CANVAS_FAILED,
  }
}

export function restStateWarehouseCanvas() {
  return {
    type: RESET_STATE_WAREHOUSE_CANVAS,
  }
}
export default {
  searchWarehouses,
  searchWarehousesSuccess,
  searchWarehousesFailed,
  getWarehouseDetailsById,
  getWarehouseDetailsByIdSuccess,
  getWarehouseDetailsByIdFailed,
  createWarehouse,
  createWarehouseSuccess,
  createWarehouseFailed,
  updateWarehouse,
  updateWarehouseSuccess,
  updateWarehouseFailed,
  deleteWarehouse,
  deleteWarehouseSuccess,
  deleteWarehouseFailed,
  confirmWarehouse,
  confirmWarehouseSuccess,
  confirmWarehouseFailed,
  printQRWarehouses,
  printQRWarehousesSuccess,
  printQRWarehousesFailed,
  importWarehouse,
  importWarehouseSuccess,
  importWarehouseFailed,
  resetWarehouseState,
  resetWarehouseListState,
  getWarehouseDetailsCanvasById,
  getWarehouseDetailsCanvasByIdSuccess,
  getWarehouseDetailsCanvasByIdFailed,
  restStateWarehouseCanvas,
}
