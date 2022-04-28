import {
  GET_PROGRESS_DETAIL_REPORT_START,
  GET_PROGRESS_DETAIL_REPORT_SUCCESS,
  GET_PROGRESS_DETAIL_REPORT_FAILED,
} from '~/modules/mesx/redux/actions/progress-detail-report'
const initialState = {
  isLoading: false,
  progressDetailReports: [],
}
export default function progressDetailReport(state = initialState, action) {
  switch (action.type) {
    case GET_PROGRESS_DETAIL_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PROGRESS_DETAIL_REPORT_SUCCESS:
      return {
        ...state,
        progressDetailReports: action.payload,
        isLoading: false,
      }
    case GET_PROGRESS_DETAIL_REPORT_FAILED:
      return {
        ...state,
        progressDetailReports: [],
        isLoading: false,
      }
    default:
      return state
  }
}
