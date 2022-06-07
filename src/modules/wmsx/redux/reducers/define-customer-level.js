import {
  CREATE_CUSTOMER_LEVEL_FAILED,
  CREATE_CUSTOMER_LEVEL_START,
  CREATE_CUSTOMER_LEVEL_SUCCESS,
  DELETE_CUSTOMER_LEVEL_FAILED,
  DELETE_CUSTOMER_LEVEL_START,
  DELETE_CUSTOMER_LEVEL_SUCCESS,
  GET_CUSTOMER_LEVEL_DETAILS_FAILED,
  GET_CUSTOMER_LEVEL_DETAILS_START,
  GET_CUSTOMER_LEVEL_DETAILS_SUCCESS,
  SEARCH_CUSTOMER_LEVELS_FAILED,
  SEARCH_CUSTOMER_LEVELS_START,
  SEARCH_CUSTOMER_LEVELS_SUCCESS,
  UPDATE_CUSTOMER_LEVEL_FAILED,
  UPDATE_CUSTOMER_LEVEL_START,
  UPDATE_CUSTOMER_LEVEL_SUCCESS,
  IMPORT_CUSTOMER_LEVEL_START,
  IMPORT_CUSTOMER_LEVEL_SUCCESS,
  IMPORT_CUSTOMER_LEVEL_FAILED,
  RESET_CUSTOMER_LEVEL_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-customer-level'

const initialState = {
  isLoading: false,
  customerLevelsList: [],
  customerLevelDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineCustomerLevel(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CUSTOMER_LEVELS_START:
    case CREATE_CUSTOMER_LEVEL_START:
    case UPDATE_CUSTOMER_LEVEL_START:
    case DELETE_CUSTOMER_LEVEL_START:
    case IMPORT_CUSTOMER_LEVEL_START:
    case GET_CUSTOMER_LEVEL_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_CUSTOMER_LEVELS_SUCCESS:
      return {
        ...state,
        customerLevelsList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_CUSTOMER_LEVELS_FAILED:
      return {
        ...state,
        customerLevelsList: [],
        isLoading: false,
        total: 0,
      }

    case CREATE_CUSTOMER_LEVEL_SUCCESS:
    case CREATE_CUSTOMER_LEVEL_FAILED:
    case UPDATE_CUSTOMER_LEVEL_SUCCESS:
    case UPDATE_CUSTOMER_LEVEL_FAILED:
    case DELETE_CUSTOMER_LEVEL_SUCCESS:
    case DELETE_CUSTOMER_LEVEL_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    case GET_CUSTOMER_LEVEL_DETAILS_SUCCESS:
      return {
        ...state,
        customerLevelDetails: action.payload,
        isLoading: false,
      }
    case GET_CUSTOMER_LEVEL_DETAILS_FAILED:
      return {
        ...state,
        customerLevelDetails: {},
        isLoading: false,
      }
    case IMPORT_CUSTOMER_LEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case IMPORT_CUSTOMER_LEVEL_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case RESET_CUSTOMER_LEVEL_DETAILS_STATE:
      return {
        ...state,
        customerLevelDetails: {},
      }
    default:
      return state
  }
}
