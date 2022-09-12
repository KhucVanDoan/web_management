import {
  CREATE_VENDOR_FAILED,
  CREATE_VENDOR_START,
  CREATE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILED,
  DELETE_VENDOR_START,
  DELETE_VENDOR_SUCCESS,
  GET_VENDOR_DETAILS_FAILED,
  GET_VENDOR_DETAILS_START,
  GET_VENDOR_DETAILS_SUCCESS,
  SEARCH_VENDORS_FAILED,
  SEARCH_VENDORS_START,
  SEARCH_VENDORS_SUCCESS,
  UPDATE_VENDOR_FAILED,
  UPDATE_VENDOR_START,
  UPDATE_VENDOR_SUCCESS,
  IMPORT_VENDOR_START,
  IMPORT_VENDOR_SUCCESS,
  IMPORT_VENDOR_FAILED,
  CONFIRM_VENDOR_FAILED,
  CONFIRM_VENDOR_START,
  CONFIRM_VENDOR_SUCCESS,
  REJECT_VENDOR_FAILED,
  REJECT_VENDOR_START,
  REJECT_VENDOR_SUCCESS,
  RESET_DETAIL_VENDOR_STATE,
} from '../actions/define-vendor'

const initialState = {
  isLoading: false,
  vendorsList: [],
  vendorDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineVendor(state = initialState, action) {
  switch (action.type) {
    case SEARCH_VENDORS_START:
    case CREATE_VENDOR_START:
    case UPDATE_VENDOR_START:
    case DELETE_VENDOR_START:
    case IMPORT_VENDOR_START:
    case CONFIRM_VENDOR_START:
    case REJECT_VENDOR_START:
    case GET_VENDOR_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_VENDORS_SUCCESS:
      return {
        ...state,
        vendorsList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_VENDORS_FAILED:
      return {
        ...state,
        vendorsList: [],
        isLoading: false,
        total: 0,
      }
    case REJECT_VENDOR_FAILED:
    case REJECT_VENDOR_SUCCESS:
    case CONFIRM_VENDOR_FAILED:
    case CONFIRM_VENDOR_SUCCESS:
    case CREATE_VENDOR_SUCCESS:
    case CREATE_VENDOR_FAILED:
    case UPDATE_VENDOR_SUCCESS:
    case UPDATE_VENDOR_FAILED:
    case DELETE_VENDOR_SUCCESS:
    case DELETE_VENDOR_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    case GET_VENDOR_DETAILS_SUCCESS:
      return {
        ...state,
        vendorDetails: action.payload,
        isLoading: false,
      }
    case GET_VENDOR_DETAILS_FAILED:
      return {
        ...state,
        vendorDetails: {},
        isLoading: false,
      }
    case IMPORT_VENDOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case IMPORT_VENDOR_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case RESET_DETAIL_VENDOR_STATE:
      return {
        ...state,
        vendorDetails: {},
      }
    default:
      return state
  }
}
