import {
  CREATE_SHELF_FAILED,
  CREATE_SHELF_START,
  CREATE_SHELF_SUCCESS,
  DELETE_SHELF_FAILED,
  DELETE_SHELF_START,
  DELETE_SHELF_SUCCESS,
  GET_SHELF_DETAILS_FAILED,
  GET_SHELF_DETAILS_START,
  GET_SHELF_DETAILS_SUCCESS,
  SEARCH_SHELF_FAILED,
  SEARCH_SHELF_START,
  SEARCH_SHELF_SUCCESS,
  UPDATE_SHELF_FAILED,
  UPDATE_SHELF_START,
  UPDATE_SHELF_SUCCESS,
  CONFIRM_SHELF_FAILED,
  CONFIRM_SHELF_START,
  CONFIRM_SHELF_SUCCESS,
  REJECT_SHELF_FAILED,
  REJECT_SHELF_START,
  REJECT_SHELF_SUCCESS,
  RESET_SHELF_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-shelf'

const initialState = {
  isLoading: false,
  shelfList: [],
  shelfDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineShelf(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SHELF_START:
    case CREATE_SHELF_START:
    case UPDATE_SHELF_START:
    case DELETE_SHELF_START:
    case CONFIRM_SHELF_START:
    case REJECT_SHELF_START:
    case GET_SHELF_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SHELF_SUCCESS:
      return {
        ...state,
        shelfList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_SHELF_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_SHELF_FAILED:
    case CONFIRM_SHELF_SUCCESS:
    case REJECT_SHELF_FAILED:
    case REJECT_SHELF_SUCCESS:
    case CREATE_SHELF_SUCCESS:
    case CREATE_SHELF_FAILED:
    case UPDATE_SHELF_SUCCESS:
    case UPDATE_SHELF_FAILED:
    case DELETE_SHELF_SUCCESS:
    case DELETE_SHELF_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_SHELF_DETAILS_SUCCESS:
      return {
        ...state,
        shelfDetails: action.payload,
        isLoading: false,
      }
    case GET_SHELF_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_SHELF_DETAILS_STATE:
      return {
        ...state,
        shelfDetails: {},
      }
    default:
      return state
  }
}
