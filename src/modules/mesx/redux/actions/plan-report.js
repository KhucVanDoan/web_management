export const GET_PLAN_REPORT = 'GET_PLAN_REPORT'
export const GET_PLAN_REPORT_SUCCESS = 'GET_PLAN_REPORT_SUCCESS'
export const EXPORT_PLAN_REPORT = 'EXPORT_PLAN_REPORT'
export const EXPORT_PLAN_REPORT_SUCCESS = 'EXPORT_PLAN_REPORT_SUCCESS'
export const EXPORT_PLAN_REPORT_FAILED = 'EXPORT_PLAN_REPORT_FAILED'
/**
 * get plan report
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getPlanReport(payload, onSuccess, onError) {
  return {
    type: GET_PLAN_REPORT,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get plan success action
 * @param {*} payload
 * @returns {object}
 */
export function getPlanReportSuccess(payload) {
  return {
    type: GET_PLAN_REPORT_SUCCESS,
    payload: payload,
  }
}
export function exportPlanReport(payload, onSuccess, onError) {
  return {
    type: EXPORT_PLAN_REPORT,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function exportPlanReportSuccess(payload) {
  return {
    type: EXPORT_PLAN_REPORT_SUCCESS,
    payload: payload,
  }
}
export function exportPlanReportFailed() {
  return {
    type: EXPORT_PLAN_REPORT_FAILED,
  }
}

export default {
  getPlanReport,
  getPlanReportSuccess,
  exportPlanReport,
  exportPlanReportSuccess,
  exportPlanReportFailed,
}
