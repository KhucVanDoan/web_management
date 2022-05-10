export const WMSX_SEARCH_WAREHOUSE_REPORTS_START =
  'SEARCH_WAREHOUSE_REPORT_START'
export const WMSX_SEARCH_WAREHOUSE_REPORTS_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_REPORTS_SUCCESS'
export const WMSX_SEARCH_WAREHOUSE_REPORTS_FAILED =
  'WMSX_SEARCH_WAREHOUSE_REPORTS_FAILED'

export const WMSX_CREATE_WAREHOUSE_REPORT_START =
  'WMSX_CREATE_WAREHOUSE_REPORT_START'
export const WMSX_CREATE_WAREHOUSE_REPORT_SUCCESS =
  'WMSX_CREATE_WAREHOUSE_REPORT_SUCCESS'
export const WMSX_CREATE_WAREHOUSE_REPORT_FAILED =
  'WMSX_CREATE_WAREHOUSE_REPORT_FAILED'

export const WMSX_UPDATE_WAREHOUSE_REPORT_START =
  'WMSX_UPDATE_WAREHOUSE_REPORT_START'
export const WMSX_UPDATE_WAREHOUSE_REPORT_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_REPORT_SUCCESS'
export const WMSX_UPDATE_WAREHOUSE_REPORT_FAILED =
  'WMSX_UPDATE_WAREHOUSE_REPORT_FAILED'

export const WMSX_DELETE_WAREHOUSE_REPORT_START =
  'WMSX_DELETE_WAREHOUSE_REPORT_START'
export const WMSX_DELETE_WAREHOUSE_REPORT_SUCCESS =
  'WMSX_DELETE_WAREHOUSE_REPORT_SUCCESS'
export const WMSX_DELETE_WAREHOUSE_REPORT_FAILED =
  'WMSX_DELETE_WAREHOUSE_REPORT_FAILED'

export const WMSX_GET_WAREHOUSE_REPORT_DETAILS_START =
  'WMSX_GET_WAREHOUSE_REPORT_DETAILS_START'
export const WMSX_GET_WAREHOUSE_REPORT_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_REPORT_DETAILS_SUCCESS'
export const WMSX_GET_WAREHOUSE_REPORT_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_REPORT_DETAILS_FAILED'

export const WMSX_RESET_WAREHOUSE_REPORT_DETAIL_STATE =
  'WMSX_RESET_WAREHOUSE_REPORT_DETAIL_STATE'
/**
 * Search warehouse report
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWarehouseReports(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_WAREHOUSE_REPORTS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehouse report success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWarehouseReportsSuccess(payload) {
  return {
    type: WMSX_SEARCH_WAREHOUSE_REPORTS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse report failed action
 * @returns {object}
 */
export function searchWarehouseReportsFailed() {
  return {
    type: WMSX_SEARCH_WAREHOUSE_REPORTS_FAILED,
  }
}

/**
 * Create warehouse report
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createWarehouseReport(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_WAREHOUSE_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create warehouse report success action
 * @param {*} payload
 * @returns {object}
 */
export function createWarehouseReportSuccess(payload) {
  return {
    type: WMSX_CREATE_WAREHOUSE_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create warehouse report failed action
 * @returns {object}
 */
export function createWarehouseReportFailed() {
  return {
    type: WMSX_CREATE_WAREHOUSE_REPORT_FAILED,
  }
}

/**
 * Update warehouse report
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWarehouseReport(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_WAREHOUSE_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update warehouse report success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWarehouseReportSuccess(payload) {
  return {
    type: WMSX_UPDATE_WAREHOUSE_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update warehouse report failed action
 * @returns {object}
 */
export function updateWarehouseReportFailed() {
  return {
    type: WMSX_UPDATE_WAREHOUSE_REPORT_FAILED,
  }
}
/**
 * Delete warehouse report
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteWarehouseReport(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_WAREHOUSE_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete warehouse report success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteWarehouseReportSuccess(payload) {
  return {
    type: WMSX_DELETE_WAREHOUSE_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete warehouse report failed action
 * @returns {object}
 */
export function deleteWarehouseReportFailed() {
  return {
    type: WMSX_DELETE_WAREHOUSE_REPORT_FAILED,
  }
}

/**
 * Get warehouse report details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseReportDetailsById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_WAREHOUSE_REPORT_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse report details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseReportDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_WAREHOUSE_REPORT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse report details by id failed action
 * @returns {object}
 */
export function getWarehouseReportDetailsByIdFailed() {
  return {
    type: WMSX_GET_WAREHOUSE_REPORT_DETAILS_FAILED,
  }
}

export function resetWarehouseReportState() {
  return {
    type: WMSX_RESET_WAREHOUSE_REPORT_DETAIL_STATE,
  }
}

export default {
  searchWarehouseReports,
  searchWarehouseReportsSuccess,
  searchWarehouseReportsFailed,
  createWarehouseReport,
  createWarehouseReportSuccess,
  createWarehouseReportFailed,
  updateWarehouseReport,
  updateWarehouseReportSuccess,
  updateWarehouseReportFailed,
  deleteWarehouseReport,
  deleteWarehouseReportSuccess,
  deleteWarehouseReportFailed,
  getWarehouseReportDetailsById,
  getWarehouseReportDetailsByIdSuccess,
  getWarehouseReportDetailsByIdFailed,
  resetWarehouseReportState,
}
