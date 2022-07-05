export const SEARCH_DEFINE_WAREHOUSE_PALLET_START =
  'SEARCH_DEFINE_WAREHOUSE_PALLET_START'
export const SEARCH_DEFINE_WAREHOUSE_PALLET_SUCCESS =
  'SEARCH_DEFINE_WAREHOUSE_PALLET_SUCCESS'
export const SEARCH_DEFINE_WAREHOUSE_PALLET_FAILED =
  'SEARCH_DEFINE_WAREHOUSE_PALLET_FAILED'

export const GET_DEFINE_WAREHOUSE_PALLET_START =
  'GET_DEFINE_WAREHOUSE_PALLET_START'
export const GET_DEFINE_WAREHOUSE_PALLET_SUCCESS =
  'GET_DEFINE_WAREHOUSE_PALLET_SUCCESS'
export const GET_DEFINE_WAREHOUSE_PALLET_FAILED =
  'GET_DEFINE_WAREHOUSE_PALLET_FAILED'
export const RESET_STATE_WAREHOUSE_PALLET = 'WMSX_ RESET_STATE_WAREHOUSE_PALLET'
/**
 * Search warehousefloor
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchDefineWarehousePallet(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEFINE_WAREHOUSE_PALLET_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehousefloor success action
 * @param {*} payload
 * @returns {object}
 */
export function searchDefineWarehousePalletSuccess(payload) {
  return {
    type: SEARCH_DEFINE_WAREHOUSE_PALLET_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehousefloor failed action
 * @returns {object}
 */
export function searchDefineWarehousePalletFailed() {
  return {
    type: SEARCH_DEFINE_WAREHOUSE_PALLET_FAILED,
  }
}

/**
 * Get warehousefloor details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getDefineWarehousePalletById(payload, onSuccess, onError) {
  return {
    type: GET_DEFINE_WAREHOUSE_PALLET_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehousefloor details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getDefineWarehousePalletByIdSuccess(payload) {
  return {
    type: GET_DEFINE_WAREHOUSE_PALLET_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehousefloor details by id failed action
 * @returns {object}
 */
export function getDefineWarehousePalletByIdFailed() {
  return {
    type: GET_DEFINE_WAREHOUSE_PALLET_FAILED,
  }
}
export function resetStateWarehousePallet() {
  return {
    type: RESET_STATE_WAREHOUSE_PALLET,
  }
}
export default {
  searchDefineWarehousePallet,
  searchDefineWarehousePalletSuccess,
  searchDefineWarehousePalletFailed,
  getDefineWarehousePalletById,
  getDefineWarehousePalletByIdSuccess,
  getDefineWarehousePalletByIdFailed,
  resetStateWarehousePallet,
}
