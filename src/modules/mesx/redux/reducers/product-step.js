import {
  CREATE_PRODUCING_STEP_FAILED,
  CREATE_PRODUCING_STEP_START,
  CREATE_PRODUCING_STEP_SUCCESS,
  DELETE_PRODUCING_STEP_FAILED,
  DELETE_PRODUCING_STEP_START,
  DELETE_PRODUCING_STEP_SUCCESS,
  GET_PRODUCING_STEP_DETAILS_FAILED,
  GET_PRODUCING_STEP_DETAILS_START,
  GET_PRODUCING_STEP_DETAILS_SUCCESS,
  SEARCH_PRODUCING_STEPS_FAILED,
  SEARCH_PRODUCING_STEPS_START,
  SEARCH_PRODUCING_STEPS_SUCCESS,
  UPDATE_PRODUCING_STEP_FAILED,
  UPDATE_PRODUCING_STEP_START,
  UPDATE_PRODUCING_STEP_SUCCESS,
  GET_BY_ROUTING_VERSION_FAILED,
  GET_BY_ROUTING_VERSION_START,
  GET_BY_ROUTING_VERSION_SUCCESS,
  CONFIRM_PRODUCING_STEP_FAILED,
  CONFIRM_PRODUCING_STEP_START,
  CONFIRM_PRODUCING_STEP_SUCCESS,
  RESER_PRODUCING_STEP_STATE,
} from '~/modules/mesx/redux/actions/product-step'

const initialState = {
  isLoading: false,
  list: [],
  details: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function operationSetting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRODUCING_STEPS_START:
    case CREATE_PRODUCING_STEP_START:
    case UPDATE_PRODUCING_STEP_START:
    case DELETE_PRODUCING_STEP_START:
    case GET_PRODUCING_STEP_DETAILS_START:
    case GET_BY_ROUTING_VERSION_START:
    case CONFIRM_PRODUCING_STEP_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PRODUCING_STEPS_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_BY_ROUTING_VERSION_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_PRODUCING_STEPS_FAILED:
    case CREATE_PRODUCING_STEP_SUCCESS:
    case CREATE_PRODUCING_STEP_FAILED:
    case UPDATE_PRODUCING_STEP_SUCCESS:
    case UPDATE_PRODUCING_STEP_FAILED:
    case DELETE_PRODUCING_STEP_SUCCESS:
    case DELETE_PRODUCING_STEP_FAILED:
    case GET_PRODUCING_STEP_DETAILS_FAILED:
    case GET_BY_ROUTING_VERSION_FAILED:
      return {
        ...state,
        details: {},
        isLoading: false,
      }
    case GET_PRODUCING_STEP_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isLoading: false,
      }

    case CONFIRM_PRODUCING_STEP_SUCCESS:
    case CONFIRM_PRODUCING_STEP_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESER_PRODUCING_STEP_STATE:
      return {
        ...state,
        details: {},
      }
    default:
      return state
  }
}
