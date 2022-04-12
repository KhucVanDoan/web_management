import {
  CONFIRM_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  CONFIRM_INPUT_QUALITY_CONTROL_PLAN_START,
  CONFIRM_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  CREATE_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  CREATE_INPUT_QUALITY_CONTROL_PLAN_START,
  CREATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  DELETE_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  DELETE_INPUT_QUALITY_CONTROL_PLAN_START,
  DELETE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL,
  GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
  GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS,
  SEARCH_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  SEARCH_INPUT_QUALITY_CONTROL_PLAN_START,
  SEARCH_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  UPDATE_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  UPDATE_INPUT_QUALITY_CONTROL_PLAN_START,
  UPDATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
  RESET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE,
  GET_INPUT_ORDER_BY_STAGE_QC_START,
  GET_INPUT_ORDER_BY_STAGE_QC_SUCCESS,
  GET_INPUT_ORDER_BY_STAGE_QC_FAIL,
  GET_INPUT_PLAN_BY_ORDER_ID_START,
  GET_INPUT_PLAN_BY_ORDER_ID_SUCCESS,
  GET_INPUT_PLAN_BY_ORDER_ID_FAIL,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'

const initialState = {
  isLoading: false,
  inputQcPlanList: [],
  inputQcPlanDetail: {},
  total: null,
  inputOrderList: [],
  inputPlan: {},
}

/**
 * Reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inputQualityControlPlan(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INPUT_QUALITY_CONTROL_PLAN_START:
    case CREATE_INPUT_QUALITY_CONTROL_PLAN_START:
    case UPDATE_INPUT_QUALITY_CONTROL_PLAN_START:
    case DELETE_INPUT_QUALITY_CONTROL_PLAN_START:
    case GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_START:
    case CONFIRM_INPUT_QUALITY_CONTROL_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_INPUT_ORDER_BY_STAGE_QC_START:
    case GET_INPUT_PLAN_BY_ORDER_ID_START:
      return {
        ...state,
      }
    case SEARCH_INPUT_QUALITY_CONTROL_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        inputQcPlanList: action?.payload?.list,
        total: action?.payload?.total,
      }
    case SEARCH_INPUT_QUALITY_CONTROL_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case DELETE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case DELETE_INPUT_QUALITY_CONTROL_PLAN_FAIL:
    case CONFIRM_INPUT_QUALITY_CONTROL_PLAN_FAIL:
    case CONFIRM_INPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case CREATE_INPUT_QUALITY_CONTROL_PLAN_FAIL:
    case CREATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case UPDATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS:
    case UPDATE_INPUT_QUALITY_CONTROL_PLAN_FAIL:
    case GET_INPUT_ORDER_BY_STAGE_QC_FAIL:
    case GET_INPUT_PLAN_BY_ORDER_ID_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        inputQcPlanDetail: action?.payload,
        isLoading: false,
      }
    case GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL:
      return {
        ...state,
        inputQcPlanDetail: {},
        isLoading: false,
      }
    case RESET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE:
      return {
        ...state,
        inputQcPlanDetail: {},
        isLoading: false,
      }
    case GET_INPUT_ORDER_BY_STAGE_QC_SUCCESS:
      return {
        ...state,
        inputOrderList: action?.payload,
      }
    case GET_INPUT_PLAN_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        inputPlan: action?.payload,
      }
    default:
      return state
  }
}
