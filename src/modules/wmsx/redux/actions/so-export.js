export const WMSX_SEARCH_SO_EXPORT_START = 'WMSX_SEARCH_SO_EXPORT_START'
export const WMSX_SEARCH_SO_EXPORT_SUCCESS = 'WMSX_SEARCH_SO_EXPORT_SUCCESS'
export const WMSX_SEARCH_SO_EXPORT_FAILED = 'WMSX_SEARCH_SO_EXPORT_FAILED'

export const WMSX_CREATE_SO_EXPORT_START = 'WMSX_CREATE_SO_EXPORT_START'
export const WMSX_CREATE_SO_EXPORT_SUCCESS = 'WMSX_CREATE_SO_EXPORT_SUCCESS'
export const WMSX_CREATE_SO_EXPORT_FAILED = 'WMSX_CREATE_SO_EXPORT_FAILED'

export const WMSX_UPDATE_SO_EXPORT_START = 'WMSX_UPDATE_SO_EXPORT_START'
export const WMSX_UPDATE_SO_EXPORT_SUCCESS = 'WMSX_UPDATE_SO_EXPORT_SUCCESS'
export const WMSX_UPDATE_SO_EXPORT_FAILED = 'WMSX_UPDATE_SO_EXPORT_FAILED'

export const WMSX_DELETE_SO_EXPORT_START = 'WMSX_DELETE_SO_EXPORT_START'
export const WMSX_DELETE_SO_EXPORT_SUCCESS = 'WMSX_DELETE_SO_EXPORT_SUCCESS'
export const WMSX_DELETE_SO_EXPORT_FAILED = 'WMSX_DELETE_SO_EXPORT_FAILED'

export const WMSX_GET_SO_EXPORT_DETAILS_START =
  'WMSX_GET_SO_EXPORT_DETAILS_START'
export const WMSX_GET_SO_EXPORT_DETAILS_SUCCESS =
  'WMSX_GET_SO_EXPORT_DETAILS_SUCCESS'
export const WMSX_GET_SO_EXPORT_DETAILS_FAILED =
  'WMSX_GET_SO_EXPORT_DETAILS_FAILED'

export const WMSX_CONFIRM_SO_EXPORT_START = 'WMSX_CONFIRM_SO_EXPORT_START'
export const WMSX_CONFIRM_SO_EXPORT_SUCCESS = 'WMSX_CONFIRM_SO_EXPORT_SUCCESS'
export const WMSX_CONFIRM_SO_EXPORT_FAILED = 'WMSX_CONFIRM_SO_EXPORT_FAILED'

export const WMSX_REJECT_SO_EXPORT_START = 'WMSX_REJECT_SO_EXPORT_START'
export const WMSX_REJECT_SO_EXPORT_SUCCESS = 'WMSX_REJECT_SO_EXPORT_SUCCESS'
export const WMSX_REJECT_SO_EXPORT_FAILED = 'WMSX_REJECT_SO_EXPORT_FAILED'

export const WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_START =
  'WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_START'
export const WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_SUCCESS =
  'WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_SUCCESS'
export const WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_FAILED =
  'WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_FAILED'

export const WMSX_RESET_SO_EXPORT_DETAIL_STATE =
  'WMSX_RESET_SO_EXPORT_DETAIL_STATE'

/**
 * Search SO export
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchSOExport(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_SO_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search SO export success action
 * @param {*} payload
 * @returns {object}
 */
export function searchSOExportSuccess(payload) {
  return {
    type: WMSX_SEARCH_SO_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search SO export failed action
 * @returns {object}
 */
export function searchSOExportFailed() {
  return {
    type: WMSX_SEARCH_SO_EXPORT_FAILED,
  }
}
/**
 * Create SOExport
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createSOExport(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_SO_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create SOExport success action
 * @param {*} payload
 * @returns {object}
 */
export function createSOExportSuccess(payload) {
  return {
    type: WMSX_CREATE_SO_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create SOExport failed action
 * @returns {object}
 */
export function createSOExportFailed() {
  return {
    type: WMSX_CREATE_SO_EXPORT_FAILED,
  }
}

/**
 * Update SOExport
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateSOExport(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_SO_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update SOExport success action
 * @param {*} payload
 * @returns {object}
 */
export function updateSOExportSuccess(payload) {
  return {
    type: WMSX_UPDATE_SO_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update SOExport failed action
 * @returns {object}
 */
export function updateSOExportFailed() {
  return {
    type: WMSX_UPDATE_SO_EXPORT_FAILED,
  }
}
/**
 * Delete SOExport
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteSOExport(SOExportId, onSuccess, onError) {
  return {
    type: WMSX_DELETE_SO_EXPORT_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete SOExport success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteSOExportSuccess(payload) {
  return {
    type: WMSX_DELETE_SO_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete SOExport failed action
 * @returns {object}
 */
export function deleteSOExportFailed() {
  return {
    type: WMSX_DELETE_SO_EXPORT_FAILED,
  }
}

/**
 * Get SOExport details
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getSOExportDetailsById(SOExportId, onSuccess, onError) {
  return {
    type: WMSX_GET_SO_EXPORT_DETAILS_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get SOExport details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getSOExportDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_SO_EXPORT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get SOExport details by id failed action
 * @returns {object}
 */
export function getSOExportDetailsByIdFailed() {
  return {
    type: WMSX_GET_SO_EXPORT_DETAILS_FAILED,
  }
}

/**
 * Get confirm Sale order
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmSOExportById(SOExportId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_SO_EXPORT_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm Sale order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmSOExportByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_SO_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm Sale order by id failed action
 * @returns {object}
 */
export function confirmSOExportByIdFailed() {
  return {
    type: WMSX_CONFIRM_SO_EXPORT_FAILED,
  }
}

/**
 * Get reject Sale order
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectSOExportById(SOExportId, onSuccess, onError) {
  return {
    type: WMSX_REJECT_SO_EXPORT_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject Sale order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectSOExportByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_SO_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject Sale order by id failed action
 * @returns {object}
 */
export function rejectSOExportByIdFailed() {
  return {
    type: WMSX_REJECT_SO_EXPORT_FAILED,
  }
}

/**
 * Get lot number list
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getLotNumberListSOExport(itemIds, onSuccess, onError) {
  return {
    type: WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_START,
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
export function getLotNumberListSOExportSuccess(payload) {
  return {
    type: WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get lot number list failed action
 * @returns {object}
 */
export function getLotNumberListSOExportFailed() {
  return {
    type: WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_FAILED,
  }
}

export function resetSOExportState() {
  return {
    type: WMSX_RESET_SO_EXPORT_DETAIL_STATE,
  }
}

export default {
  createSOExport,
  createSOExportSuccess,
  createSOExportFailed,
  deleteSOExport,
  deleteSOExportSuccess,
  deleteSOExportFailed,
  updateSOExport,
  updateSOExportSuccess,
  updateSOExportFailed,
  getLotNumberListSOExport,
  getLotNumberListSOExportSuccess,
  getLotNumberListSOExportFailed,
  confirmSOExportById,
  confirmSOExportByIdSuccess,
  confirmSOExportByIdFailed,
  rejectSOExportById,
  rejectSOExportByIdSuccess,
  rejectSOExportByIdFailed,
  resetSOExportState,
  searchSOExport,
  searchSOExportSuccess,
  searchSOExportFailed,
  getSOExportDetailsById,
  getSOExportDetailsByIdSuccess,
  getSOExportDetailsByIdFailed,
}
