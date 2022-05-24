import {
  WMSX_CONFIRM_VOUCHER_FAILED,
  WMSX_CONFIRM_VOUCHER_START,
  WMSX_CONFIRM_VOUCHER_SUCCESS,
  WMSX_CREATE_VOUCHER_FAILED,
  WMSX_CREATE_VOUCHER_START,
  WMSX_CREATE_VOUCHER_SUCCESS,
  WMSX_DELETE_VOUCHER_FAILED,
  WMSX_DELETE_VOUCHER_START,
  WMSX_DELETE_VOUCHER_SUCCESS,
  WMSX_GET_VOUCHER_FAILED,
  WMSX_GET_VOUCHER_START,
  WMSX_GET_VOUCHER_SUCCESS,
  WMSX_IMPORT_VOUCHER_FAILED,
  WMSX_IMPORT_VOUCHER_START,
  WMSX_IMPORT_VOUCHER_SUCCESS,
  WMSX_REJECT_VOUCHER_FAILED,
  WMSX_REJECT_VOUCHER_START,
  WMSX_REJECT_VOUCHER_SUCCESS,
  WMSX_SEARCH_VOUCHER_FAILED,
  WMSX_SEARCH_VOUCHER_START,
  WMSX_SEARCH_VOUCHER_SUCCESS,
  WMSX_UPDATE_VOUCHER_FAILED,
  WMSX_UPDATE_VOUCHER_START,
  WMSX_UPDATE_VOUCHER_SUCCESS,
  WMSX_RESET_VOUCHER_DETAIL_STATE,
} from '../actions/voucher'

const initialState = {
  isLoading: false,
  voucherList: [],
  voucher: {},
  total: null,
  importLog: {},
}

/**
 * Sample Reduce
 * @param {*} state
 * @param {*} action
 */
export default function voucher(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_VOUCHER_START:
    case WMSX_GET_VOUCHER_START:
    case WMSX_UPDATE_VOUCHER_START:
    case WMSX_DELETE_VOUCHER_START:
    case WMSX_CREATE_VOUCHER_START:
    case WMSX_IMPORT_VOUCHER_START:
    case WMSX_CONFIRM_VOUCHER_START:
    case WMSX_REJECT_VOUCHER_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_VOUCHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        total: action.payload.total,
        voucherList: action.payload.list,
      }
    case WMSX_SEARCH_VOUCHER_FAILED:
      return {
        ...state,
        isLoading: false,
        total: 0,
        voucherList: [],
      }
    case WMSX_GET_VOUCHER_SUCCESS:
      return {
        ...state,
        voucher: action.payload,
        isLoading: false,
      }
    case WMSX_GET_VOUCHER_FAILED:
      return {
        ...state,
        voucher: {},
        isLoading: false,
      }
    case WMSX_CREATE_VOUCHER_SUCCESS:
    case WMSX_CREATE_VOUCHER_FAILED:
    case WMSX_UPDATE_VOUCHER_SUCCESS:
    case WMSX_UPDATE_VOUCHER_FAILED:
    case WMSX_DELETE_VOUCHER_SUCCESS:
    case WMSX_DELETE_VOUCHER_FAILED:
    case WMSX_CONFIRM_VOUCHER_SUCCESS:
    case WMSX_CONFIRM_VOUCHER_FAILED:
    case WMSX_REJECT_VOUCHER_FAILED:
    case WMSX_REJECT_VOUCHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_IMPORT_VOUCHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_VOUCHER_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case WMSX_RESET_VOUCHER_DETAIL_STATE:
      return {
        ...state,
        voucher: {},
      }
    default:
      return state
  }
}
