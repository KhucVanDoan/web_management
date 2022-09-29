import {
  CREATE_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  CREATE_WAREHOUSE_IMPORT_RECEIPT_START,
  CREATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  DELETE_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  DELETE_WAREHOUSE_IMPORT_RECEIPT_START,
  DELETE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_FAILED,
  GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START,
  GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_SUCCESS,
  SEARCH_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  SEARCH_WAREHOUSE_IMPORT_RECEIPT_START,
  SEARCH_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  UPDATE_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  UPDATE_WAREHOUSE_IMPORT_RECEIPT_START,
  UPDATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  CONFIRM_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START,
  CONFIRM_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  REJECT_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  REJECT_WAREHOUSE_IMPORT_RECEIPT_START,
  REJECT_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  RESET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'

const initialState = {
  isLoading: false,
  warehouseImportReceiptList: [],
  warehouseImportReceiptDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function warehouseImportReceipt(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WAREHOUSE_IMPORT_RECEIPT_START:
    case CREATE_WAREHOUSE_IMPORT_RECEIPT_START:
    case UPDATE_WAREHOUSE_IMPORT_RECEIPT_START:
    case DELETE_WAREHOUSE_IMPORT_RECEIPT_START:
    case CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START:
    case REJECT_WAREHOUSE_IMPORT_RECEIPT_START:
    case GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
      return {
        ...state,
        warehouseImportReceiptList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_WAREHOUSE_IMPORT_RECEIPT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case CONFIRM_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case REJECT_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case REJECT_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case CREATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case CREATE_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case UPDATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case UPDATE_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case DELETE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case DELETE_WAREHOUSE_IMPORT_RECEIPT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_SUCCESS:
      return {
        ...state,
        warehouseImportReceiptDetails: action.payload,
        isLoading: false,
      }
    case GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_STATE:
      return {
        ...state,
        warehouseImportReceiptDetails: {},
      }
    default:
      return state
  }
}