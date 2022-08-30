import {
  CREATE_REASON_MANAGEMENT_FAILED,
  CREATE_REASON_MANAGEMENT_START,
  CREATE_REASON_MANAGEMENT_SUCCESS,
  DELETE_REASON_MANAGEMENT_FAILED,
  DELETE_REASON_MANAGEMENT_START,
  DELETE_REASON_MANAGEMENT_SUCCESS,
  GET_REASON_MANAGEMENT_FAILED,
  GET_REASON_MANAGEMENT_START,
  GET_REASON_MANAGEMENT_SUCCESS,
  SEARCH_REASON_MANAGEMENT_FAILED,
  SEARCH_REASON_MANAGEMENT_START,
  SEARCH_REASON_MANAGEMENT_SUCCESS,
  UPDATE_REASON_MANAGEMENT_FAILED,
  UPDATE_REASON_MANAGEMENT_START,
  UPDATE_REASON_MANAGEMENT_SUCCESS,
  WMSX_CONFIRM_REASON_MANAGEMENT_FAILED,
  WMSX_CONFIRM_REASON_MANAGEMENT_START,
  WMSX_CONFIRM_REASON_MANAGEMENT_SUCCESS,
  WMSX_REJECT_REASON_MANAGEMENT_FAILED,
  WMSX_REJECT_REASON_MANAGEMENT_START,
  WMSX_REJECT_REASON_MANAGEMENT_SUCCESS,
  RESET_REASON_MANAGEMENT_STATE,
} from '~/modules/wmsx/redux/actions/reason-management'

const initialState = {
  isLoading: false,
  reasonManagementList: [],
  detailReasonManagement: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function reasonManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REASON_MANAGEMENT_START:
    case CREATE_REASON_MANAGEMENT_START:
    case UPDATE_REASON_MANAGEMENT_START:
    case DELETE_REASON_MANAGEMENT_START:
    case GET_REASON_MANAGEMENT_START:
    case WMSX_CONFIRM_REASON_MANAGEMENT_START:
    case WMSX_REJECT_REASON_MANAGEMENT_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_REASON_MANAGEMENT_SUCCESS:
      return {
        ...state,
        reasonManagementList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }

    case SEARCH_REASON_MANAGEMENT_FAILED:
    case CREATE_REASON_MANAGEMENT_SUCCESS:
    case CREATE_REASON_MANAGEMENT_FAILED:
    case UPDATE_REASON_MANAGEMENT_SUCCESS:
    case UPDATE_REASON_MANAGEMENT_FAILED:
    case DELETE_REASON_MANAGEMENT_SUCCESS:
    case DELETE_REASON_MANAGEMENT_FAILED:
    case GET_REASON_MANAGEMENT_FAILED:
    case WMSX_CONFIRM_REASON_MANAGEMENT_FAILED:
    case WMSX_CONFIRM_REASON_MANAGEMENT_SUCCESS:
    case WMSX_REJECT_REASON_MANAGEMENT_FAILED:
    case WMSX_REJECT_REASON_MANAGEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_REASON_MANAGEMENT_SUCCESS:
      return {
        ...state,
        detailReasonManagement: action.payload,
        isLoading: false,
      }
    case RESET_REASON_MANAGEMENT_STATE:
      return {
        ...state,
        detailReasonManagement: {},
      }
    default:
      return state
  }
}
