export const GET_QUALITY_REPORTS = 'MESX_quality-report/GET_QUALITY_REPORTS'
export const GET_QUALITY_REPORTS_SUCCESS =
  'MESX_quality-report/GET_QUALITY_REPORTS_SUCCESS'
export const GET_QUALITY_REPORTS_FAILED =
  'MESX_quality-report/GET_QUALITY_REPORTS_FAILED'

export const EXPORT_QUALITY_REPORTS =
  'MESX_quality-report/EXPORT_QUALITY_REPORTS'
export const EXPORT_QUALITY_REPORTS_SUCCESS =
  'MESX_quality-report/EXPORT_QUALITY_REPORTS_SUCCESS'
export const EXPORT_QUALITY_REPORTS_FAILED =
  'MESX_quality-report/EXPORT_QUALITY_REPORTS_FAILED'
export function getQualityReports(payload, onSuccess, onError) {
  return {
    type: GET_QUALITY_REPORTS,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getQualityReportsSuccess(payload) {
  return {
    type: GET_QUALITY_REPORTS_SUCCESS,
    payload: payload,
  }
}
export function getQualityReportsFailed() {
  return {
    type: GET_QUALITY_REPORTS_FAILED,
  }
}
export function exportQualityReports(payload, onSuccess, onError) {
  return {
    type: EXPORT_QUALITY_REPORTS,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function exportQualityReportsSuccess(payload) {
  return {
    type: EXPORT_QUALITY_REPORTS_SUCCESS,
    payload: payload,
  }
}
export function exportQualityReportsFailed() {
  return {
    type: EXPORT_QUALITY_REPORTS_FAILED,
  }
}
export default {
  getQualityReports,
  getQualityReportsSuccess,
  getQualityReportsFailed,
  exportQualityReports,
  exportQualityReportsSuccess,
  exportQualityReportsFailed,
}
