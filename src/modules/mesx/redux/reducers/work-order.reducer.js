import {
  CONFIRM_WORK_ORDER_FAILED,
  CONFIRM_WORK_ORDER_START,
  CONFIRM_WORK_ORDER_SUCCESS,
  CREATE_WORK_ORDER_FAILED,
  CREATE_WORK_ORDER_START,
  CREATE_WORK_ORDER_SUCCESS,
  DELETE_WORK_ORDER_FAILED,
  DELETE_WORK_ORDER_START,
  DELETE_WORK_ORDER_SUCCESS,
  GET_WORK_ORDER_DETAILS_FAILED,
  GET_WORK_ORDER_DETAILS_START,
  GET_WORK_ORDER_DETAILS_SUCCESS,
  SEARCH_WORK_ORDERS_FAILED,
  SEARCH_WORK_ORDERS_START,
  SEARCH_WORK_ORDERS_SUCCESS,
  UPDATE_WORK_ORDER_FAILED,
  UPDATE_WORK_ORDER_START,
  UPDATE_WORK_ORDER_SUCCESS,
  GET_BOM_DETAILS_FAILED,
  GET_BOM_DETAILS_START,
  GET_BOM_DETAILS_SUCCESS,
  PRINT_QR_WORK_ORDER_FAILED,
  PRINT_QR_WORK_ORDER_START,
  PRINT_QR_WORK_ORDER_SUCCESS,
} from '~/modules/mesx/redux/actions/work-order.action'

const initialState = {
  isLoading: false,
  workOrderList: [],
  workOrderDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineWorkOrder(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WORK_ORDERS_START:
    case CREATE_WORK_ORDER_START:
    case UPDATE_WORK_ORDER_START:
    case DELETE_WORK_ORDER_START:
    case GET_WORK_ORDER_DETAILS_START:
    case CONFIRM_WORK_ORDER_START:
    case PRINT_QR_WORK_ORDER_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_BOM_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WORK_ORDERS_SUCCESS:
      return {
        ...state,
        workOrderList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_WORK_ORDERS_FAILED:
      return {
        ...state,
        workOrderList: [],
        isLoading: false,
        total: 0,
      }
    case CONFIRM_WORK_ORDER_FAILED:
    case CONFIRM_WORK_ORDER_SUCCESS:
    case CREATE_WORK_ORDER_SUCCESS:
    case CREATE_WORK_ORDER_FAILED:
    case UPDATE_WORK_ORDER_SUCCESS:
    case UPDATE_WORK_ORDER_FAILED:
    case PRINT_QR_WORK_ORDER_SUCCESS:
    case PRINT_QR_WORK_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case DELETE_WORK_ORDER_SUCCESS:
    case DELETE_WORK_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_WORK_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        workOrderDetails: action.payload,
        isLoading: false,
      }
    case GET_WORK_ORDER_DETAILS_FAILED:
      return {
        ...state,
        workOrderDetails: {},
        isLoading: false,
      }
    case GET_BOM_DETAILS_SUCCESS:
      return {
        ...state,
        bomDetails: action.payload,
        isLoading: false,
      }
    case GET_BOM_DETAILS_FAILED:
      return {
        ...state,
        bomDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
