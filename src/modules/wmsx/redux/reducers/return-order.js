import {
  CONFIRM_RETURN_ORDER_FAILED,
  CONFIRM_RETURN_ORDER_START,
  CONFIRM_RETURN_ORDER_SUCCESS,
  CREATE_RETURN_ORDER_FAILED,
  CREATE_RETURN_ORDER_START,
  CREATE_RETURN_ORDER_SUCCESS,
  DELETE_RETURN_ORDER_FAILED,
  DELETE_RETURN_ORDER_START,
  DELETE_RETURN_ORDER_SUCCESS,
  GET_RETURN_ORDER_DETAILS_FAILED,
  GET_RETURN_ORDER_DETAILS_START,
  GET_RETURN_ORDER_DETAILS_SUCCESS,
  REJECT_RETURN_ORDER_FAILED,
  REJECT_RETURN_ORDER_START,
  REJECT_RETURN_ORDER_SUCCESS,
  SEARCH_RETURN_ORDERS_FAILED,
  SEARCH_RETURN_ORDERS_START,
  SEARCH_RETURN_ORDERS_SUCCESS,
  UPDATE_RETURN_ORDER_FAILED,
  UPDATE_RETURN_ORDER_START,
  UPDATE_RETURN_ORDER_SUCCESS,
  GET_ITEMS_BY_ORDER_RETURN_ORDER_FAILED,
  GET_ITEMS_BY_ORDER_RETURN_ORDER_START,
  GET_ITEMS_BY_ORDER_RETURN_ORDER_SUCCESS,
  RESET_RETURN_ORDER,
} from '~/modules/wmsx/redux/actions/return-order'

const initialState = {
  isLoading: false,
  returnOrderList: [],
  returnOrderDetails: {},
  total: null,
  itemByOrderList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function returnOrder(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RETURN_ORDERS_START:
    case CREATE_RETURN_ORDER_START:
    case UPDATE_RETURN_ORDER_START:
    case DELETE_RETURN_ORDER_START:
    case GET_RETURN_ORDER_DETAILS_START:
    case CONFIRM_RETURN_ORDER_START:
    case REJECT_RETURN_ORDER_START:
    case GET_ITEMS_BY_ORDER_RETURN_ORDER_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_RETURN_ORDERS_SUCCESS:
      return {
        ...state,
        returnOrderList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case CONFIRM_RETURN_ORDER_FAILED:
    case CONFIRM_RETURN_ORDER_SUCCESS:
    case REJECT_RETURN_ORDER_FAILED:
    case REJECT_RETURN_ORDER_SUCCESS:
    case SEARCH_RETURN_ORDERS_FAILED:
    case CREATE_RETURN_ORDER_SUCCESS:
    case CREATE_RETURN_ORDER_FAILED:
    case UPDATE_RETURN_ORDER_SUCCESS:
    case UPDATE_RETURN_ORDER_FAILED:
    case DELETE_RETURN_ORDER_SUCCESS:
    case DELETE_RETURN_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_RETURN_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        returnOrderDetails: action.payload,
        isLoading: false,
      }
    case GET_RETURN_ORDER_DETAILS_FAILED:
      return {
        ...state,
        returnOrderDetails: {},
        isLoading: false,
        total: false,
      }
    case GET_ITEMS_BY_ORDER_RETURN_ORDER_SUCCESS:
      return {
        ...state,
        itemByOrderList: action.payload,
        isLoading: false,
      }
    case GET_ITEMS_BY_ORDER_RETURN_ORDER_FAILED:
      return {
        ...state,
        itemByOrderList: [],
        isLoading: false,
      }
    case RESET_RETURN_ORDER:
      return {
        ...state,
        returnOrderDetails: {},
      }
    default:
      return state
  }
}
