import {
  CREATE_SOURCE_MANAGEMENT_FAILED,
  CREATE_SOURCE_MANAGEMENT_START,
  CREATE_SOURCE_MANAGEMENT_SUCCESS,
  DELETE_SOURCE_MANAGEMENT_FAILED,
  DELETE_SOURCE_MANAGEMENT_START,
  DELETE_SOURCE_MANAGEMENT_SUCCESS,
  GET_SOURCE_MANAGEMENT_FAILED,
  GET_SOURCE_MANAGEMENT_START,
  GET_SOURCE_MANAGEMENT_SUCCESS,
  SEARCH_SOURCE_MANAGEMENT_FAILED,
  SEARCH_SOURCE_MANAGEMENT_START,
  SEARCH_SOURCE_MANAGEMENT_SUCCESS,
  UPDATE_SOURCE_MANAGEMENT_FAILED,
  UPDATE_SOURCE_MANAGEMENT_START,
  UPDATE_SOURCE_MANAGEMENT_SUCCESS,
  CONFIRM_SOURCE_MANAGEMENT_FAILED,
  CONFIRM_SOURCE_MANAGEMENT_START,
  CONFIRM_SOURCE_MANAGEMENT_SUCCESS,
  REJECT_SOURCE_MANAGEMENT_FAILED,
  REJECT_SOURCE_MANAGEMENT_START,
  REJECT_SOURCE_MANAGEMENT_SUCCESS,
  RESET_SOURCE_MANAGEMENT_STATE,
} from '~/modules/wmsx/redux/actions/source-management'

const initialState = {
  isLoading: false,
  sourceManagementList: [],
  detailSourceManagement: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function sourceManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SOURCE_MANAGEMENT_START:
    case CREATE_SOURCE_MANAGEMENT_START:
    case UPDATE_SOURCE_MANAGEMENT_START:
    case DELETE_SOURCE_MANAGEMENT_START:
    case GET_SOURCE_MANAGEMENT_START:
    case CONFIRM_SOURCE_MANAGEMENT_START:
    case REJECT_SOURCE_MANAGEMENT_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_SOURCE_MANAGEMENT_SUCCESS:
      return {
        ...state,
        sourceManagementList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }

    case SEARCH_SOURCE_MANAGEMENT_FAILED:
    case CREATE_SOURCE_MANAGEMENT_SUCCESS:
    case CREATE_SOURCE_MANAGEMENT_FAILED:
    case UPDATE_SOURCE_MANAGEMENT_SUCCESS:
    case UPDATE_SOURCE_MANAGEMENT_FAILED:
    case DELETE_SOURCE_MANAGEMENT_SUCCESS:
    case DELETE_SOURCE_MANAGEMENT_FAILED:
    case GET_SOURCE_MANAGEMENT_FAILED:
    case CONFIRM_SOURCE_MANAGEMENT_FAILED:
    case CONFIRM_SOURCE_MANAGEMENT_SUCCESS:
    case REJECT_SOURCE_MANAGEMENT_FAILED:
    case REJECT_SOURCE_MANAGEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_SOURCE_MANAGEMENT_SUCCESS:
      return {
        ...state,
        detailSourceManagement: action.payload,
        isLoading: false,
      }
    case RESET_SOURCE_MANAGEMENT_STATE:
      return {
        ...state,
        detailSourceManagement: {},
      }
    default:
      return state
  }
}
