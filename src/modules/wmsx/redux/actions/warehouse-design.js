export const GET_WAREHOUSE_DESIGN_START = 'WMSX_GET_WAREHOUSE_DESIGN_START'
export const GET_WAREHOUSE_DESIGN_SUCCESS = 'WMSX_GET_WAREHOUSE_DESIGN_SUCCESS'
export const GET_WAREHOUSE_DESIGN_FAILED = 'WMSX_GET_WAREHOUSE_DESIGN_FAILED'
export const UPDATE_WAREHOUSE_DESIGN_START =
  'WMSX_UPDATE_WAREHOUSE_DESIGN_START'
export const UPDATE_WAREHOUSE_DESIGN_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_DESIGN_SUCCESS'
export const UPDATE_WAREHOUSE_DESIGN_FAILED =
  'WMSX_UPDATE_WAREHOUSE_DESIGN_FAILED'

/**
 * Get warehouse design
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseDesign(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_DESIGN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse design success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseDesignSuccess(payload) {
  return {
    type: GET_WAREHOUSE_DESIGN_SUCCESS,
    payload,
  }
}

/**
 * Get warehouse deisng failed
 * @returns {object}
 */
export function getWarehouseDesignFailed() {
  return {
    type: GET_WAREHOUSE_DESIGN_FAILED,
  }
}

/**
 * Update warehouse design
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function updateWarehouseDesign(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_DESIGN_START,
    payload,
    onSuccess,
    onError,
  }
}

/**
 * Update warehouse design success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWarehouseDesignSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_DESIGN_SUCCESS,
    payload,
  }
}

/**
 * Update warehouse deisng failed
 * @returns {object}
 */
export function updateWarehouseDesignFailed() {
  return {
    type: UPDATE_WAREHOUSE_DESIGN_FAILED,
  }
}
export default {
  getWarehouseDesign,
  getWarehouseDesignSuccess,
  getWarehouseDesignFailed,
  updateWarehouseDesign,
  updateWarehouseDesignSuccess,
  updateWarehouseDesignFailed,
}
