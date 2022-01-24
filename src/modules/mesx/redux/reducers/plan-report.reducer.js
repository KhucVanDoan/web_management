import {
  GET_PLAN_REPORT,
  GET_PLAN_REPORT_SUCCESS,
  EXPORT_PLAN_REPORT,
  EXPORT_PLAN_REPORT_FAILED,
  EXPORT_PLAN_REPORT_SUCCESS,
} from '~/modules/mesx/redux/actions/plan-report.action'

const initialState = {
  isLoading: false,
  transactions: [],
  file: '',
}

/**
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function PlanReport(state = initialState, action) {
  switch (action.type) {
    case GET_PLAN_REPORT:
    case EXPORT_PLAN_REPORT:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PLAN_REPORT_SUCCESS:
      return {
        ...state,
        transactions: action.payload.items,
        total: action.payload.meta.total,
        isLoading: false,
      }
    case EXPORT_PLAN_REPORT_SUCCESS:
      return {
        ...state,
        file: action.payload.file,
        isLoading: false,
      }
    case EXPORT_PLAN_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
