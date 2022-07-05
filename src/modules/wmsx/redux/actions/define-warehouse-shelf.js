export const SEARCH_DEFINE_WAREHOUSE_SHELF_START =
  'WMSX_SEARCH_DEFINE_WAREHOUSE_SHELF_START'
export const SEARCH_DEFINE_WAREHOUSE_SHELF_SUCCESS =
  'WMSX_SEARCH_DEFINE_WAREHOUSE_SHELF_SUCCESS'
export const SEARCH_DEFINE_WAREHOUSE_SHELF_FAILED =
  'WMSX_SEARCH_DEFINE_WAREHOUSE_SHELF_FAILED'

export const GET_DEFINE_WAREHOUSE_SHELF_START =
  'WMSX_GET_DEFINE_WAREHOUSE_SHELF_START'
export const GET_DEFINE_WAREHOUSE_SHELF_SUCCESS =
  'WMSX_GET_DEFINE_WAREHOUSE_SHELF_SUCCESS'
export const GET_DEFINE_WAREHOUSE_SHELF_FAILED =
  'WMSX_GET_DEFINE_WAREHOUSE_SHELF_FAILED'

export const RESET_STATE_WAREHOUSE_SHELF = 'WMSX_RESET_STATE_WAREHOUSE_SHELF'
/**
 * Search warehouseshelf
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchDefineWarehouseShelf(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEFINE_WAREHOUSE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehouseshelf success action
 * @param {*} payload
 * @returns {object}
 */
export function searchDefineWarehouseShelfSuccess(payload) {
  return {
    type: SEARCH_DEFINE_WAREHOUSE_SHELF_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouseshelf failed action
 * @returns {object}
 */
export function searchDefineWarehouseShelfFailed() {
  return {
    type: SEARCH_DEFINE_WAREHOUSE_SHELF_FAILED,
  }
}

/**
 * Get warehouseshelf details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getDefineWarehouseShelfById(payload, onSuccess, onError) {
  return {
    type: GET_DEFINE_WAREHOUSE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouseshelf details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getDefineWarehouseShelfByIdSuccess(payload) {
  return {
    type: GET_DEFINE_WAREHOUSE_SHELF_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouseshelf details by id failed action
 * @returns {object}
 */
export function getDefineWarehouseShelfByIdFailed() {
  return {
    type: GET_DEFINE_WAREHOUSE_SHELF_FAILED,
  }
}
export function resetStateWarehouseShelf() {
  return {
    type: RESET_STATE_WAREHOUSE_SHELF,
  }
}
export default {
  searchDefineWarehouseShelf,
  searchDefineWarehouseShelfFailed,
  searchDefineWarehouseShelfSuccess,
  getDefineWarehouseShelfById,
  getDefineWarehouseShelfByIdSuccess,
  getDefineWarehouseShelfByIdFailed,
}
