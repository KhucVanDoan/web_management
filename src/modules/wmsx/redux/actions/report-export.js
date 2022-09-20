export const EXPORT_REPORT_START = 'WMSX_EXPORT_REPORT_START'
export const EXPORT_REPORT_SUCCESS = 'WMSX_EXPORT_REPORT_SUCCESS'
export const EXPORT_REPORT_FAILED = 'WMSX_EXPORT_REPORT_FAILED'

export function exportReport(payload, onSuccess, onError) {
  return {
    type: EXPORT_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function exportReportSuccess(payload) {
  return {
    type: EXPORT_REPORT_SUCCESS,
    payload: payload,
  }
}

export function exportReportFailed() {
  return {
    type: EXPORT_REPORT_FAILED,
  }
}

export default {
  exportReport,
  exportReportSuccess,
  exportReportFailed,
}
