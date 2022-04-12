import {
  GET_DASHBOARD_MO_STATUS_SUCCESS,
  GET_DASHBOARD_FINISHED_ITEM_PROGRESS_SUCCESS,
  GET_DASHBOARD_IN_PROGRESS_MOS_SUCCESS,
  GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START_SUCCESS,
  GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START_SUCCESS,
  GET_DASHBOARD_SUMMARY_START,
  GET_DASHBOARD_SUMMARY_SUCCESS,
  GET_DASHBOARD_FINISHED_ITEM_PROGRESS_START,
} from '~/modules/mesx/redux/actions/dashboard'

const initialState = {
  summary: {},
  finishedItemProgress: [],
  qcProducingStepProgress: [],
  producingStepProgress: [],
  inProgressMos: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_SUMMARY_START:
    case GET_DASHBOARD_FINISHED_ITEM_PROGRESS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DASHBOARD_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        isLoading: false,
      }
    case GET_DASHBOARD_MO_STATUS_SUCCESS:
      return {
        ...state,
        moStatus: action.payload,
        isLoading: false,
      }
    case GET_DASHBOARD_IN_PROGRESS_MOS_SUCCESS:
      return {
        ...state,
        inProgressMos: action.payload,
      }
    case GET_DASHBOARD_FINISHED_ITEM_PROGRESS_SUCCESS:
      return {
        ...state,
        finishedItemProgress: action.payload,
      }
    case GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START_SUCCESS:
      return {
        ...state,
        qcProducingStepProgress: action.payload,
      }
    case GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START_SUCCESS:
      return {
        ...state,
        producingStepProgress: action.payload,
      }
    default:
      return state
  }
}
