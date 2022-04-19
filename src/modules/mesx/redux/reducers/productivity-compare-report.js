import {
  GET_DATA_PRODUCTIVITY_COMPARE_REPORT_FAILED,
  GET_DATA_PRODUCTIVITY_COMPARE_REPORT_START,
  GET_DATA_PRODUCTIVITY_COMPARE_REPORT_SUCCESS,
} from '~/modules/mesx/redux/actions/productivity-compare-report'

const initialState = {
  isLoading: false,
  data: [],
}

export default function productivityCompareReport(
  state = initialState,
  action,
) {
  switch (action.type) {
    case GET_DATA_PRODUCTIVITY_COMPARE_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DATA_PRODUCTIVITY_COMPARE_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case GET_DATA_PRODUCTIVITY_COMPARE_REPORT_FAILED:
      return {
        ...state,
        data: [],
        isLoading: false,
        total: 0,
      }
    default:
      return state
  }
}
