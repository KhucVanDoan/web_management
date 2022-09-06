import {
  CREATE_BIN_FAILED,
  CREATE_BIN_START,
  CREATE_BIN_SUCCESS,
  DELETE_BIN_FAILED,
  DELETE_BIN_START,
  DELETE_BIN_SUCCESS,
  GET_BIN_DETAILS_FAILED,
  GET_BIN_DETAILS_START,
  GET_BIN_DETAILS_SUCCESS,
  SEARCH_BIN_FAILED,
  SEARCH_BIN_START,
  SEARCH_BIN_SUCCESS,
  UPDATE_BIN_FAILED,
  UPDATE_BIN_START,
  UPDATE_BIN_SUCCESS,
  CONFIRM_BIN_FAILED,
  CONFIRM_BIN_START,
  CONFIRM_BIN_SUCCESS,
  REJECT_BIN_FAILED,
  REJECT_BIN_START,
  REJECT_BIN_SUCCESS,
  RESET_BIN_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-bin'

const initialState = {
  isLoading: false,
  binList: [],
  binDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineBin(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BIN_START:
    case CREATE_BIN_START:
    case UPDATE_BIN_START:
    case DELETE_BIN_START:
    case CONFIRM_BIN_START:
    case REJECT_BIN_START:
    case GET_BIN_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_BIN_SUCCESS:
      return {
        ...state,
        binList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_BIN_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_BIN_FAILED:
    case CONFIRM_BIN_SUCCESS:
    case REJECT_BIN_FAILED:
    case REJECT_BIN_SUCCESS:
    case CREATE_BIN_SUCCESS:
    case CREATE_BIN_FAILED:
    case UPDATE_BIN_SUCCESS:
    case UPDATE_BIN_FAILED:
    case DELETE_BIN_SUCCESS:
    case DELETE_BIN_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_BIN_DETAILS_SUCCESS:
      return {
        ...state,
        binDetails: action.payload,
        isLoading: false,
      }
    case GET_BIN_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_BIN_DETAILS_STATE:
      return {
        ...state,
        binDetails: {},
      }
    default:
      return state
  }
}
