import {
  CONFIRM_SALE_ORDER_FAILED,
  CONFIRM_SALE_ORDER_START,
  CONFIRM_SALE_ORDER_SUCCESS,
  CREATE_SALE_ORDER_FAILED,
  CREATE_SALE_ORDER_START,
  CREATE_SALE_ORDER_SUCCESS,
  DELETE_SALE_ORDER_FAILED,
  DELETE_SALE_ORDER_START,
  DELETE_SALE_ORDER_SUCCESS,
  GET_SALE_ORDER_DETAILS_FAILED,
  GET_SALE_ORDER_DETAILS_START,
  GET_SALE_ORDER_DETAILS_SUCCESS,
  REJECT_SALE_ORDER_FAILED,
  REJECT_SALE_ORDER_START,
  REJECT_SALE_ORDER_SUCCESS,
  SEARCH_SALE_ORDERS_FAILED,
  SEARCH_SALE_ORDERS_START,
  SEARCH_SALE_ORDERS_SUCCESS,
  UPDATE_SALE_ORDER_FAILED,
  UPDATE_SALE_ORDER_START,
  UPDATE_SALE_ORDER_SUCCESS,
  RESET_SALE_ORDER_STATE,
  RESET_SALE_ORDER_LIST_STATE,
} from '~/modules/mesx/redux/actions/sale-order'

const initialState = {
  isLoading: false,
  saleOrderList: [],
  saleOrderDetails: {},
  total: 0,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineSaleOrder(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SALE_ORDERS_START:
    case CREATE_SALE_ORDER_START:
    case UPDATE_SALE_ORDER_START:
    case DELETE_SALE_ORDER_START:
    case GET_SALE_ORDER_DETAILS_START:
    case CONFIRM_SALE_ORDER_START:
    case REJECT_SALE_ORDER_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SALE_ORDERS_SUCCESS:
      return {
        ...state,
        saleOrderList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }
    case DELETE_SALE_ORDER_SUCCESS:
      return {
        ...state,
        saleOrderList: state.saleOrderList.filter(
          (item) => item?.id !== action.payload.id,
        ),
        isLoading: false,
      }
    case CONFIRM_SALE_ORDER_FAILED:
    case CONFIRM_SALE_ORDER_SUCCESS:
    case REJECT_SALE_ORDER_FAILED:
    case REJECT_SALE_ORDER_SUCCESS:
    case SEARCH_SALE_ORDERS_FAILED:
    case CREATE_SALE_ORDER_SUCCESS:
    case CREATE_SALE_ORDER_FAILED:
    case UPDATE_SALE_ORDER_SUCCESS:
    case UPDATE_SALE_ORDER_FAILED:
    case DELETE_SALE_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_SALE_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        saleOrderDetails: action.payload,
        isLoading: false,
      }
    case GET_SALE_ORDER_DETAILS_FAILED:
      return {
        ...state,
        saleOrderDetails: {},
        isLoading: false,
      }
    case RESET_SALE_ORDER_STATE:
      return {
        ...state,
        saleOrderDetails: {},
      }
    case RESET_SALE_ORDER_LIST_STATE:
      return {
        ...state,
        saleOrderList: [],
      }
    default:
      return state
  }
}
