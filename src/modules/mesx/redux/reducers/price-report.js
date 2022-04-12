import {
  GET_PRICE_REPORT,
  GET_PRICE_REPORT_SUCCESS,
  GET_PRICE_REPORT_FAILED,
  EXPORT_PRICE_REPORT,
  EXPORT_PRICE_REPORT_FAILED,
  EXPORT_PRICE_REPORT_SUCCESS,
} from '~/modules/mesx/redux/actions/price-report'

const initialState = {
  isLoading: false,
  PriceReport: [],
  file: '',
}

/**
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function PriceReport(state = initialState, action) {
  switch (action.type) {
    case GET_PRICE_REPORT:
    case EXPORT_PRICE_REPORT:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRICE_REPORT_SUCCESS:
      return {
        ...state,
        PriceReport: action.payload.items,
        total: action.payload.meta.total,
        isLoading: false,
      }
    case GET_PRICE_REPORT_FAILED:
    case EXPORT_PRICE_REPORT_SUCCESS:
      return {
        ...state,
        file: action.payload.file,
        isLoading: false,
      }
    case EXPORT_PRICE_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
