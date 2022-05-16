import {
  WMSX_CREATE_CUSTOMER_FAILED,
  WMSX_CREATE_CUSTOMER_START,
  WMSX_CREATE_CUSTOMER_SUCCESS,
  WMSX_DELETE_CUSTOMER_FAILED,
  WMSX_DELETE_CUSTOMER_START,
  WMSX_DELETE_CUSTOMER_SUCCESS,
  WMSX_GET_CUSTOMER_DETAILS_FAILED,
  WMSX_GET_CUSTOMER_DETAILS_START,
  WMSX_GET_CUSTOMER_DETAILS_SUCCESS,
  WMSX_SEARCH_CUSTOMERS_FAILED,
  WMSX_SEARCH_CUSTOMERS_START,
  WMSX_SEARCH_CUSTOMERS_SUCCESS,
  WMSX_UPDATE_CUSTOMER_FAILED,
  WMSX_UPDATE_CUSTOMER_START,
  WMSX_UPDATE_CUSTOMER_SUCCESS,
  WMSX_IMPORT_CUSTOMER_START,
  WMSX_IMPORT_CUSTOMER_SUCCESS,
  WMSX_IMPORT_CUSTOMER_FAILED,
  WMSX_RESET_CUSTOMER_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-customer'

const initialState = {
  isLoading: false,
  customersList: [],
  customerDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineCustomer(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_CUSTOMERS_START:
    case WMSX_CREATE_CUSTOMER_START:
    case WMSX_UPDATE_CUSTOMER_START:
    case WMSX_DELETE_CUSTOMER_START:
    case WMSX_IMPORT_CUSTOMER_START:
    case WMSX_GET_CUSTOMER_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }

    case WMSX_SEARCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customersList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_CUSTOMERS_FAILED:
      return {
        ...state,
        customersList: [],
        isLoading: false,
        total: 0,
      }

    case WMSX_CREATE_CUSTOMER_SUCCESS:
    case WMSX_CREATE_CUSTOMER_FAILED:
    case WMSX_UPDATE_CUSTOMER_SUCCESS:
    case WMSX_UPDATE_CUSTOMER_FAILED:
    case WMSX_DELETE_CUSTOMER_SUCCESS:
    case WMSX_DELETE_CUSTOMER_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    case WMSX_GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        customerDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_CUSTOMER_DETAILS_FAILED:
      return {
        ...state,
        customerDetails: {},
        isLoading: false,
      }
    case WMSX_IMPORT_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_CUSTOMER_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case WMSX_RESET_CUSTOMER_DETAILS_STATE:
      return {
        ...state,
        customerDetails: {},
      }
    default:
      return state
  }
}
