export const WMSX_SEARCH_WAREHOUSE_EXPORT_START =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_START'
export const WMSX_SEARCH_WAREHOUSE_EXPORT_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_SUCCESS'
export const WMSX_SEARCH_WAREHOUSE_EXPORT_FAILED =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_FAILED'

export const WMSX_GET_WAREHOUSE_EXPORT_DETAILS_START =
  'WMSX_GET_WAREHOUSE_EXPORT_DETAILS_START'
export const WMSX_GET_WAREHOUSE_EXPORT_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_EXPORT_DETAILS_SUCCESS'
export const WMSX_GET_WAREHOUSE_EXPORT_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_EXPORT_DETAILS_FAILED'
export const WMSX_RESET_WAREHOUSE_EXPORT_DETAILs_STATE =
  'WMSX_RESET_WAREHOUSE_EXPORT_DETAILs_STATE'
/**
 * Get movement details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function searchWarehouseExport(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_WAREHOUSE_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get movement details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWarehouseExportSuccess(payload) {
  return {
    type: WMSX_SEARCH_WAREHOUSE_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get movement details by id failed action
 * @returns {object}
 */
export function searchWarehouseExportFailed() {
  return {
    type: WMSX_SEARCH_WAREHOUSE_EXPORT_FAILED,
  }
}

/**
 * Get movement details
 * @param {int} movementId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseExportDetailsById(movementId, onSuccess, onError) {
  return {
    type: WMSX_GET_WAREHOUSE_EXPORT_DETAILS_START,
    payload: movementId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get movement details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseExportDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_WAREHOUSE_EXPORT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get movement details by id failed action
 * @returns {object}
 */
export function getWarehouseExportDetailsByIdFailed() {
  return {
    type: WMSX_GET_WAREHOUSE_EXPORT_DETAILS_FAILED,
  }
}

export function resetWarehouseExportDetailsState() {
  return {
    type: WMSX_RESET_WAREHOUSE_EXPORT_DETAILs_STATE,
  }
}

export default {
  searchWarehouseExport,
  searchWarehouseExportSuccess,
  searchWarehouseExportFailed,
  getWarehouseExportDetailsById,
  getWarehouseExportDetailsByIdSuccess,
  getWarehouseExportDetailsByIdFailed,
  resetWarehouseExportDetailsState,
}
