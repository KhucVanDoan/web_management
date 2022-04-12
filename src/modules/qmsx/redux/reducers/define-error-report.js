import {
  CONFIRM_ERROR_REPORT_FAIL,
  CONFIRM_ERROR_REPORT_START,
  CONFIRM_ERROR_REPORT_SUCCESS,
  GET_ERROR_REPORT_DETAIL_FAIL,
  GET_ERROR_REPORT_DETAIL_START,
  GET_ERROR_REPORT_DETAIL_SUCCESS,
  REJECT_ERROR_REPORT_FAIL,
  REJECT_ERROR_REPORT_START,
  REJECT_ERROR_REPORT_SUCCESS,
  SEARCH_ERROR_REPORT_FAIL,
  SEARCH_ERROR_REPORT_START,
  SEARCH_ERROR_REPORT_SUCCESS,
  RESET_ERROR_REPORT_DETAIL_STATE,
} from '~/modules/qmsx/redux/actions/define-error-report'

const initialState = {
  isLoading: false,
  errorReportList: [],
  errorReportDetail: {},
  total: null,
}

export default function defineErrorReport(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ERROR_REPORT_START:
    case GET_ERROR_REPORT_DETAIL_START:
    case CONFIRM_ERROR_REPORT_START:
    case REJECT_ERROR_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ERROR_REPORT_SUCCESS:
      return {
        ...state,
        errorReportList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_ERROR_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_ERROR_REPORT_FAIL:
    case CONFIRM_ERROR_REPORT_SUCCESS:
    case REJECT_ERROR_REPORT_FAIL:
    case REJECT_ERROR_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ERROR_REPORT_DETAIL_SUCCESS:
      return {
        ...state,
        errorReportDetail: action?.payload,
        isLoading: false,
      }
    case GET_ERROR_REPORT_DETAIL_FAIL:
      return {
        ...state,
        errorReportDetail: {},
        isLoading: false,
      }
    case RESET_ERROR_REPORT_DETAIL_STATE:
      return {
        ...state,
        errorReportDetail: {},
      }
    default:
      return state
  }
}
