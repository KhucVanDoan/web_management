import {
  WMSX_CONFIRM_INVOICE_TYPE_FAILED,
  WMSX_CONFIRM_INVOICE_TYPE_START,
  WMSX_CONFIRM_INVOICE_TYPE_SUCCESS,
  WMSX_CREATE_INVOICE_TYPE_FAILED,
  WMSX_CREATE_INVOICE_TYPE_START,
  WMSX_CREATE_INVOICE_TYPE_SUCCESS,
  WMSX_DELETE_INVOICE_TYPE_FAILED,
  WMSX_DELETE_INVOICE_TYPE_START,
  WMSX_DELETE_INVOICE_TYPE_SUCCESS,
  WMSX_GET_INVOICE_TYPE_DETAIL_FAILED,
  WMSX_GET_INVOICE_TYPE_DETAIL_START,
  WMSX_GET_INVOICE_TYPE_DETAIL_SUCCESS,
  WMSX_IMPORT_INVOICE_TYPE_FAILED,
  WMSX_IMPORT_INVOICE_TYPE_START,
  WMSX_IMPORT_INVOICE_TYPE_SUCCESS,
  WMSX_REJECT_INVOICE_TYPE_FAILED,
  WMSX_REJECT_INVOICE_TYPE_START,
  WMSX_REJECT_INVOICE_TYPE_SUCCESS,
  WMSX_RESET_INVOICE_TYPE_DETAIL,
  WMSX_SEARCH_INVOICE_TYPES_FAILED,
  WMSX_SEARCH_INVOICE_TYPES_START,
  WMSX_SEARCH_INVOICE_TYPES_SUCCESS,
  WMSX_UPDATE_INVOICE_TYPE_FAILED,
  WMSX_UPDATE_INVOICE_TYPE_START,
  WMSX_UPDATE_INVOICE_TYPE_SUCCESS,
} from '../actions/invoice-type'

const initialState = {
  isLoading: false,
  invoiceTypeList: [],
  invoiceTypeDetail: {},
  importLog: {},
  total: 0,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function invoiceType(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_INVOICE_TYPES_START:
    case WMSX_CREATE_INVOICE_TYPE_START:
    case WMSX_UPDATE_INVOICE_TYPE_START:
    case WMSX_DELETE_INVOICE_TYPE_START:
    case WMSX_GET_INVOICE_TYPE_DETAIL_START:
    case WMSX_REJECT_INVOICE_TYPE_START:
    case WMSX_CONFIRM_INVOICE_TYPE_START:
    case WMSX_IMPORT_INVOICE_TYPE_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_INVOICE_TYPES_SUCCESS:
      return {
        ...state,
        invoiceTypeList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_SEARCH_INVOICE_TYPES_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_CREATE_INVOICE_TYPE_SUCCESS:
    case WMSX_CREATE_INVOICE_TYPE_FAILED:
    case WMSX_UPDATE_INVOICE_TYPE_SUCCESS:
    case WMSX_UPDATE_INVOICE_TYPE_FAILED:
    case WMSX_DELETE_INVOICE_TYPE_SUCCESS:
    case WMSX_DELETE_INVOICE_TYPE_FAILED:
    case WMSX_CONFIRM_INVOICE_TYPE_FAILED:
    case WMSX_CONFIRM_INVOICE_TYPE_SUCCESS:
    case WMSX_REJECT_INVOICE_TYPE_SUCCESS:
    case WMSX_REJECT_INVOICE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_INVOICE_TYPE_DETAIL_SUCCESS:
      return {
        ...state,
        invoiceTypeDetail: action.payload,
        isLoading: false,
      }
    case WMSX_GET_INVOICE_TYPE_DETAIL_FAILED:
      return {
        ...state,
        invoiceTypeDetail: {},
        isLoading: false,
      }
    case WMSX_IMPORT_INVOICE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_INVOICE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case WMSX_RESET_INVOICE_TYPE_DETAIL:
      return {
        ...state,
        invoiceTypeDetail: {},
      }
    default:
      return state
  }
}
