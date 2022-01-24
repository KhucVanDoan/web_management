import {
  GET_QUALITY_REPORTS,
  GET_QUALITY_REPORTS_SUCCESS,
  GET_QUALITY_REPORTS_FAILED,
  EXPORT_QUALITY_REPORTS,
  EXPORT_QUALITY_REPORTS_SUCCESS,
  EXPORT_QUALITY_REPORTS_FAILED,
} from '~/modules/mesx/redux/actions/quality-report.action'

const initialState = {
  isLoading: false,
  transactions: [],
  file: '',
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function qualityReport(state = initialState, action) {
  switch (action.type) {
    case GET_QUALITY_REPORTS:
    case EXPORT_QUALITY_REPORTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QUALITY_REPORTS_SUCCESS:
      return {
        ...state,
        transactions: action.payload.items,
        total: action.payload.meta.total,
        isLoading: false,
      }
    case GET_QUALITY_REPORTS_FAILED:
      return {
        ...state,
        transactions: [],
        isLoading: false,
      }
    case EXPORT_QUALITY_REPORTS_SUCCESS:
      return {
        ...state,
        file: action.payload.file,
        isLoading: false,
      }
    case EXPORT_QUALITY_REPORTS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
