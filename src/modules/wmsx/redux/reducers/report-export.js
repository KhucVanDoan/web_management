import {
  EXPORT_REPORT_FAILED,
  EXPORT_REPORT_START,
  EXPORT_REPORT_SUCCESS,
} from '~/modules/wmsx/redux/actions/report-export'

const initialState = {
  isLoading: false,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function reportExport(state = initialState, action) {
  switch (action.type) {
    case EXPORT_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case EXPORT_REPORT_SUCCESS:
    case EXPORT_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
