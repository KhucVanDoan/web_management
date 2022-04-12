export const GET_DATA_PRODUCTIVITY_REPORT_START =
  'GET_DATA_PRODUCTIVITY_REPORT_START'
export const GET_DATA_PRODUCTIVITY_REPORT_SUCCESS =
  'GET_DATA_PRODUCTIVITY_REPORT_SUCCESS'
export const GET_DATA_PRODUCTIVITY_REPORT_FAILED =
  'GET_DATA_PRODUCTIVITY_REPORT_FAILED'

/**
 * get data
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDataProductivityReport(payload, onSuccess, onError) {
  return {
    type: GET_DATA_PRODUCTIVITY_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get data success action
 * @param {*} payload
 * @returns {object}
 */
export function getDataProductivityReportSuccess(payload) {
  return {
    type: GET_DATA_PRODUCTIVITY_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * get data failed action
 * @returns {object}
 */
export function getDataProductivityReportFailed() {
  return {
    type: GET_DATA_PRODUCTIVITY_REPORT_FAILED,
  }
}

export default {
  getDataProductivityReport,
  getDataProductivityReportSuccess,
  getDataProductivityReportFailed,
}
