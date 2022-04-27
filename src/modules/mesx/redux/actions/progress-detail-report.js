export const GET_PROGRESS_DETAIL_REPORT_START =
  'MESX_GET_PROGRESS_DETAIL_REPORT_START'
export const GET_PROGRESS_DETAIL_REPORT_SUCCESS =
  'MESX_GET_PROGRESS_DETAIL_REPORT_SUCCESS'
export const GET_PROGRESS_DETAIL_REPORT_FAILED =
  'MESX_GET_PROGRESS_DETAIL_REPORT_FAILED'
export const getProgressDetailReport = (payload, onSuccess, onError) => ({
  type: GET_PROGRESS_DETAIL_REPORT_START,
  payload,
  onSuccess,
  onError,
})

export const getProgressDetailReportSuccess = (payload) => ({
  type: GET_PROGRESS_DETAIL_REPORT_SUCCESS,
  payload,
})

export const getProgressDetailReportFailed = (payload) => ({
  type: GET_PROGRESS_DETAIL_REPORT_FAILED,
  payload,
})

export default {
  getProgressDetailReport,
  getProgressDetailReportSuccess,
  getProgressDetailReportFailed,
}
