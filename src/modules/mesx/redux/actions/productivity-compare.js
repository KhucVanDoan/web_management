export const GET_REPORT_PRODUCTIVITY_COMPARE_START =
  'GET_REPORT_PRODUCTIVITY_COMPARE_START'
export const GET_REPORT_PRODUCTIVITY_COMPARE_SUCCESS =
  'GET_REPORT_PRODUCTIVITY_COMPARE_SUCCESS'
export const GET_REPORT_PRODUCTIVITY_COMPARE_FAILED =
  'GET_REPORT_PRODUCTIVITY_COMPARE_FAILED'

export function getReportProductivityCompare(payload, onSuccess, onError) {
  return {
    type: GET_REPORT_PRODUCTIVITY_COMPARE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getReportProductivityCompareSuccess(payload) {
  return {
    type: GET_REPORT_PRODUCTIVITY_COMPARE_SUCCESS,
    payload,
  }
}

export function getReportProductivityCompareFailed() {
  return {
    type: GET_REPORT_PRODUCTIVITY_COMPARE_FAILED,
  }
}

export default {
  getReportProductivityCompare,
  getReportProductivityCompareSuccess,
  getReportProductivityCompareFailed,
}
