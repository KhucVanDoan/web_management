import {
  CONFIRM_PAYMENT_TYPE_FAILED,
  CONFIRM_PAYMENT_TYPE_START,
  CONFIRM_PAYMENT_TYPE_SUCCESS,
  CREATE_PAYMENT_TYPE_FAILED,
  CREATE_PAYMENT_TYPE_START,
  CREATE_PAYMENT_TYPE_SUCCESS,
  DELETE_PAYMENT_TYPE_FAILED,
  DELETE_PAYMENT_TYPE_START,
  DELETE_PAYMENT_TYPE_SUCCESS,
  GET_PAYMENT_TYPE_DETAILS_FAILED,
  GET_PAYMENT_TYPE_DETAILS_START,
  GET_PAYMENT_TYPE_DETAILS_SUCCESS,
  REJECT_PAYMENT_TYPE_FAILED,
  REJECT_PAYMENT_TYPE_START,
  REJECT_PAYMENT_TYPE_SUCCESS,
  SEARCH_PAYMENT_TYPES_FAILED,
  SEARCH_PAYMENT_TYPES_START,
  SEARCH_PAYMENT_TYPES_SUCCESS,
  UPDATE_PAYMENT_TYPE_FAILED,
  UPDATE_PAYMENT_TYPE_START,
  UPDATE_PAYMENT_TYPE_SUCCESS,
  IMPORT_PAYMENT_TYPE_START,
  IMPORT_PAYMENT_TYPE_SUCCESS,
  IMPORT_PAYMENT_TYPE_FAILED,
  RESET_STATE_PAYMENT_TYPE,
} from '../actions/define-payment-type'

const initialState = {
  isLoading: false,
  paymentTypeList: [],
  paymentTypeDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function definePaymentType(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PAYMENT_TYPES_START:
    case CREATE_PAYMENT_TYPE_START:
    case UPDATE_PAYMENT_TYPE_START:
    case DELETE_PAYMENT_TYPE_START:
    case GET_PAYMENT_TYPE_DETAILS_START:
    case CONFIRM_PAYMENT_TYPE_START:
    case IMPORT_PAYMENT_TYPE_START:
    case REJECT_PAYMENT_TYPE_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PAYMENT_TYPES_SUCCESS:
      return {
        ...state,
        paymentTypeList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_PAYMENT_TYPES_FAILED:
      return {
        ...state,
        paymentTypeList: [],
        isLoading: false,
        total: 0,
      }
    case CONFIRM_PAYMENT_TYPE_FAILED:
    case CONFIRM_PAYMENT_TYPE_SUCCESS:
    case REJECT_PAYMENT_TYPE_FAILED:
    case REJECT_PAYMENT_TYPE_SUCCESS:
    case CREATE_PAYMENT_TYPE_SUCCESS:
    case CREATE_PAYMENT_TYPE_FAILED:
    case UPDATE_PAYMENT_TYPE_SUCCESS:
    case UPDATE_PAYMENT_TYPE_FAILED:
    case DELETE_PAYMENT_TYPE_SUCCESS:
    case DELETE_PAYMENT_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_PAYMENT_TYPE_DETAILS_SUCCESS:
      return {
        ...state,
        paymentTypeDetails: action.payload,
        isLoading: false,
      }
    case GET_PAYMENT_TYPE_DETAILS_FAILED:
      return {
        ...state,
        paymentTypeDetails: {},
        isLoading: false,
      }
    case IMPORT_PAYMENT_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case IMPORT_PAYMENT_TYPE_FAILED:
      return {
        ...state,
        importLog: {},
      }
    case RESET_STATE_PAYMENT_TYPE:
      return {
        ...state,
        paymentTypeDetails: {},
      }
    default:
      return state
  }
}
