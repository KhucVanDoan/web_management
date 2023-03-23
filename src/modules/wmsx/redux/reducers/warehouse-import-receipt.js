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
  UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_START,
  UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  CONFIRM_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START,
  CONFIRM_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  REJECT_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  REJECT_WAREHOUSE_IMPORT_RECEIPT_START,
  REJECT_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
  RESET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_STATE,
  GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_FAILED,
  GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_START,
  GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_SUCCESS,
  IMPORT_WAREHOUSE_START,
  IMPORT_WAREHOUSE_SUCCESS,
  IMPORT_WAREHOUSE_FAILED,
  CONFIRM_WAREHOUSE_IMPORT_EBS_FAILED,
  CONFIRM_WAREHOUSE_IMPORT_EBS_START,
  CONFIRM_WAREHOUSE_IMPORT_EBS_SUCCESS,
  CANCEL_WAREHOUSE_IMPORT_EBS_FAILED,
  CANCEL_WAREHOUSE_IMPORT_EBS_START,
  CANCEL_WAREHOUSE_IMPORT_EBS_SUCCESS,
  RETURN_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  RETURN_WAREHOUSE_IMPORT_RECEIPT_START,
  RETURN_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'

const initialState = {
  isLoading: false,
  warehouseImportReceiptList: [],
  warehouseImportReceiptDetails: {},
  attributesBusinessTypeDetails: [],
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
    case UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_START:
    case DELETE_WAREHOUSE_IMPORT_RECEIPT_START:
    case CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START:
    case REJECT_WAREHOUSE_IMPORT_RECEIPT_START:
    case GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START:
    case GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_START:
    case IMPORT_WAREHOUSE_START:
    case CONFIRM_WAREHOUSE_IMPORT_EBS_START:
    case CANCEL_WAREHOUSE_IMPORT_EBS_START:
    case RETURN_WAREHOUSE_IMPORT_RECEIPT_START:
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
    case CONFIRM_WAREHOUSE_IMPORT_EBS_FAILED:
    case CONFIRM_WAREHOUSE_IMPORT_EBS_SUCCESS:
    case REJECT_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case REJECT_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case CREATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case CREATE_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case UPDATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case UPDATE_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case DELETE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case DELETE_WAREHOUSE_IMPORT_RECEIPT_FAILED:
    case IMPORT_WAREHOUSE_SUCCESS:
    case IMPORT_WAREHOUSE_FAILED:
    case CANCEL_WAREHOUSE_IMPORT_EBS_SUCCESS:
    case CANCEL_WAREHOUSE_IMPORT_EBS_FAILED:
    case RETURN_WAREHOUSE_IMPORT_RECEIPT_SUCCESS:
    case RETURN_WAREHOUSE_IMPORT_RECEIPT_FAILED:
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
    case GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_SUCCESS:
      return {
        ...state,
        attributesBusinessTypeDetails: action.payload,
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
