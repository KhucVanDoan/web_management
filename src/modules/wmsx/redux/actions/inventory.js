export const WMSX_SEARCH_INVENTORY_START = 'WMSX_SEARCH_INVENTORY_START'
export const WMSX_SEARCH_INVENTORY_SUCCESS = 'WMSX_SEARCH_INVENTORY_SUCCESS'
export const WMSX_SEARCH_INVENTORY_FAILED = 'WMSX_SEARCH_INVENTORY_FAILED'

export const WMSX_INVENTORY_DETAIL_START = 'WMSX_INVENTORY_DETAIL_START'
export const WMSX_INVENTORY_DETAIL_SUCCESS = 'WMSX_INVENTORY_DETAIL_SUCCESS'
export const WMSX_INVENTORY_DETAIL_FAILED = 'WMSX_INVENTORY_DETAIL_FAILED'

export const WMSX_GET_WAREHOUSE_TYPE_START = 'WMSX_GET_WAREHOUSE_TYPE_START'
export const WMSX_GET_WAREHOUSE_TYPE_SUCCESS = 'WMSX_GET_WAREHOUSE_TYPE_SUCCESS'
export const WMSX_GET_WAREHOUSE_TYPE_FAILED = 'WMSX_GET_WAREHOUSE_TYPE_FAILED'

/**
 * Get inventory details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function searchInventory(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_INVENTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInventorySuccess(payload) {
  return {
    type: WMSX_SEARCH_INVENTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function searchInventoryFailed() {
  return {
    type: WMSX_SEARCH_INVENTORY_FAILED,
  }
}

export function getInventoryDetail(payload, onSuccess, onError) {
  return {
    type: WMSX_INVENTORY_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getInventoryDetailSuccess(payload) {
  return {
    type: WMSX_INVENTORY_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function getInventoryDetailFailed() {
  return {
    type: WMSX_INVENTORY_DETAIL_FAILED,
  }
}

export function getWarehouseType(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_WAREHOUSE_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseTypeSuccess(payload) {
  return {
    type: WMSX_GET_WAREHOUSE_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function getWarehouseTypeFailed() {
  return {
    type: WMSX_GET_WAREHOUSE_TYPE_FAILED,
  }
}
export default {
  searchInventory,
  searchInventorySuccess,
  searchInventoryFailed,
  getInventoryDetail,
  getInventoryDetailFailed,
  getInventoryDetailSuccess,
  getWarehouseType,
  getWarehouseTypeFailed,
  getWarehouseTypeSuccess,
}
