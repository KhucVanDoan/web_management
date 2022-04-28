export const SEARCH_WAREHOUSE_SETTING_START =
  'WMSX_SEARCH_WAREHOUSE_SETTING_START'
export const SEARCH_WAREHOUSE_SETTING_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_SETTING_SUCCESS'
export const SEARCH_WAREHOUSE_SETTING_FAILED =
  'WMSX_SEARCH_WAREHOUSE_SETTING_FAILED'

export const CREATE_WAREHOUSE_SETTING_START =
  'WMSX_CREATE_WAREHOUSE_SETTING_START'
export const CREATE_WAREHOUSE_SETTING_SUCCESS =
  'WMSX_CREATE_WAREHOUSE_SETTING_SUCCESS'
export const CREATE_WAREHOUSE_SETTING_FAILED =
  'WMSX_CREATE_WAREHOUSE_SETTING_FAILED'

export const UPDATE_WAREHOUSE_SETTING_START =
  'WMSX_UPDATE_WAREHOUSE_SETTING_START'
export const UPDATE_WAREHOUSE_SETTING_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_SETTING_SUCCESS'
export const UPDATE_WAREHOUSE_SETTING_FAILED =
  'WMSX_UPDATE_WAREHOUSE_SETTING_FAILED'

export const DELETE_WAREHOUSE_SETTING_START =
  'WMSX_DELETE_WAREHOUSE_SETTING_START'
export const DELETE_WAREHOUSE_SETTING_SUCCESS =
  'WMSX_DELETE_WAREHOUSE_SETTING_SUCCESS'
export const DELETE_WAREHOUSE_SETTING_FAILED =
  'WMSX_DELETE_WAREHOUSE_SETTING_FAILED'

export const GET_WAREHOSE_SETTING_DETAIL_START =
  'WMSX_GET_WAREHOSE_SETTING_DETAIL_START'
export const GET_WAREHOSE_SETTING_DETAIL_SUCCESS =
  'WMSX_GET_WAREHOSE_SETTING_DETAIL_SUCCESS'
export const GET_WAREHOSE_SETTING_DETAIL_FAILED =
  'WMSX_GET_WAREHOSE_SETTING_DETAIL_FAILED'
export const RESET_WAREHOSE_SETTING_DETAIL_STATE =
  'WMSX_RESET_WAREHOSE_SETTING_DETAIL_STATE'
export function searchWarehouseSetting(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_SETTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search WAREHOUSE_SETTING success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWarehouseSettingSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Search WAREHOUSE_SETTING failed action
 * @returns {object}
 */
export function searchWarehouseSettingFailed() {
  return {
    type: SEARCH_WAREHOUSE_SETTING_FAILED,
  }
}

/**
 * Create WAREHOUSE_SETTING
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createWarehouseSetting(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_SETTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create WAREHOUSE_SETTING success action
 * @param {*} payload
 * @returns {object}
 */
export function createWarehouseSettingSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Create WAREHOUSE_SETTING failed action
 * @returns {object}
 */
export function createWarehouseSettingFailed() {
  return {
    type: CREATE_WAREHOUSE_SETTING_FAILED,
  }
}

/**
 * Update WAREHOUSE_SETTING
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWarehouseSetting(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_SETTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update WAREHOUSE_SETTING success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWarehouseSettingSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Update WAREHOUSE_SETTING failed action
 * @returns {object}
 */
export function updateWarehouseSettingFailed() {
  return {
    type: UPDATE_WAREHOUSE_SETTING_FAILED,
  }
}
/**
 * Delete WAREHOUSE_SETTING
 * @param {int} WAREHOUSE_SETTINGId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteWarehouseSetting(
  WAREHOUSE_SETTINGId,
  onSuccess,
  onError,
) {
  return {
    type: DELETE_WAREHOUSE_SETTING_START,
    payload: WAREHOUSE_SETTINGId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete WAREHOUSE_SETTING success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteWarehouseSettingSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete WAREHOUSE_SETTING failed action
 * @returns {object}
 */
export function deleteWarehouseSettingFailed() {
  return {
    type: DELETE_WAREHOUSE_SETTING_FAILED,
  }
}

/**
 * Get WAREHOUSE_SETTING details
 * @param {int} WAREHOUSE_SETTINGId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseSettingDetailsById(
  WAREHOUSE_SETTINGId,
  onSuccess,
  onError,
) {
  return {
    type: GET_WAREHOSE_SETTING_DETAIL_START,
    payload: WAREHOUSE_SETTINGId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get WAREHOUSE_SETTING details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseSettingDetailsByIdSuccess(payload) {
  return {
    type: GET_WAREHOSE_SETTING_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get WAREHOUSE_SETTING details by id failed action
 * @returns {object}
 */
export function getWarehouseSettingDetailsByIdFailed() {
  return {
    type: GET_WAREHOSE_SETTING_DETAIL_FAILED,
  }
}
export function resetWarehouseSettingState() {
  return {
    type: RESET_WAREHOSE_SETTING_DETAIL_STATE,
  }
}
export default {
  searchWarehouseSetting,
  searchWarehouseSettingSuccess,
  searchWarehouseSettingFailed,
  createWarehouseSetting,
  createWarehouseSettingSuccess,
  createWarehouseSettingFailed,
  updateWarehouseSetting,
  updateWarehouseSettingSuccess,
  updateWarehouseSettingFailed,
  deleteWarehouseSetting,
  deleteWarehouseSettingSuccess,
  deleteWarehouseSettingFailed,
  getWarehouseSettingDetailsById,
  getWarehouseSettingDetailsByIdSuccess,
  getWarehouseSettingDetailsByIdFailed,
  resetWarehouseSettingState,
}
