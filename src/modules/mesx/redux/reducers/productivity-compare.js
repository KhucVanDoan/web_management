import {
  GET_REPORT_PRODUCTIVITY_COMPARE_FAILED,
  GET_REPORT_PRODUCTIVITY_COMPARE_START,
  GET_REPORT_PRODUCTIVITY_COMPARE_SUCCESS,
} from '~/modules/mesx/redux//actions/productivity-compare'

const initialState = {
  isLoading: false,
  listProductivityCompare: [],
}

export default function productivityCompareReport(
  state = initialState,
  action,
) {
  switch (action.type) {
    case GET_REPORT_PRODUCTIVITY_COMPARE_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_REPORT_PRODUCTIVITY_COMPARE_SUCCESS:
      return {
        ...state,
        listProductivityCompare: action.payload,
      }
    case GET_REPORT_PRODUCTIVITY_COMPARE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
