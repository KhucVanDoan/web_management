import {
  WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_FAILED,
  WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_START,
  WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_SUCCESS,
  WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_FAILED,
  WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_START,
  WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_SUCCESS,
  WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_FAILED,
  WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_START,
  WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_SUCCESS,
  WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_FAILED,
  WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_START,
  WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_SUCCESS,
  WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_FAILED,
  WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_START,
  WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_SUCCESS,
  WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_FAILED,
  WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_START,
  WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_SUCCESS,
  WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_FAILED,
  WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_START,
  WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_SUCCESS,
  WMSX_GET_LOT_NUMBER_LIST_START,
  WMSX_GET_LOT_NUMBER_LIST_SUCCESS,
  WMSX_GET_LOT_NUMBER_LIST_FAILED,
  WMSX_RESET_IMPORT_MANUFACTURING_ORDER_STATE,
} from '~/modules/wmsx/redux/actions/import-manufacturing-order'

const initialState = {
  isLoading: false,
  importManufacturingOrderList: [],
  importManufacturingOrderDetails: {},
  total: null,
  lotNumberList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function importManufacturingOrder(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_START:
    case WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_START:
    case WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_START:
    case WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_START:
    case WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_START:
    case WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_START:
    case WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_START:
    case WMSX_GET_LOT_NUMBER_LIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_SUCCESS:
      return {
        ...state,
        importManufacturingOrderList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_FAILED:
      return {
        ...state,
        importManufacturingOrderList: [],
        isLoading: false,
        total: 0,
      }
    case WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_FAILED:
    case WMSX_CONFIRM_IMPORT_MANUFACTURING_ORDER_SUCCESS:
    case WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_FAILED:
    case WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_SUCCESS:
    case WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_SUCCESS:
    case WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_FAILED:
    case WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_SUCCESS:
    case WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_FAILED:
    case WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_SUCCESS:
    case WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        importManufacturingOrderDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_FAILED:
      return {
        ...state,
        importManufacturingOrderDetails: {},
        isLoading: false,
      }
    case WMSX_GET_LOT_NUMBER_LIST_SUCCESS:
      return {
        ...state,
        lotNumberList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_LOT_NUMBER_LIST_FAILED:
      return {
        ...state,
        lotNumberList: [],
        isLoading: false,
      }
    case WMSX_RESET_IMPORT_MANUFACTURING_ORDER_STATE:
      return {
        ...state,
        importManufacturingOrderDetails: {},
      }
    default:
      return state
  }
}
