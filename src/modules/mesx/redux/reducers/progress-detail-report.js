import {
  GET_PRODUCING_STEP_DASHBOARD_START,
  GET_PRODUCING_STEP_DASHBOARD_SUCCESS,
  GET_PRODUCING_STEP_DASHBOARD_FAILED,
} from '~/modules/mesx/redux/actions/progress-detail-report'
const initialState = {
  isLoading: false,
  progressReaport: [],
}
export default function progressDetailReport(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCING_STEP_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRODUCING_STEP_DASHBOARD_SUCCESS:
      return {
        ...state,
        progressDetailReaport: action.payload,
        isLoading: false,
      }
    case GET_PRODUCING_STEP_DASHBOARD_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
