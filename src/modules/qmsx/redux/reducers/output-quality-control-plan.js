import {
  CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_START,
  CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  CREATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  CREATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
  CREATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  DELETE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  DELETE_OUTPUT_QUALITY_CONTROL_PLAN_START,
  DELETE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL,
  GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
  GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS,
  SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_START,
  SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
  UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  RESET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE,
  GET_OUTPUT_ORDER_BY_STAGE_QC_START,
  GET_OUTPUT_ORDER_BY_STAGE_QC_SUCCESS,
  GET_OUTPUT_ORDER_BY_STAGE_QC_FAIL,
  GET_OUTPUT_PLAN_BY_ORDER_ID_START,
  GET_OUTPUT_PLAN_BY_ORDER_ID_SUCCESS,
  GET_OUTPUT_PLAN_BY_ORDER_ID_FAIL,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'

const initialState = {
  isLoading: false,
  outputQcPlanList: [],
  outputQcPlanDetail: {},
  total: null,
  outputOrderList: [],
  outputPlan: {},
}

/**
 * Reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function outputQualityControlPlan(state = initialState, action) {
  switch (action.type) {
    case SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_START:
    case CREATE_OUTPUT_QUALITY_CONTROL_PLAN_START:
    case UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_START:
    case DELETE_OUTPUT_QUALITY_CONTROL_PLAN_START:
    case GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_START:
    case CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_OUTPUT_ORDER_BY_STAGE_QC_START:
    case GET_OUTPUT_PLAN_BY_ORDER_ID_START:
      return {
        ...state,
      }
    case SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        outputQcPlanList: action?.payload?.list,
        total: action?.payload?.total,
      }
    case SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case DELETE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case DELETE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL:
    case CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_FAIL:
    case CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case CREATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL:
    case CREATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL:
    case GET_OUTPUT_ORDER_BY_STAGE_QC_FAIL:
    case GET_OUTPUT_PLAN_BY_ORDER_ID_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        outputQcPlanDetail: action?.payload,
        isLoading: false,
      }
    case GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL:
      return {
        ...state,
        outputQcPlanDetail: {},
        isLoading: false,
      }
    case RESET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE:
      return {
        ...state,
        outputQcPlanDetail: {},
        isLoading: false,
      }
    case GET_OUTPUT_ORDER_BY_STAGE_QC_SUCCESS:
      return {
        ...state,
        outputOrderList: action?.payload,
      }
    case GET_OUTPUT_PLAN_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        outputPlan: action?.payload,
      }
    default:
      return state
  }
}
