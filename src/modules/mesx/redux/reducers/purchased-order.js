import {
  CONFIRM_PURCHASED_ORDER_FAILED,
  CONFIRM_PURCHASED_ORDER_START,
  CONFIRM_PURCHASED_ORDER_SUCCESS,
  CREATE_PURCHASED_ORDER_FAILED,
  CREATE_PURCHASED_ORDER_START,
  CREATE_PURCHASED_ORDER_SUCCESS,
  DELETE_PURCHASED_ORDER_FAILED,
  DELETE_PURCHASED_ORDER_START,
  DELETE_PURCHASED_ORDER_SUCCESS,
  GET_PURCHASED_ORDER_DETAILS_FAILED,
  GET_PURCHASED_ORDER_DETAILS_START,
  GET_PURCHASED_ORDER_DETAILS_SUCCESS,
  REJECT_PURCHASED_ORDER_FAILED,
  REJECT_PURCHASED_ORDER_START,
  REJECT_PURCHASED_ORDER_SUCCESS,
  SEARCH_PURCHASED_ORDERS_FAILED,
  SEARCH_PURCHASED_ORDERS_START,
  SEARCH_PURCHASED_ORDERS_SUCCESS,
  UPDATE_PURCHASED_ORDER_FAILED,
  UPDATE_PURCHASED_ORDER_START,
  UPDATE_PURCHASED_ORDER_SUCCESS,
  IMPORT_PURCHASED_ORDER_START,
  IMPORT_PURCHASED_ORDER_SUCCESS,
  IMPORT_PURCHASED_ORDER_FAILED,
  GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START,
  GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS,
  GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED,
  RESET_PURCHASED_ORDER_DETAILS_STATE,
} from '~/modules/mesx/redux/actions/purchased-order'

const initialState = {
  isLoading: false,
  purchasedOrderList: [],
  purchasedOrderDetails: {},
  purchasedOrderNotCreatePOImpList: [],
  total: 0,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function purchasedOrder(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PURCHASED_ORDERS_START:
    case CREATE_PURCHASED_ORDER_START:
    case UPDATE_PURCHASED_ORDER_START:
    case DELETE_PURCHASED_ORDER_START:
    case GET_PURCHASED_ORDER_DETAILS_START:
    case CONFIRM_PURCHASED_ORDER_START:
    case IMPORT_PURCHASED_ORDER_START:
    case REJECT_PURCHASED_ORDER_START:
    case GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PURCHASED_ORDERS_SUCCESS:
      return {
        ...state,
        purchasedOrderList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }
    case CONFIRM_PURCHASED_ORDER_FAILED:
    case CONFIRM_PURCHASED_ORDER_SUCCESS:
    case REJECT_PURCHASED_ORDER_FAILED:
    case REJECT_PURCHASED_ORDER_SUCCESS:
    case SEARCH_PURCHASED_ORDERS_FAILED:
    case CREATE_PURCHASED_ORDER_SUCCESS:
    case CREATE_PURCHASED_ORDER_FAILED:
    case UPDATE_PURCHASED_ORDER_SUCCESS:
    case UPDATE_PURCHASED_ORDER_FAILED:
    case DELETE_PURCHASED_ORDER_SUCCESS:
    case DELETE_PURCHASED_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_PURCHASED_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        purchasedOrderDetails: action.payload,
        isLoading: false,
      }
    case GET_PURCHASED_ORDER_DETAILS_FAILED:
      return {
        ...state,
        purchasedOrderDetails: {},
        isLoading: false,
      }
    case IMPORT_PURCHASED_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case IMPORT_PURCHASED_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        purchasedOrderNotCreatePOImpList: action.payload,
      }
    case GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED:
      return {
        ...state,
        isLoading: false,
        purchasedOrderNotCreatePOImpList: [],
      }
    case RESET_PURCHASED_ORDER_DETAILS_STATE:
      return {
        ...state,
        purchasedOrderDetails: {},
      }
    default:
      return state
  }
}
