import {
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMERS_START,
  GET_CUSTOMERS_SUCCESS,
  SEARCH_CUSTOMERS_FAILED,
  SEARCH_CUSTOMERS_START,
  SEARCH_CUSTOMERS_SUCCESS,
  CREATE_CUSTOMER_FAILED,
  CREATE_CUSTOMER_START,
  CREATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILED,
  DELETE_CUSTOMER_START,
  DELETE_CUSTOMER_SUCCESS,
  GET_CUSTOMER_DETAILS_FAILED,
  GET_CUSTOMER_DETAILS_START,
  GET_CUSTOMER_DETAILS_SUCCESS,
  UPDATE_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_START,
  UPDATE_CUSTOMER_SUCCESS,
  RESET_CUSTOMER_DETAILS_STATE,
} from '~/modules/mesx/redux/actions/define-customer'

const initialState = {
  isLoading: false,
  customerList: [],
  customerDetails: {},
  total: null,
}

export default function defineCustomer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CUSTOMERS_START:
    case GET_CUSTOMERS_START:
    case CREATE_CUSTOMER_START:
    case UPDATE_CUSTOMER_START:
    case DELETE_CUSTOMER_START:
    case GET_CUSTOMER_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customerList: action.payload.items,
        isLoading: false,
      }
    case GET_CUSTOMERS_FAILED:
      return {
        ...state,
        customerList: [],
        isLoading: false,
      }
    case SEARCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customerList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_CUSTOMERS_FAILED:
      return {
        ...state,
        customerList: [],
        isLoading: false,
        total: 0,
      }
    case CREATE_CUSTOMER_SUCCESS:
    case CREATE_CUSTOMER_FAILED:
    case UPDATE_CUSTOMER_SUCCESS:
    case UPDATE_CUSTOMER_FAILED:
    case DELETE_CUSTOMER_SUCCESS:
    case DELETE_CUSTOMER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        customerDetails: action.payload,
        isLoading: false,
      }
    case GET_CUSTOMER_DETAILS_FAILED:
      return {
        ...state,
        customerDetails: {},
        isLoading: false,
      }
    case RESET_CUSTOMER_DETAILS_STATE:
      return {
        ...state,
        customerDetails: {},
      }
    default:
      return state
  }
}
