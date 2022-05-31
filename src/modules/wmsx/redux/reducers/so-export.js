import {
  WMSX_CONFIRM_SO_EXPORT_FAILED,
  WMSX_CONFIRM_SO_EXPORT_START,
  WMSX_CONFIRM_SO_EXPORT_SUCCESS,
  WMSX_CREATE_SO_EXPORT_FAILED,
  WMSX_CREATE_SO_EXPORT_START,
  WMSX_CREATE_SO_EXPORT_SUCCESS,
  WMSX_DELETE_SO_EXPORT_FAILED,
  WMSX_DELETE_SO_EXPORT_START,
  WMSX_DELETE_SO_EXPORT_SUCCESS,
  WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_FAILED,
  WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_START,
  WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_SUCCESS,
  WMSX_GET_SO_EXPORT_DETAILS_FAILED,
  WMSX_GET_SO_EXPORT_DETAILS_START,
  WMSX_GET_SO_EXPORT_DETAILS_SUCCESS,
  WMSX_REJECT_SO_EXPORT_FAILED,
  WMSX_REJECT_SO_EXPORT_START,
  WMSX_REJECT_SO_EXPORT_SUCCESS,
  WMSX_RESET_SO_EXPORT_DETAIL_STATE,
  WMSX_SEARCH_SO_EXPORT_FAILED,
  WMSX_SEARCH_SO_EXPORT_START,
  WMSX_SEARCH_SO_EXPORT_SUCCESS,
  WMSX_UPDATE_SO_EXPORT_FAILED,
  WMSX_UPDATE_SO_EXPORT_START,
  WMSX_UPDATE_SO_EXPORT_SUCCESS,
} from '../actions/so-export'

const initialState = {
  isLoading: false,
  soExportList: [],
  soExportDetails: {},
  total: 0,
  lotNumberList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function soExport(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_SO_EXPORT_START:
    case WMSX_UPDATE_SO_EXPORT_START:
    case WMSX_CONFIRM_SO_EXPORT_START:
    case WMSX_CREATE_SO_EXPORT_START:
    case WMSX_REJECT_SO_EXPORT_START:
    case WMSX_GET_SO_EXPORT_DETAILS_START:
    case WMSX_DELETE_SO_EXPORT_START:
    case WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_SO_EXPORT_SUCCESS:
      return {
        ...state,
        soExportList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }

    case WMSX_SEARCH_SO_EXPORT_FAILED:
    case WMSX_CONFIRM_SO_EXPORT_FAILED:
    case WMSX_CONFIRM_SO_EXPORT_SUCCESS:
    case WMSX_REJECT_SO_EXPORT_FAILED:
    case WMSX_REJECT_SO_EXPORT_SUCCESS:
    case WMSX_CREATE_SO_EXPORT_SUCCESS:
    case WMSX_CREATE_SO_EXPORT_FAILED:
    case WMSX_UPDATE_SO_EXPORT_SUCCESS:
    case WMSX_UPDATE_SO_EXPORT_FAILED:
    case WMSX_DELETE_SO_EXPORT_SUCCESS:
    case WMSX_DELETE_SO_EXPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_SO_EXPORT_DETAILS_SUCCESS:
      return {
        ...state,
        soExportDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_SO_EXPORT_DETAILS_FAILED:
      return {
        ...state,
        soExportDetails: {},
        isLoading: false,
      }
    case WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_SUCCESS:
      return {
        ...state,
        lotNumberList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_FAILED:
      return {
        ...state,
        lotNumberList: [],
        isLoading: false,
      }
    case WMSX_RESET_SO_EXPORT_DETAIL_STATE:
      return {
        ...state,
        soExportDetails: {},
      }
    default:
      return state
  }
}
