import {
  CONFIRM_WAREHOUSE_TRANSFER_FAILED,
  CONFIRM_WAREHOUSE_TRANSFER_START,
  CONFIRM_WAREHOUSE_TRANSFER_SUCCESS,
  CREATE_WAREHOUSE_TRANSFER_FAILED,
  CREATE_WAREHOUSE_TRANSFER_START,
  CREATE_WAREHOUSE_TRANSFER_SUCCESS,
  DELETE_WAREHOUSE_TRANSFER_FAILED,
  DELETE_WAREHOUSE_TRANSFER_START,
  DELETE_WAREHOUSE_TRANSFER_SUCCESS,
  GET_WAREHOUSE_TRANSFER_DETAILS_FAILED,
  GET_WAREHOUSE_TRANSFER_DETAILS_START,
  GET_WAREHOUSE_TRANSFER_DETAILS_SUCCESS,
  REJECT_WAREHOUSE_TRANSFER_FAILED,
  REJECT_WAREHOUSE_TRANSFER_START,
  REJECT_WAREHOUSE_TRANSFER_SUCCESS,
  SEARCH_WAREHOUSE_TRANSFERS_FAILED,
  SEARCH_WAREHOUSE_TRANSFERS_START,
  SEARCH_WAREHOUSE_TRANSFERS_SUCCESS,
  UPDATE_WAREHOUSE_TRANSFER_FAILED,
  UPDATE_WAREHOUSE_TRANSFER_START,
  UPDATE_WAREHOUSE_TRANSFER_SUCCESS,
  GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_FAILED,
  GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_START,
  GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_SUCCESS,
  GET_LIST_ITEM_WAREHOUSE_STOCK_FAILED,
  GET_LIST_ITEM_WAREHOUSE_STOCK_START,
  GET_LIST_ITEM_WAREHOUSE_STOCK_SUCCESS,
  GET_STOCK_BY_ITEM_AND_LOT_NUMBER_FAILED,
  GET_STOCK_BY_ITEM_AND_LOT_NUMBER_START,
  GET_STOCK_BY_ITEM_AND_LOT_NUMBER_SUCCESS,
  RESET_WAREHOUSE_TRANSFER,
  CONFIRM_WAREHOUSE_EXPORT_START,
  CONFIRM_WAREHOUSE_EXPORT_SUCCESS,
  CONFIRM_WAREHOUSE_EXPORT_FAILED,
  ITEM_WAREHOUSE_STOCK_AVAILABLE_START,
  ITEM_WAREHOUSE_STOCK_AVAILABLE_SUCCESS,
  ITEM_WAREHOUSE_STOCK_AVAILABLE_FAILED,
} from '../actions/warehouse-transfer'

const initialState = {
  isLoading: false,
  warehouseTransferList: [],
  warehouseTransferDetails: {},
  total: null,
  lotNumberList: [],
  itemWarehouseStockList: [],
  itemStocks: [],
  itemStockAvailabe: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function warehouseTransfer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WAREHOUSE_TRANSFERS_START:
    case CREATE_WAREHOUSE_TRANSFER_START:
    case UPDATE_WAREHOUSE_TRANSFER_START:
    case DELETE_WAREHOUSE_TRANSFER_START:
    case GET_WAREHOUSE_TRANSFER_DETAILS_START:
    case CONFIRM_WAREHOUSE_TRANSFER_START:
    case REJECT_WAREHOUSE_TRANSFER_START:
    case GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_START:
    case GET_LIST_ITEM_WAREHOUSE_STOCK_START:
    case GET_STOCK_BY_ITEM_AND_LOT_NUMBER_START:
    case CONFIRM_WAREHOUSE_EXPORT_START:
    case ITEM_WAREHOUSE_STOCK_AVAILABLE_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WAREHOUSE_TRANSFERS_SUCCESS:
      return {
        ...state,
        warehouseTransferList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_LIST_ITEM_WAREHOUSE_STOCK_SUCCESS:
      return {
        ...state,
        itemWarehouseStockList: action.payload.items,
        isLoading: false,
      }
    case CONFIRM_WAREHOUSE_TRANSFER_FAILED:
    case CONFIRM_WAREHOUSE_TRANSFER_SUCCESS:
    case REJECT_WAREHOUSE_TRANSFER_FAILED:
    case REJECT_WAREHOUSE_TRANSFER_SUCCESS:
    case SEARCH_WAREHOUSE_TRANSFERS_FAILED:
    case CREATE_WAREHOUSE_TRANSFER_SUCCESS:
    case CREATE_WAREHOUSE_TRANSFER_FAILED:
    case UPDATE_WAREHOUSE_TRANSFER_SUCCESS:
    case UPDATE_WAREHOUSE_TRANSFER_FAILED:
    case DELETE_WAREHOUSE_TRANSFER_SUCCESS:
    case DELETE_WAREHOUSE_TRANSFER_FAILED:
    case CONFIRM_WAREHOUSE_EXPORT_SUCCESS:
    case CONFIRM_WAREHOUSE_EXPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_WAREHOUSE_TRANSFER_DETAILS_SUCCESS:
      return {
        ...state,
        warehouseTransferDetails: action.payload,
        isLoading: false,
      }
    case GET_WAREHOUSE_TRANSFER_DETAILS_FAILED:
      return {
        ...state,
        warehouseTransferDetails: {},
        isLoading: false,
        total: false,
      }
    case GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_SUCCESS:
      return {
        ...state,
        lotNumberList: action.payload,
        isLoading: false,
      }
    case GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_FAILED:
      return {
        ...state,
        lotNumberList: [],
        isLoading: false,
      }
    case GET_LIST_ITEM_WAREHOUSE_STOCK_FAILED:
      return {
        ...state,
        itemWarehouseStockList: [],
        isLoading: false,
      }
    case GET_STOCK_BY_ITEM_AND_LOT_NUMBER_SUCCESS:
      return {
        ...state,
        itemStocks: action.payload,
        isLoading: false,
      }
    case GET_STOCK_BY_ITEM_AND_LOT_NUMBER_FAILED:
      return {
        ...state,
        itemStocks: [],
        isLoading: false,
      }

    case ITEM_WAREHOUSE_STOCK_AVAILABLE_SUCCESS:
      return {
        ...state,
        itemStockAvailabe: action.payload,
        isLoading: false,
      }
    case ITEM_WAREHOUSE_STOCK_AVAILABLE_FAILED:
      return {
        ...state,
        itemStockAvailabe: [],
        isLoading: false,
      }
    case RESET_WAREHOUSE_TRANSFER:
      return {
        ...state,
        warehouseTransferDetails: {},
      }
    default:
      return state
  }
}
