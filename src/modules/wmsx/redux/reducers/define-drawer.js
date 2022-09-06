import {
  CREATE_DRAWER_FAILED,
  CREATE_DRAWER_START,
  CREATE_DRAWER_SUCCESS,
  DELETE_DRAWER_FAILED,
  DELETE_DRAWER_START,
  DELETE_DRAWER_SUCCESS,
  GET_DRAWER_DETAILS_FAILED,
  GET_DRAWER_DETAILS_START,
  GET_DRAWER_DETAILS_SUCCESS,
  SEARCH_DRAWER_FAILED,
  SEARCH_DRAWER_START,
  SEARCH_DRAWER_SUCCESS,
  UPDATE_DRAWER_FAILED,
  UPDATE_DRAWER_START,
  UPDATE_DRAWER_SUCCESS,
  CONFIRM_DRAWER_FAILED,
  CONFIRM_DRAWER_START,
  CONFIRM_DRAWER_SUCCESS,
  REJECT_DRAWER_FAILED,
  REJECT_DRAWER_START,
  REJECT_DRAWER_SUCCESS,
  RESET_DRAWER_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-drawer'

const initialState = {
  isLoading: false,
  drawerList: [],
  drawerDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineDrawer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DRAWER_START:
    case CREATE_DRAWER_START:
    case UPDATE_DRAWER_START:
    case DELETE_DRAWER_START:
    case CONFIRM_DRAWER_START:
    case REJECT_DRAWER_START:
    case GET_DRAWER_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DRAWER_SUCCESS:
      return {
        ...state,
        drawerList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_DRAWER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_DRAWER_FAILED:
    case CONFIRM_DRAWER_SUCCESS:
    case REJECT_DRAWER_FAILED:
    case REJECT_DRAWER_SUCCESS:
    case CREATE_DRAWER_SUCCESS:
    case CREATE_DRAWER_FAILED:
    case UPDATE_DRAWER_SUCCESS:
    case UPDATE_DRAWER_FAILED:
    case DELETE_DRAWER_SUCCESS:
    case DELETE_DRAWER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DRAWER_DETAILS_SUCCESS:
      return {
        ...state,
        drawerDetails: action.payload,
        isLoading: false,
      }
    case GET_DRAWER_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_DRAWER_DETAILS_STATE:
      return {
        ...state,
        drawerDetails: {},
      }
    default:
      return state
  }
}
