import {
  WMSX_CREATE_TYPE_UNIT_FAILED,
  WMSX_CREATE_TYPE_UNIT_START,
  WMSX_CREATE_TYPE_UNIT_SUCCESS,
  WMSX_DELETE_TYPE_UNIT_FAILED,
  WMSX_DELETE_TYPE_UNIT_START,
  WMSX_DELETE_TYPE_UNIT_SUCCESS,
  WMSX_GET_TYPE_UNIT_DETAILS_FAILED,
  WMSX_GET_TYPE_UNIT_DETAILS_START,
  WMSX_GET_TYPE_UNIT_DETAILS_SUCCESS,
  WMSX_SEARCH_TYPE_UNITS_FAILED,
  WMSX_SEARCH_TYPE_UNITS_START,
  WMSX_SEARCH_TYPE_UNITS_SUCCESS,
  WMSX_UPDATE_TYPE_UNIT_FAILED,
  WMSX_UPDATE_TYPE_UNIT_START,
  WMSX_UPDATE_TYPE_UNIT_SUCCESS,
  WMSX_CONFIRM_TYPE_UNIT_START,
  WMSX_CONFIRM_TYPE_UNIT_FAILED,
  WMSX_CONFIRM_TYPE_UNIT_SUCCESS,
  WMSX_IMPORT_TYPE_UNIT_START,
  WMSX_IMPORT_TYPE_UNIT_SUCCESS,
  WMSX_IMPORT_TYPE_UNIT_FAILED,
  WMSX_RESET_TYPE_UNIT_STATE,
} from '../actions/define-type-unit'

const initialState = {
  isLoading: false,
  typeUnitsList: [],
  typeUnitsDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function typeUnitsSetting(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_TYPE_UNITS_START:
    case WMSX_CREATE_TYPE_UNIT_START:
    case WMSX_UPDATE_TYPE_UNIT_START:
    case WMSX_DELETE_TYPE_UNIT_START:
    case WMSX_GET_TYPE_UNIT_DETAILS_START:
    case WMSX_IMPORT_TYPE_UNIT_START:
    case WMSX_CONFIRM_TYPE_UNIT_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_CONFIRM_TYPE_UNIT_FAILED:
    case WMSX_CONFIRM_TYPE_UNIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_SEARCH_TYPE_UNITS_SUCCESS:
      return {
        ...state,
        typeUnitsList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_SEARCH_TYPE_UNITS_FAILED:
    case WMSX_CREATE_TYPE_UNIT_SUCCESS:
    case WMSX_CREATE_TYPE_UNIT_FAILED:
    case WMSX_UPDATE_TYPE_UNIT_SUCCESS:
    case WMSX_UPDATE_TYPE_UNIT_FAILED:
    case WMSX_DELETE_TYPE_UNIT_SUCCESS:
    case WMSX_DELETE_TYPE_UNIT_FAILED:
    case WMSX_GET_TYPE_UNIT_DETAILS_FAILED:
      return {
        ...state,
        typeUnitsDetails: {},
        isLoading: false,
      }
    case WMSX_GET_TYPE_UNIT_DETAILS_SUCCESS:
      return {
        ...state,
        typeUnitsDetails: action.payload,
        isLoading: false,
      }
    case WMSX_IMPORT_TYPE_UNIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_TYPE_UNIT_FAILED:
      return {
        ...state,
        importLog: {},
      }
    case WMSX_RESET_TYPE_UNIT_STATE:
      return {
        ...state,
        typeUnitsDetails: {},
      }
    default:
      return state
  }
}
