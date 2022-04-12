import {
  SEARCH_WORK_CENTER_PLAN_FAILED,
  SEARCH_WORK_CENTER_PLAN_START,
  SEARCH_WORK_CENTER_PLAN_SUCCESS,
  GET_WORK_CENTER_PLAN_DETAILS_FAILED,
  GET_WORK_CENTER_PLAN_DETAILS_START,
  GET_WORK_CENTER_PLAN_DETAILS_SUCCESS,
  CREATE_WORK_CENTER_PLAN_FAILED,
  CREATE_WORK_CENTER_PLAN_START,
  CREATE_WORK_CENTER_PLAN_SUCCESS,
  UPDATE_WORK_CENTER_PLAN_FAILED,
  UPDATE_WORK_CENTER_PLAN_START,
  UPDATE_WORK_CENTER_PLAN_SUCCESS,
  DELETE_WORK_CENTER_PLAN_FAILED,
  DELETE_WORK_CENTER_PLAN_START,
  DELETE_WORK_CENTER_PLAN_SUCCESS,
  GENERATE_WORK_CENTER_PLAN_START,
  GENERATE_WORK_CENTER_PLAN_SUCCESS,
  GENERATE_WORK_CENTER_PLAN_FAILED,
  CONFIRM_WORK_CENTER_PLAN_START,
  CONFIRM_WORK_CENTER_PLAN_FAILED,
  CONFIRM_WORK_CENTER_PLAN_SUCCESS,
} from '~/modules/mesx/redux/actions/work-center-plan.action'

const initialState = {
  isLoading: false,
  wcpList: [],
  wcpDetails: {},
  total: null,
  wcpStructure: [],
}

export default function workCenterPlan(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WORK_CENTER_PLAN_START:
    case UPDATE_WORK_CENTER_PLAN_START:
    case CREATE_WORK_CENTER_PLAN_START:
    case GET_WORK_CENTER_PLAN_DETAILS_START:
    case DELETE_WORK_CENTER_PLAN_START:
    case CONFIRM_WORK_CENTER_PLAN_START:
    case GENERATE_WORK_CENTER_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WORK_CENTER_PLAN_SUCCESS:
      return {
        ...state,
        wcpList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_WORK_CENTER_PLAN_FAILED:
      return {
        ...state,
        wcpList: [],
        isLoading: false,
        total: 0,
      }
    case UPDATE_WORK_CENTER_PLAN_FAILED:
    case UPDATE_WORK_CENTER_PLAN_SUCCESS:
    case CREATE_WORK_CENTER_PLAN_FAILED:
    case CREATE_WORK_CENTER_PLAN_SUCCESS:
    case DELETE_WORK_CENTER_PLAN_FAILED:
    case DELETE_WORK_CENTER_PLAN_SUCCESS:
    case CONFIRM_WORK_CENTER_PLAN_FAILED:
    case CONFIRM_WORK_CENTER_PLAN_SUCCESS:
    case GET_WORK_CENTER_PLAN_DETAILS_FAILED:
      return {
        ...state,
        wcpDetails: {},
        isLoading: false,
      }
    case GENERATE_WORK_CENTER_PLAN_SUCCESS:
      return {
        ...state,
        wcpStructure: action.payload,
        isLoading: false,
      }
    case GET_WORK_CENTER_PLAN_DETAILS_SUCCESS:
      return {
        ...state,
        wcpDetails: action.payload,
        isLoading: false,
      }
    case GENERATE_WORK_CENTER_PLAN_FAILED:
      return {
        ...state,
        wcpStructure: [],
        isLoading: false,
      }
    default:
      return state
  }
}
