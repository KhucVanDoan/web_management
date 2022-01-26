import {
  CREATE_USER_FAILED,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  GET_USER_DETAILS_FAILED,
  GET_USER_DETAILS_START,
  GET_USER_DETAILS_SUCCESS,
  SEARCH_USERS_FAILED,
  SEARCH_USERS_START,
  SEARCH_USERS_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  GENERATE_OTP_FAILED,
  GENERATE_OTP_START,
  GENERATE_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
} from '~/modules/mesx/redux/actions/user-management'

const initialState = {
  isLoading: false,
  userList: [],
  userDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function userManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS_START:
    case CREATE_USER_START:
    case UPDATE_USER_START:
    case DELETE_USER_START:
    case GET_USER_DETAILS_START:
    case GENERATE_OTP_START:
    case VERIFY_OTP_START:
    case RESET_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        userList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_USERS_FAILED:
      return {
        ...state,
        userList: [],
        isLoading: false,
        total: 0,
      }
    case CREATE_USER_SUCCESS:
    case CREATE_USER_FAILED:
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_FAILED:
    case DELETE_USER_SUCCESS:
    case DELETE_USER_FAILED:
    case GENERATE_OTP_SUCCESS:
    case GENERATE_OTP_FAILED:
    case VERIFY_OTP_SUCCESS:
    case VERIFY_OTP_FAILED:
    case RESET_PASSWORD_FAILED:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_USER_DETAILS_FAILED:
      return {
        ...state,
        userDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
