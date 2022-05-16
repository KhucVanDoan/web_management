export const GET_DATA_PRODUCTIVITY_COMPARE_REPORT_START =
  'GET_DATA_PRODUCTIVITY_COMPARE_REPORT_START'
export const GET_DATA_PRODUCTIVITY_COMPARE_REPORT_SUCCESS =
  'GET_DATA_PRODUCTIVITY_COMPARE_REPORT_SUCCESS'
export const GET_DATA_PRODUCTIVITY_COMPARE_REPORT_FAILED =
  'GET_DATA_PRODUCTIVITY_COMPARE_REPORT_FAILED'

export function getDataProductivityCompareReport(payload, onSuccess, onError) {
  return {
    type: GET_DATA_PRODUCTIVITY_COMPARE_REPORT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDataProductivityCompareReportSuccess(payload) {
  return {
    type: GET_DATA_PRODUCTIVITY_COMPARE_REPORT_SUCCESS,
    payload,
  }
}

export function getDataProductivityCompareReportFailed() {
  return {
    type: GET_DATA_PRODUCTIVITY_COMPARE_REPORT_FAILED,
  }
}

export default {
  getDataProductivityCompareReport,
  getDataProductivityCompareReportSuccess,
  getDataProductivityCompareReportFailed,
}
