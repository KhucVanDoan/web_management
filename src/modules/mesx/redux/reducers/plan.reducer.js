import {
  CREATE_PLAN_FAILED,
  CREATE_PLAN_START,
  CREATE_PLAN_SUCCESS,
  DELETE_PLAN_FAILED,
  DELETE_PLAN_START,
  DELETE_PLAN_SUCCESS,
  GET_PLAN_DETAILS_FAILED,
  GET_PLAN_DETAILS_START,
  GET_PLAN_DETAILS_SUCCESS,
  SEARCH_PLANS_FAILED,
  SEARCH_PLANS_START,
  SEARCH_PLANS_SUCCESS,
  UPDATE_PLAN_FAILED,
  UPDATE_PLAN_START,
  UPDATE_PLAN_SUCCESS,
  GET_MO_BY_PLAN_START,
  GET_MO_BY_PLAN_FAILED,
  GET_MO_BY_PLAN_SUCCESS,
  CONFIRM_PLAN_START,
  CONFIRM_PLAN_SUCCESS,
  CONFIRM_PLAN_FAILED,
  RESET_PLAN_LIST_STATE,
} from '~/modules/mesx/redux/actions/plan'

const initialState = {
  isLoading: false,
  planList: [],
  planDetails: {},
  moList: [],
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineplan(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PLANS_START:
    case CREATE_PLAN_START:
    case UPDATE_PLAN_START:
    case DELETE_PLAN_START:
    case CONFIRM_PLAN_START:
    case GET_PLAN_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MO_BY_PLAN_START:
      return {
        ...state,
        isLoading: false,
      }
    case SEARCH_PLANS_SUCCESS:
      return {
        ...state,
        planList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_PLANS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_MO_BY_PLAN_SUCCESS:
      return {
        ...state,
        moList: action.payload.list,
        isLoading: false,
      }
    case CONFIRM_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_PLAN_SUCCESS:
    case CREATE_PLAN_FAILED:
    case UPDATE_PLAN_SUCCESS:
    case UPDATE_PLAN_FAILED:
    case DELETE_PLAN_SUCCESS:
    case DELETE_PLAN_FAILED:
    case CONFIRM_PLAN_FAILED:
    case GET_PLAN_DETAILS_SUCCESS:
      return {
        ...state,
        planDetails: action.payload,
        isLoading: false,
      }
    case GET_PLAN_DETAILS_FAILED:
      return {
        ...state,
        planDetails: {},
        isLoading: false,
      }
    case GET_MO_BY_PLAN_FAILED:
      return {
        ...state,
        moList: [],
        isLoading: false,
      }

    case RESET_PLAN_LIST_STATE:
      return {
        ...state,
        planList: [],
      }
    default:
      return state
  }
}
