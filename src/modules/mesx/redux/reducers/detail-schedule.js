import {
  SEARCH_DETAIL_SCHEDULE_FAILED,
  SEARCH_DETAIL_SCHEDULE_START,
  SEARCH_DETAIL_SCHEDULE_SUCCESS,
  APPROVE_DETAIL_SCHEDULE_FAILED,
  APPROVE_DETAIL_SCHEDULE_START,
  APPROVE_DETAIL_SCHEDULE_SUCCESS,
  CREATE_DETAIL_SCHEDULE_FAILED,
  CREATE_DETAIL_SCHEDULE_START,
  CREATE_DETAIL_SCHEDULE_SUCCESS,
  DELETE_DETAIL_SCHEDULE_FAILED,
  DELETE_DETAIL_SCHEDULE_START,
  DELETE_DETAIL_SCHEDULE_SUCCESS,
  GET_DETAIL_SCHEDULE_DETAILS_FAILED,
  GET_DETAIL_SCHEDULE_DETAILS_START,
  GET_DETAIL_SCHEDULE_DETAILS_SUCCESS,
  UPDATE_DETAIL_SCHEDULE_FAILED,
  UPDATE_DETAIL_SCHEDULE_START,
  UPDATE_DETAIL_SCHEDULE_SUCCESS,
  GENERATE_DETAIL_SCHEDULE_FAILED,
  GENERATE_DETAIL_SCHEDULE_START,
  GENERATE_DETAIL_SCHEDULE_SUCCESS,
  REJECT_DETAIL_SCHEDULE_FAILED,
  REJECT_DETAIL_SCHEDULE_START,
  REJECT_DETAIL_SCHEDULE_SUCCESS,
} from '~/modules/mesx/redux/actions/detail-schedule'

const initialState = {
  isLoading: false,
  detailScheduleList: [],
  detailScheduleDetails: {},
  total: null,
}

export default function detailSchedule(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DETAIL_SCHEDULE_START:
    case CREATE_DETAIL_SCHEDULE_START:
    case UPDATE_DETAIL_SCHEDULE_START:
    case DELETE_DETAIL_SCHEDULE_START:
    case GET_DETAIL_SCHEDULE_DETAILS_START:
    case APPROVE_DETAIL_SCHEDULE_START:
    case GENERATE_DETAIL_SCHEDULE_START:
    case REJECT_DETAIL_SCHEDULE_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DETAIL_SCHEDULE_SUCCESS:
      return {
        ...state,
        detailScheduleList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_DETAIL_SCHEDULE_FAILED:
      return {
        ...state,
        detailScheduleList: [],
        isLoading: false,
        total: 0,
      }
    case APPROVE_DETAIL_SCHEDULE_FAILED:
    case APPROVE_DETAIL_SCHEDULE_SUCCESS:
    case CREATE_DETAIL_SCHEDULE_FAILED:
    case GENERATE_DETAIL_SCHEDULE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_DETAIL_SCHEDULE_SUCCESS:
    case UPDATE_DETAIL_SCHEDULE_SUCCESS:
    case UPDATE_DETAIL_SCHEDULE_FAILED:
    case DELETE_DETAIL_SCHEDULE_SUCCESS:
    case DELETE_DETAIL_SCHEDULE_FAILED:
    case GENERATE_DETAIL_SCHEDULE_SUCCESS:
    case REJECT_DETAIL_SCHEDULE_SUCCESS:
    case REJECT_DETAIL_SCHEDULE_FAILED:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DETAIL_SCHEDULE_DETAILS_SUCCESS:
      return {
        ...state,
        detailScheduleDetails: action.payload,
        isLoading: false,
      }
    case GET_DETAIL_SCHEDULE_DETAILS_FAILED:
      return {
        ...state,
        detailScheduleDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
