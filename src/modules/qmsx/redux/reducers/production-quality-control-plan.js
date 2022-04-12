import {
  CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_START,
  CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
  CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
  CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
  DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
  DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
  GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_FAIL,
  GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_START,
  GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS,
  SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_START,
  SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
  UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
  UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
  RESET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_STATE,
  GET_INPUT_MO_PRODUCTION_QC_PLAN_START,
  GET_INPUT_MO_PRODUCTION_QC_PLAN_SUCCESS,
  GET_INPUT_MO_PRODUCTION_QC_PLAN_FAIL,
  GET_OUTPUT_MO_PRODUCTION_QC_PLAN_START,
  GET_OUTPUT_MO_PRODUCTION_QC_PLAN_SUCCESS,
  GET_OUTPUT_MO_PRODUCTION_QC_PLAN_FAIL,
  GET_PRODUCTION_PLAN_BY_MO_ID_START,
  GET_PRODUCTION_PLAN_BY_MO_ID_SUCCESS,
  GET_PRODUCTION_PLAN_BY_MO_ID_FAIL,
  GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_START,
  GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_SUCCESS,
  GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_FAIL,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'

const initialState = {
  isLoading: false,
  productionQcPlanList: [],
  productionQcPlanDetail: {},
  total: null,
  inputMoList: [],
  outputMoList: [],
  productionPlan: [],
  productionPlanDetail: {},
}

/**
 * Reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function productionQualityControlPlan(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_START:
    case CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_START:
    case UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_START:
    case DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_START:
    case GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_START:
    case CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_INPUT_MO_PRODUCTION_QC_PLAN_START:
    case GET_OUTPUT_MO_PRODUCTION_QC_PLAN_START:
    case GET_PRODUCTION_PLAN_BY_MO_ID_START:
    case GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_START:
      return {
        ...state,
      }
    case SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productionQcPlanList: action?.payload?.list,
        total: action?.payload?.total,
      }
    case SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS:
    case DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL:
    case CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL:
    case CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS:
    case CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL:
    case CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS:
    case UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS:
    case UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL:
    case GET_INPUT_MO_PRODUCTION_QC_PLAN_FAIL:
    case GET_OUTPUT_MO_PRODUCTION_QC_PLAN_FAIL:
    case GET_PRODUCTION_PLAN_BY_MO_ID_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        productionQcPlanDetail: action?.payload,
        isLoading: false,
      }
    case GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_FAIL:
      return {
        ...state,
        productionQcPlanDetail: {},
        isLoading: false,
      }
    case RESET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_STATE:
      return {
        ...state,
        productionQcPlanDetail: {},
        isLoading: false,
      }
    case GET_INPUT_MO_PRODUCTION_QC_PLAN_SUCCESS:
      return {
        ...state,
        inputMoList: action?.payload,
      }
    case GET_OUTPUT_MO_PRODUCTION_QC_PLAN_SUCCESS:
      return {
        ...state,
        outputMoList: action?.payload,
      }
    case GET_PRODUCTION_PLAN_BY_MO_ID_SUCCESS:
      return {
        ...state,
        productionPlan: action?.payload,
      }
    case GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_SUCCESS:
      return {
        ...state,
        productionPlanDetail: action?.payload,
      }
    case GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_FAIL:
      return {
        ...state,
        productionPlanDetail: {},
      }
    default:
      return state
  }
}
