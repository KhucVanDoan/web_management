import {
  CREATE_BUSINESS_TYPE_FAILED,
  CREATE_BUSINESS_TYPE_START,
  CREATE_BUSINESS_TYPE_SUCCESS,
  DELETE_BUSINESS_TYPE_FAILED,
  DELETE_BUSINESS_TYPE_START,
  DELETE_BUSINESS_TYPE_SUCCESS,
  GET_BUSINESS_TYPE_DETAILS_FAILED,
  GET_BUSINESS_TYPE_DETAILS_START,
  GET_BUSINESS_TYPE_DETAILS_SUCCESS,
  SEARCH_BUSINESS_TYPES_FAILED,
  SEARCH_BUSINESS_TYPES_START,
  SEARCH_BUSINESS_TYPES_SUCCESS,
  UPDATE_BUSINESS_TYPE_FAILED,
  UPDATE_BUSINESS_TYPE_START,
  UPDATE_BUSINESS_TYPE_SUCCESS,
  CONFIRM_BUSINESS_TYPE_FAILED,
  CONFIRM_BUSINESS_TYPE_START,
  CONFIRM_BUSINESS_TYPE_SUCCESS,
  REJECT_BUSINESS_TYPE_FAILED,
  REJECT_BUSINESS_TYPE_START,
  REJECT_BUSINESS_TYPE_SUCCESS,
  RESET_BUSINESS_TYPE_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/business-type-management'

const initialState = {
  isLoading: false,
  businessTypeList: [],
  businessTypeDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function businessTypeManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BUSINESS_TYPES_START:
    case CREATE_BUSINESS_TYPE_START:
    case UPDATE_BUSINESS_TYPE_START:
    case DELETE_BUSINESS_TYPE_START:
    case CONFIRM_BUSINESS_TYPE_START:
    case REJECT_BUSINESS_TYPE_START:
    case GET_BUSINESS_TYPE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_BUSINESS_TYPES_SUCCESS:
      return {
        ...state,
        businessTypeList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_BUSINESS_TYPES_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_BUSINESS_TYPE_FAILED:
    case CONFIRM_BUSINESS_TYPE_SUCCESS:
    case REJECT_BUSINESS_TYPE_FAILED:
    case REJECT_BUSINESS_TYPE_SUCCESS:
    case CREATE_BUSINESS_TYPE_SUCCESS:
    case CREATE_BUSINESS_TYPE_FAILED:
    case UPDATE_BUSINESS_TYPE_SUCCESS:
    case UPDATE_BUSINESS_TYPE_FAILED:
    case DELETE_BUSINESS_TYPE_SUCCESS:
    case DELETE_BUSINESS_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_BUSINESS_TYPE_DETAILS_SUCCESS:
      return {
        ...state,
        businessTypeDetails: action.payload,
        isLoading: false,
      }
    case GET_BUSINESS_TYPE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_BUSINESS_TYPE_DETAILS_STATE:
      return {
        ...state,
        businessTypeDetails: {},
      }
    default:
      return state
  }
}
