import {
  SEARCH_WORK_CENTER_FAILED,
  SEARCH_WORK_CENTER_START,
  SEARCH_WORK_CENTER_SUCCESS,
  CREATE_WORK_CENTER_FAILED,
  CREATE_WORK_CENTER_START,
  CREATE_WORK_CENTER_SUCCESS,
  DELETE_WORK_CENTER_FAILED,
  DELETE_WORK_CENTER_START,
  DELETE_WORK_CENTER_SUCCESS,
  GET_WORK_CENTER_DETAILS_FAILED,
  GET_WORK_CENTER_DETAILS_START,
  GET_WORK_CENTER_DETAILS_SUCCESS,
  UPDATE_WORK_CENTER_FAILED,
  UPDATE_WORK_CENTER_START,
  UPDATE_WORK_CENTER_SUCCESS,
  CONFIRM_WORK_CENTER_START,
  CONFIRM_WORK_CENTER_SUCCESS,
  CONFIRM_WORK_CENTER_FAILED,
  RESET_WORK_CENTER_DETAIL_STATE,
} from '~/modules/mesx/redux/actions/work-center'

const initialState = {
  isLoading: false,
  wcList: [],
  wcDetails: {},
  total: null,
}

export default function workCenter(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WORK_CENTER_START:
    case CREATE_WORK_CENTER_START:
    case DELETE_WORK_CENTER_START:
    case GET_WORK_CENTER_DETAILS_START:
    case UPDATE_WORK_CENTER_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WORK_CENTER_SUCCESS:
      return {
        ...state,
        wcList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_WORK_CENTER_FAILED:
      return {
        ...state,
        wcList: [],
        isLoading: false,
        total: 0,
      }
    case CREATE_WORK_CENTER_FAILED:
    case CREATE_WORK_CENTER_SUCCESS:
    case CONFIRM_WORK_CENTER_START:
    case CONFIRM_WORK_CENTER_SUCCESS:
    case CONFIRM_WORK_CENTER_FAILED:
    case DELETE_WORK_CENTER_FAILED:
    case DELETE_WORK_CENTER_SUCCESS:
    case UPDATE_WORK_CENTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE_WORK_CENTER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_WORK_CENTER_DETAILS_SUCCESS:
      return {
        ...state,
        wcDetails: action.payload,
        isLoading: false,
      }
    case GET_WORK_CENTER_DETAILS_FAILED:
      return {
        ...state,
        wcDetails: {},
        isLoading: false,
      }
    case RESET_WORK_CENTER_DETAIL_STATE:
      return {
        ...state,
        wcDetails: {},
      }
    default:
      return state
  }
}
