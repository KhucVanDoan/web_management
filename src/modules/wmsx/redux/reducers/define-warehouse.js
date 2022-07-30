import {
  WMSX_CONFIRM_WAREHOUSE_FAILED,
  WMSX_CONFIRM_WAREHOUSE_START,
  WMSX_CONFIRM_WAREHOUSE_SUCCESS,
  WMSX_CREATE_WAREHOUSE_FAILED,
  WMSX_CREATE_WAREHOUSE_START,
  WMSX_CREATE_WAREHOUSE_SUCCESS,
  WMSX_DELETE_WAREHOUSE_FAILED,
  WMSX_DELETE_WAREHOUSE_START,
  WMSX_DELETE_WAREHOUSE_SUCCESS,
  WMSX_GET_WAREHOUSE_DETAILS_FAILED,
  WMSX_GET_WAREHOUSE_DETAILS_START,
  WMSX_GET_WAREHOUSE_DETAILS_SUCCESS,
  WMSX_IMPORT_WAREHOUSE_FAILED,
  WMSX_IMPORT_WAREHOUSE_START,
  WMSX_IMPORT_WAREHOUSE_SUCCESS,
  WMSX_PRINT_QR_WAREHOUSES_FAILED,
  WMSX_PRINT_QR_WAREHOUSES_START,
  WMSX_PRINT_QR_WAREHOUSES_SUCCESS,
  WMSX_SEARCH_WAREHOUSES_FAILED,
  WMSX_SEARCH_WAREHOUSES_START,
  WMSX_SEARCH_WAREHOUSES_SUCCESS,
  WMSX_UPDATE_WAREHOUSE_FAILED,
  WMSX_UPDATE_WAREHOUSE_START,
  WMSX_UPDATE_WAREHOUSE_SUCCESS,
  WMSX_RESET_WAREHOUSE_DETAIL_STATE,
  WMSX_RESET_WAREHOUSE_LIST_STATE,
  GET_WAREHOUSE_DETAILS_CANVAS_FAILED,
  GET_WAREHOUSE_DETAILS_CANVAS_START,
  GET_WAREHOUSE_DETAILS_CANVAS_SUCCESS,
  UPDATE_WAREHOUSE_CANVAS_FAILED,
  UPDATE_WAREHOUSE_CANVAS_START,
  UPDATE_WAREHOUSE_CANVAS_SUCCESS,
  RESET_STATE_WAREHOUSE_CANVAS,
} from '../actions/define-warehouse'

const initialState = {
  isLoading: false,
  warehouseList: [],
  warehouseDetails: {},
  total: null,
  importLog: {},
}

export default function defineWarehouse(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_WAREHOUSES_START:
    case WMSX_CREATE_WAREHOUSE_START:
    case WMSX_UPDATE_WAREHOUSE_START:
    case WMSX_DELETE_WAREHOUSE_START:
    case WMSX_CONFIRM_WAREHOUSE_START:
    case WMSX_GET_WAREHOUSE_DETAILS_START:
    case WMSX_IMPORT_WAREHOUSE_START:
    case WMSX_PRINT_QR_WAREHOUSES_START:
    case UPDATE_WAREHOUSE_CANVAS_START:
    case GET_WAREHOUSE_DETAILS_CANVAS_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_WAREHOUSES_SUCCESS:
      return {
        ...state,
        warehouseList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_SEARCH_WAREHOUSES_FAILED:
      return {
        ...state,
        warehouseList: [],
        isLoading: false,
        total: 0,
      }
    case WMSX_CREATE_WAREHOUSE_SUCCESS:
    case WMSX_CREATE_WAREHOUSE_FAILED:
    case WMSX_UPDATE_WAREHOUSE_SUCCESS:
    case WMSX_UPDATE_WAREHOUSE_FAILED:
    case WMSX_CONFIRM_WAREHOUSE_SUCCESS:
    case WMSX_CONFIRM_WAREHOUSE_FAILED:
    case WMSX_DELETE_WAREHOUSE_SUCCESS:
    case WMSX_DELETE_WAREHOUSE_FAILED:
    case WMSX_PRINT_QR_WAREHOUSES_SUCCESS:
    case WMSX_PRINT_QR_WAREHOUSES_FAILED:
    case UPDATE_WAREHOUSE_CANVAS_SUCCESS:
    case UPDATE_WAREHOUSE_CANVAS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_WAREHOUSE_DETAILS_SUCCESS:
      return {
        ...state,
        warehouseDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_WAREHOUSE_DETAILS_FAILED:
      return {
        ...state,
        warehouseDetails: {},
        isLoading: false,
      }
    case WMSX_IMPORT_WAREHOUSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_WAREHOUSE_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case WMSX_RESET_WAREHOUSE_DETAIL_STATE:
      return {
        ...state,
        warehouseDetails: {},
      }
    case WMSX_RESET_WAREHOUSE_LIST_STATE:
      return {
        ...state,
        warehouseList: [],
      }
    case GET_WAREHOUSE_DETAILS_CANVAS_SUCCESS:
      return {
        ...state,
        warehouseDetails: action.payload,
        isLoading: false,
      }
    case GET_WAREHOUSE_DETAILS_CANVAS_FAILED:
      return {
        ...state,
        warehouseDetails: {},
        isLoading: false,
      }
    case RESET_STATE_WAREHOUSE_CANVAS: {
      return {
        ...state,
        warehouseDetails: {},
        isLoading: false,
      }
    }
    default:
      return state
  }
}
