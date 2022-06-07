import {
  WMSX_CREATE_TYPE_SERVICE_FAILED,
  WMSX_CREATE_TYPE_SERVICE_START,
  WMSX_CREATE_TYPE_SERVICE_SUCCESS,
  WMSX_DELETE_TYPE_SERVICE_FAILED,
  WMSX_DELETE_TYPE_SERVICE_START,
  WMSX_DELETE_TYPE_SERVICE_SUCCESS,
  WMSX_GET_TYPE_SERVICE_DETAILS_FAILED,
  WMSX_GET_TYPE_SERVICE_DETAILS_START,
  WMSX_GET_TYPE_SERVICE_DETAILS_SUCCESS,
  WMSX_SEARCH_TYPE_SERVICE_FAILED,
  WMSX_SEARCH_TYPE_SERVICE_START,
  WMSX_SEARCH_TYPE_SERVICE_SUCCESS,
  WMSX_UPDATE_TYPE_SERVICE_FAILED,
  WMSX_UPDATE_TYPE_SERVICE_START,
  WMSX_UPDATE_TYPE_SERVICE_SUCCESS,
  WMSX_CONFIRM_TYPE_SERVICE_START,
  WMSX_CONFIRM_TYPE_SERVICE_FAILED,
  WMSX_CONFIRM_TYPE_SERVICE_SUCCESS,
  WMSX_IMPORT_TYPE_SERVICE_START,
  WMSX_IMPORT_TYPE_SERVICE_SUCCESS,
  WMSX_IMPORT_TYPE_SERVICE_FAILED,
  WMSX_RESET_TYPE_SERVICE_STATE,
} from '../actions/define-type-service'

const initialState = {
  isLoading: false,
  typeServicesList: [],
  typeServicesDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function typeServiceSetting(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_TYPE_SERVICE_START:
    case WMSX_CREATE_TYPE_SERVICE_START:
    case WMSX_UPDATE_TYPE_SERVICE_START:
    case WMSX_DELETE_TYPE_SERVICE_START:
    case WMSX_GET_TYPE_SERVICE_DETAILS_START:
    case WMSX_IMPORT_TYPE_SERVICE_START:
    case WMSX_CONFIRM_TYPE_SERVICE_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_CONFIRM_TYPE_SERVICE_FAILED:
    case WMSX_CONFIRM_TYPE_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_SEARCH_TYPE_SERVICE_SUCCESS:
      return {
        ...state,
        typeServicesList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_SEARCH_TYPE_SERVICE_FAILED:
    case WMSX_CREATE_TYPE_SERVICE_SUCCESS:
    case WMSX_CREATE_TYPE_SERVICE_FAILED:
    case WMSX_UPDATE_TYPE_SERVICE_SUCCESS:
    case WMSX_UPDATE_TYPE_SERVICE_FAILED:
    case WMSX_DELETE_TYPE_SERVICE_SUCCESS:
    case WMSX_DELETE_TYPE_SERVICE_FAILED:
    case WMSX_GET_TYPE_SERVICE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_TYPE_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        typeServicesDetails: action.payload,
        isLoading: false,
      }
    case WMSX_IMPORT_TYPE_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case WMSX_IMPORT_TYPE_SERVICE_FAILED:
      return {
        ...state,
        importLog: {},
      }
    case WMSX_RESET_TYPE_SERVICE_STATE:
      return {
        ...state,
        typeServicesDetails: {},
      }
    default:
      return state
  }
}
