// Action: Get list error-report
export const SEARCH_ERROR_REPORT_START = 'QMSX_SEARCH_ERROR_REPORT_START'
export const SEARCH_ERROR_REPORT_SUCCESS = 'QMSX_SEARCH_ERROR_REPORT_SUCCESS'
export const SEARCH_ERROR_REPORT_FAIL = 'QMSX_SEARCH_ERROR_REPORT_FAIL'
// Action: Get confirm error-report
export const CONFIRM_ERROR_REPORT_START = 'QMSX_CONFIRM_ERROR_REPORT_START'
export const CONFIRM_ERROR_REPORT_SUCCESS = 'QMSX_CONFIRM_ERROR_REPORT_SUCCESS'
export const CONFIRM_ERROR_REPORT_FAIL = 'QMSX_CONFIRM_ERROR_REPORT_FAIL'
// Action: Get reject error-report
export const REJECT_ERROR_REPORT_START = 'QMSX_REJECT_ERROR_REPORT_START'
export const REJECT_ERROR_REPORT_SUCCESS = 'QMSX_REJECT_ERROR_REPORT_SUCCESS'
export const REJECT_ERROR_REPORT_FAIL = 'QMSX_REJECT_ERROR_REPORT_FAIL'
// Action: Get detail error-report
export const GET_ERROR_REPORT_DETAIL_START =
  'QMSX_GET_ERROR_REPORT_DETAIL_START'
export const GET_ERROR_REPORT_DETAIL_SUCCESS =
  'QMSX_GET_ERROR_REPORT_DETAIL_SUCCESS'
export const GET_ERROR_REPORT_DETAIL_FAIL = 'QMSX_GET_ERROR_REPORT_DETAIL_FAIL'
//Action: reset state
export const RESET_ERROR_REPORT_DETAIL_STATE =
  'QMSX_RESET_ERROR_REPORT_DETAIL_STATE'
/**
 * Search error-report start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchErrorReport(payload, onSuccess, onError) {
  return {
    type: SEARCH_ERROR_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search error-report success action
 * @param {*} payload
 * @returns {object}
 */
export function searchErrorReportSuccess(payload) {
  return {
    type: SEARCH_ERROR_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search error-report fail action
 * @returns {object}
 */
export function searchErrorReportFail() {
  return {
    type: SEARCH_ERROR_REPORT_FAIL,
  }
}

/**
 * Get confirm error report
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmErrorReport(params, onSuccess, onError) {
  return {
    type: CONFIRM_ERROR_REPORT_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm error report success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmErrorReportSuccess(payload) {
  return {
    type: CONFIRM_ERROR_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm error report fail action
 * @returns {object}
 */
export function confirmErrorReportFail() {
  return {
    type: CONFIRM_ERROR_REPORT_FAILED,
  }
}

/**
 * Get reject error report
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectErrorReport(params, onSuccess, onError) {
  return {
    type: REJECT_ERROR_REPORT_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject error report success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectErrorReportSuccess(payload) {
  return {
    type: REJECT_ERROR_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject error report fail action
 * @returns {object}
 */
export function rejectErrorReportFail() {
  return {
    type: REJECT_ERROR_REPORT_FAIL,
  }
}

/**
 * Get error-report detail start action
 * @param {int} errorReportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getErrorReportDetailById(errorReportId, onSuccess, onError) {
  return {
    type: GET_ERROR_REPORT_DETAIL_START,
    payload: errorReportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get error-report detail by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getErrorReportDetailByIdSuccess(payload) {
  return {
    type: GET_ERROR_REPORT_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get error-report detail by id fail action
 * @returns {object}
 */
export function getErrorReportDetailByIdFail() {
  return {
    type: GET_ERROR_REPORT_DETAIL_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetErrorReportDetailState() {
  return {
    type: RESET_ERROR_REPORT_DETAIL_STATE,
  }
}

export default {
  searchErrorReport,
  searchErrorReportSuccess,
  searchErrorReportFail,
  getErrorReportDetailById,
  getErrorReportDetailByIdSuccess,
  getErrorReportDetailByIdFail,
  rejectErrorReport,
  rejectErrorReportSuccess,
  rejectErrorReportFail,
  confirmErrorReport,
  confirmErrorReportSuccess,
  confirmErrorReportFail,
  resetErrorReportDetailState,
}
