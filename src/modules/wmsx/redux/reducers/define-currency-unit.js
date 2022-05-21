import {
  WMSX_CREATE_CURRENCY_UNIT_FAILED,
  WMSX_CREATE_CURRENCY_UNIT_START,
  WMSX_CREATE_CURRENCY_UNIT_SUCCESS,
  WMSX_DELETE_CURRENCY_UNIT_FAILED,
  WMSX_DELETE_CURRENCY_UNIT_START,
  WMSX_DELETE_CURRENCY_UNIT_SUCCESS,
  WMSX_GET_CURRENCY_UNIT_DETAILS_FAILED,
  WMSX_GET_CURRENCY_UNIT_DETAILS_START,
  WMSX_GET_CURRENCY_UNIT_DETAILS_SUCCESS,
  WMSX_PRINT_QR_CURRENCY_UNITS_FAILED,
  WMSX_PRINT_QR_CURRENCY_UNITS_START,
  WMSX_PRINT_QR_CURRENCY_UNITS_SUCCESS,
  WMSX_SEARCH_CURRENCY_UNITS_FAILED,
  WMSX_SEARCH_CURRENCY_UNITS_START,
  WMSX_SEARCH_CURRENCY_UNITS_SUCCESS,
  WMSX_UPDATE_CURRENCY_UNIT_FAILED,
  WMSX_UPDATE_CURRENCY_UNIT_START,
  WMSX_UPDATE_CURRENCY_UNIT_SUCCESS,
  WMSX_REJECT_CURRENCY_UNIT_START,
  WMSX_REJECT_CURRENCY_UNIT_SUCCESS,
  WMSX_REJECT_CURRENCY_UNIT_FAILED,
  WMSX_IMPORT_CURRENCY_UNIT_START,
  WMSX_IMPORT_CURRENCY_UNIT_SUCCESS,
  WMSX_IMPORT_CURRENCY_UNIT_FAILED,
  WMSX_RESET_CURRENCY_UNIT_STATE,
} from '../actions/define-currency-unit'

const initialState = {
  isLoading: false,
  currencyUnitList: [],
  currencyUnitDetails: {},
  total: 0,
  imporLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineCurrencyUnit(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_CURRENCY_UNITS_START:
    case WMSX_CREATE_CURRENCY_UNIT_START:
    case WMSX_UPDATE_CURRENCY_UNIT_START:
    case WMSX_DELETE_CURRENCY_UNIT_START:
    case WMSX_GET_CURRENCY_UNIT_DETAILS_START:
    case WMSX_REJECT_CURRENCY_UNIT_START:
    case WMSX_IMPORT_CURRENCY_UNIT_START:
    case WMSX_PRINT_QR_CURRENCY_UNITS_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_CURRENCY_UNITS_SUCCESS:
      return {
        ...state,
        currencyUnitList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_SEARCH_CURRENCY_UNITS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_CREATE_CURRENCY_UNIT_SUCCESS:
    case WMSX_CREATE_CURRENCY_UNIT_FAILED:
    case WMSX_UPDATE_CURRENCY_UNIT_SUCCESS:
    case WMSX_UPDATE_CURRENCY_UNIT_FAILED:
    case WMSX_DELETE_CURRENCY_UNIT_SUCCESS:
    case WMSX_DELETE_CURRENCY_UNIT_FAILED:
    case WMSX_PRINT_QR_CURRENCY_UNITS_SUCCESS:
    case WMSX_PRINT_QR_CURRENCY_UNITS_FAILED:
    case WMSX_REJECT_CURRENCY_UNIT_SUCCESS:
    case WMSX_REJECT_CURRENCY_UNIT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_CURRENCY_UNIT_DETAILS_SUCCESS:
      return {
        ...state,
        currencyUnitDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_CURRENCY_UNIT_DETAILS_FAILED:
      return {
        ...state,
        currencyUnitDetails: {},
        isLoading: false,
      }
    case WMSX_IMPORT_CURRENCY_UNIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_CURRENCY_UNIT_FAILED:
      return {
        ...state,
        importLog: {},
      }
    case WMSX_RESET_CURRENCY_UNIT_STATE:
      return {
        ...state,
        currencyUnitDetails: {},
      }
    default:
      return state
  }
}
