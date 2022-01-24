import {
  CONFIRM_BOM_PRODUCING_STEP_FAILED,
  CONFIRM_BOM_PRODUCING_STEP_START,
  CONFIRM_BOM_PRODUCING_STEP_SUCCESS,
  CREATE_BOM_PRODUCING_STEP_FAILED,
  CREATE_BOM_PRODUCING_STEP_START,
  CREATE_BOM_PRODUCING_STEP_SUCCESS,
  DELETE_BOM_PRODUCING_STEP_FAILED,
  DELETE_BOM_PRODUCING_STEP_START,
  DELETE_BOM_PRODUCING_STEP_SUCCESS,
  GET_BOM_PRODUCING_STEP_DETAILS_FAILED,
  GET_BOM_PRODUCING_STEP_DETAILS_START,
  GET_BOM_PRODUCING_STEP_DETAILS_SUCCESS,
  REJECT_BOM_PRODUCING_STEP_FAILED,
  REJECT_BOM_PRODUCING_STEP_START,
  REJECT_BOM_PRODUCING_STEP_SUCCESS,
  SEARCH_BOM_PRODUCING_STEP_FAILED,
  SEARCH_BOM_PRODUCING_STEP_START,
  SEARCH_BOM_PRODUCING_STEP_SUCCESS,
  UPDATE_BOM_PRODUCING_STEP_FAILED,
  UPDATE_BOM_PRODUCING_STEP_START,
  UPDATE_BOM_PRODUCING_STEP_SUCCESS,
  GET_BOM_PRODUCING_STEP_BOM_DETAILS_FAILED,
  GET_BOM_PRODUCING_STEP_BOM_DETAILS_START,
  GET_BOM_PRODUCING_STEP_BOM_DETAILS_SUCCESS,
} from '~/modules/mesx/redux/actions/bom-producing-step.action'

const initialState = {
  isLoading: false,
  bomProducingStepList: [],
  bomProducingStepDetails: {},
  total: null,
}

export default function bomProducingStep(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOM_PRODUCING_STEP_START:
    case CREATE_BOM_PRODUCING_STEP_START:
    case UPDATE_BOM_PRODUCING_STEP_START:
    case DELETE_BOM_PRODUCING_STEP_START:
    case GET_BOM_PRODUCING_STEP_DETAILS_START:
    case CONFIRM_BOM_PRODUCING_STEP_START:
    case REJECT_BOM_PRODUCING_STEP_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_BOM_PRODUCING_STEP_SUCCESS:
      return {
        ...state,
        bomProducingStepList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_BOM_PRODUCING_STEP_FAILED:
      return {
        ...state,
        bomProducingStepList: [],
        isLoading: false,
        total: 0,
      }
    case CONFIRM_BOM_PRODUCING_STEP_FAILED:
    case CONFIRM_BOM_PRODUCING_STEP_SUCCESS:
    case REJECT_BOM_PRODUCING_STEP_FAILED:
    case REJECT_BOM_PRODUCING_STEP_SUCCESS:
    case CREATE_BOM_PRODUCING_STEP_FAILED:
    case CREATE_BOM_PRODUCING_STEP_SUCCESS:
    case UPDATE_BOM_PRODUCING_STEP_SUCCESS:
    case UPDATE_BOM_PRODUCING_STEP_FAILED:
    case DELETE_BOM_PRODUCING_STEP_SUCCESS:
    case DELETE_BOM_PRODUCING_STEP_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    case GET_BOM_PRODUCING_STEP_DETAILS_SUCCESS:
      return {
        ...state,
        bomProducingStepDetails: action.payload,
        isLoading: false,
      }
    case GET_BOM_PRODUCING_STEP_DETAILS_FAILED:
      return {
        ...state,
        bomProducingStepDetails: {},
        isLoading: false,
      }
    case GET_BOM_PRODUCING_STEP_BOM_DETAILS_START:
    case GET_BOM_PRODUCING_STEP_BOM_DETAILS_SUCCESS:
    case GET_BOM_PRODUCING_STEP_BOM_DETAILS_FAILED:
    default:
      return state
  }
}
