import {
  SEARCH_SO_EXPORT_FAILED,
  SEARCH_SO_EXPORT_START,
  SEARCH_SO_EXPORT_SUCCESS,
  GET_SO_EXPORT_DETAILS_FAILED,
  GET_SO_EXPORT_DETAILS_START,
  GET_SO_EXPORT_DETAILS_SUCCESS,
  CONFIRM_SO_EXPORT_FAILED,
  CONFIRM_SO_EXPORT_START,
  CONFIRM_SO_EXPORT_SUCCESS,
  CREATE_SO_EXPORT_FAILED,
  CREATE_SO_EXPORT_START,
  CREATE_SO_EXPORT_SUCCESS,
  UPDATE_SO_EXPORT_FAILED,
  UPDATE_SO_EXPORT_START,
  UPDATE_SO_EXPORT_SUCCESS,
  REJECT_SO_EXPORT_FAILED,
  REJECT_SO_EXPORT_START,
  REJECT_SO_EXPORT_SUCCESS,
  DELETE_SO_EXPORT_FAILED,
  DELETE_SO_EXPORT_START,
  DELETE_SO_EXPORT_SUCCESS,
} from '~/modules/mesx/redux/actions/so-export.action'

const initialState = {
  isLoading: false,
  soExportList: [],
  soExportDetails: {},
  total: 0,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function soExport(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SO_EXPORT_START:
    case UPDATE_SO_EXPORT_START:
    case CONFIRM_SO_EXPORT_START:
    case CREATE_SO_EXPORT_START:
    case REJECT_SO_EXPORT_START:
    case GET_SO_EXPORT_DETAILS_START:
    case DELETE_SO_EXPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SO_EXPORT_SUCCESS:
      return {
        ...state,
        soExportList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }

    case SEARCH_SO_EXPORT_FAILED:
    case CONFIRM_SO_EXPORT_FAILED:
    case CONFIRM_SO_EXPORT_SUCCESS:
    case REJECT_SO_EXPORT_FAILED:
    case REJECT_SO_EXPORT_SUCCESS:
    case CREATE_SO_EXPORT_SUCCESS:
    case CREATE_SO_EXPORT_FAILED:
    case UPDATE_SO_EXPORT_SUCCESS:
    case UPDATE_SO_EXPORT_FAILED:
    case DELETE_SO_EXPORT_SUCCESS:
    case DELETE_SO_EXPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_SO_EXPORT_DETAILS_SUCCESS:
      return {
        ...state,
        soExportDetails: action.payload,
        isLoading: false,
      }
    case GET_SO_EXPORT_DETAILS_FAILED:
      return {
        ...state,
        soExportDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
