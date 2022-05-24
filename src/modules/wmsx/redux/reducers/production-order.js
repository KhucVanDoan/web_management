import {
  WMSX_CONFIRM_PRODUCTION_ORDER_FAILED,
  WMSX_CONFIRM_PRODUCTION_ORDER_START,
  WMSX_CONFIRM_PRODUCTION_ORDER_SUCCESS,
  WMSX_CREATE_PRODUCTION_ORDER_FAILED,
  WMSX_CREATE_PRODUCTION_ORDER_START,
  WMSX_CREATE_PRODUCTION_ORDER_SUCCESS,
  WMSX_DELETE_PRODUCTION_ORDER_FAILED,
  WMSX_DELETE_PRODUCTION_ORDER_START,
  WMSX_DELETE_PRODUCTION_ORDER_SUCCESS,
  WMSX_GET_EXPORT_LOT_NUMBER_FAILED,
  WMSX_GET_EXPORT_LOT_NUMBER_START,
  WMSX_GET_EXPORT_LOT_NUMBER_SUCCESS,
  WMSX_GET_IMPORT_LOT_NUMBER_FAILED,
  WMSX_GET_IMPORT_LOT_NUMBER_START,
  WMSX_GET_IMPORT_LOT_NUMBER_SUCCESS,
  WMSX_GET_PRODUCTION_ORDER_DETAILS_FAILED,
  WMSX_GET_PRODUCTION_ORDER_DETAILS_START,
  WMSX_GET_PRODUCTION_ORDER_DETAILS_SUCCESS,
  WMSX_REJECT_PRODUCTION_ORDER_FAILED,
  WMSX_REJECT_PRODUCTION_ORDER_START,
  WMSX_REJECT_PRODUCTION_ORDER_SUCCESS,
  WMSX_RESET_PRODUCTION_ORDER_DETAIL,
  WMSX_SEARCH_PRODUCTION_ORDERS_FAILED,
  WMSX_SEARCH_PRODUCTION_ORDERS_START,
  WMSX_SEARCH_PRODUCTION_ORDERS_SUCCESS,
  WMSX_UPDATE_PRODUCTION_ORDER_FAILED,
  WMSX_UPDATE_PRODUCTION_ORDER_START,
  WMSX_UPDATE_PRODUCTION_ORDER_SUCCESS,
} from '../actions/production-order'

const initialState = {
  isLoading: false,
  productionOrderList: [],
  productionOrderDetails: {},
  total: null,
  lotNumberList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function productionOrder(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_PRODUCTION_ORDERS_START:
    case WMSX_CREATE_PRODUCTION_ORDER_START:
    case WMSX_UPDATE_PRODUCTION_ORDER_START:
    case WMSX_DELETE_PRODUCTION_ORDER_START:
    case WMSX_GET_PRODUCTION_ORDER_DETAILS_START:
    case WMSX_CONFIRM_PRODUCTION_ORDER_START:
    case WMSX_REJECT_PRODUCTION_ORDER_START:
    case WMSX_GET_IMPORT_LOT_NUMBER_START:
    case WMSX_GET_EXPORT_LOT_NUMBER_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_PRODUCTION_ORDERS_SUCCESS:
      return {
        ...state,
        productionOrderList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_PRODUCTION_ORDERS_FAILED:
      return {
        ...state,
        productionOrderList: [],
        isLoading: false,
        total: 0,
      }
    case WMSX_CONFIRM_PRODUCTION_ORDER_FAILED:
    case WMSX_CONFIRM_PRODUCTION_ORDER_SUCCESS:
    case WMSX_REJECT_PRODUCTION_ORDER_FAILED:
    case WMSX_REJECT_PRODUCTION_ORDER_SUCCESS:
    case WMSX_CREATE_PRODUCTION_ORDER_SUCCESS:
    case WMSX_CREATE_PRODUCTION_ORDER_FAILED:
    case WMSX_UPDATE_PRODUCTION_ORDER_SUCCESS:
    case WMSX_UPDATE_PRODUCTION_ORDER_FAILED:
    case WMSX_DELETE_PRODUCTION_ORDER_SUCCESS:
    case WMSX_DELETE_PRODUCTION_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_PRODUCTION_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        productionOrderDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_PRODUCTION_ORDER_DETAILS_FAILED:
      return {
        ...state,
        productionOrderDetails: {},
        isLoading: false,
      }
    case WMSX_GET_IMPORT_LOT_NUMBER_SUCCESS:
      return {
        ...state,
        lotNumberList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_IMPORT_LOT_NUMBER_FAILED:
      return {
        ...state,
        lotNumberList: [],
        isLoading: false,
      }
    case WMSX_GET_EXPORT_LOT_NUMBER_SUCCESS:
      return {
        ...state,
        lotNumberList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_EXPORT_LOT_NUMBER_FAILED:
      return {
        ...state,
        lotNumberList: [],
        isLoading: false,
      }
    case WMSX_RESET_PRODUCTION_ORDER_DETAIL:
      return {
        ...state,
        productionOrderDetails: {},
      }
    default:
      return state
  }
}
