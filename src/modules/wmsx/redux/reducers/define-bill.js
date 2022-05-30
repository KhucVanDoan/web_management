import {
  WMSX_COMPLETE_BILL_FAILED,
  WMSX_COMPLETE_BILL_START,
  WMSX_COMPLETE_BILL_SUCCESS,
  WMSX_CONFIRM_BILL_FAILED,
  WMSX_CONFIRM_BILL_START,
  WMSX_CONFIRM_BILL_SUCCESS,
  WMSX_CREATE_BILL_FAILED,
  WMSX_CREATE_BILL_START,
  WMSX_CREATE_BILL_SUCCESS,
  WMSX_DELETE_BILL_FAILED,
  WMSX_DELETE_BILL_START,
  WMSX_DELETE_BILL_SUCCESS,
  WMSX_GET_BILL_DETAILS_FAILED,
  WMSX_GET_BILL_DETAILS_START,
  WMSX_GET_BILL_DETAILS_SUCCESS,
  WMSX_IMPORT_BILL_FAILED,
  WMSX_IMPORT_BILL_START,
  WMSX_IMPORT_BILL_SUCCESS,
  WMSX_REJECT_BILL_FAILED,
  WMSX_REJECT_BILL_START,
  WMSX_REJECT_BILL_SUCCESS,
  WMSX_SEARCH_BILL_FAILED,
  WMSX_SEARCH_BILL_START,
  WMSX_SEARCH_BILL_SUCCESS,
  WMSX_UPDATE_BILL_FAILED,
  WMSX_UPDATE_BILL_START,
  WMSX_UPDATE_BILL_SUCCESS,
  WMSX_RESET_BILL_DETAIL_STATE,
} from '../actions/define-bill'

const initialState = {
  isLoading: false,
  billList: [],
  billDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function bill(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_BILL_START:
    case WMSX_CREATE_BILL_START:
    case WMSX_UPDATE_BILL_START:
    case WMSX_DELETE_BILL_START:
    case WMSX_GET_BILL_DETAILS_START:
    case WMSX_CONFIRM_BILL_START:
    case WMSX_COMPLETE_BILL_START:
    case WMSX_REJECT_BILL_START:
    case WMSX_IMPORT_BILL_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_BILL_SUCCESS:
      return {
        ...state,
        billList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_BILL_FAILED:
      return {
        ...state,
        billList: [],
        isLoading: false,
        total: 0,
      }
    case WMSX_CONFIRM_BILL_FAILED:
    case WMSX_CONFIRM_BILL_SUCCESS:
    case WMSX_COMPLETE_BILL_SUCCESS:
    case WMSX_COMPLETE_BILL_FAILED:
    case WMSX_REJECT_BILL_FAILED:
    case WMSX_REJECT_BILL_SUCCESS:
    case WMSX_CREATE_BILL_SUCCESS:
    case WMSX_CREATE_BILL_FAILED:
    case WMSX_UPDATE_BILL_SUCCESS:
    case WMSX_UPDATE_BILL_FAILED:
    case WMSX_DELETE_BILL_SUCCESS:
    case WMSX_DELETE_BILL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_BILL_DETAILS_SUCCESS:
      return {
        ...state,
        billDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_BILL_DETAILS_FAILED:
      return {
        ...state,
        billDetails: {},
        isLoading: false,
      }
    case WMSX_IMPORT_BILL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_BILL_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case WMSX_RESET_BILL_DETAIL_STATE:
      return {
        ...state,
        billDetails: {},
      }
    default:
      return state
  }
}
