import {
  CONFIRM_SUPPLIES_REQUEST_FAIL,
  CONFIRM_SUPPLIES_REQUEST_START,
  CONFIRM_SUPPLIES_REQUEST_SUCCESS,
  GET_SUPPLIES_REQUEST_DETAIL_FAIL,
  GET_SUPPLIES_REQUEST_DETAIL_START,
  GET_SUPPLIES_REQUEST_DETAIL_SUCCESS,
  GET_SUPPLIES_REQUEST_LIST_FAIL,
  GET_SUPPLIES_REQUEST_LIST_START,
  GET_SUPPLIES_REQUEST_LIST_SUCCESS,
  REJECT_SUPPLIES_REQUEST_FAIL,
  REJECT_SUPPLIES_REQUEST_START,
  REJECT_SUPPLIES_REQUEST_SUCCESS,
  CREATE_SUPPLIES_REQUEST,
  CREATE_SUPPLIES_REQUEST_SUCCESS,
  CREATE_SUPPLIES_REQUEST_FAIL,
  GET_JOB_LIST_SUPPLY,
  GET_JOB_LIST_SUPPLY_FAIL,
  GET_JOB_LIST_SUPPLY_SUCCESS,
  UPDATE_SUPPLIES_REQUEST,
  UPDATE_SUPPLIES_REQUEST_FAIL,
  UPDATE_SUPPLIES_REQUEST_SUCCESS,
  DELETE_SUPPLIES_REQUEST_START,
  DELETE_SUPPLIES_REQUEST_FAIL,
  DELETE_SUPPLIES_REQUEST_SUCCESS,
  RESET_STATE_SUPPLIES_REQUEST,
} from '../actions/supplies-request'

const initialState = {
  suppliesRequestList: [],
  suppliesRequestDetail: {},
  isLoading: false,
  jobList: [],
  total: null,
}

export default function suppliesRequest(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIES_REQUEST_LIST_START:
    case CONFIRM_SUPPLIES_REQUEST_START:
    case REJECT_SUPPLIES_REQUEST_START:
    case GET_SUPPLIES_REQUEST_DETAIL_START:
    case CREATE_SUPPLIES_REQUEST:
    case GET_JOB_LIST_SUPPLY:
    case UPDATE_SUPPLIES_REQUEST:
    case DELETE_SUPPLIES_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_JOB_LIST_SUPPLY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobList: action.payload,
      }
    case GET_SUPPLIES_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suppliesRequestList: action.payload.items,
        total: action?.payload?.meta?.total,
      }
    case GET_SUPPLIES_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suppliesRequestDetail: action.payload,
      }
    case GET_SUPPLIES_REQUEST_LIST_FAIL:
    case GET_SUPPLIES_REQUEST_DETAIL_FAIL:
    case CONFIRM_SUPPLIES_REQUEST_SUCCESS:
    case CONFIRM_SUPPLIES_REQUEST_FAIL:
    case REJECT_SUPPLIES_REQUEST_SUCCESS:
    case REJECT_SUPPLIES_REQUEST_FAIL:
    case CREATE_SUPPLIES_REQUEST_SUCCESS:
    case CREATE_SUPPLIES_REQUEST_FAIL:
    case GET_JOB_LIST_SUPPLY_FAIL:
    case UPDATE_SUPPLIES_REQUEST_FAIL:
    case UPDATE_SUPPLIES_REQUEST_SUCCESS:
    case DELETE_SUPPLIES_REQUEST_SUCCESS:
    case DELETE_SUPPLIES_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_SUPPLIES_REQUEST:
      return {
        ...state,
        suppliesRequestDetail: {},
      }
    default:
      return state
  }
}
