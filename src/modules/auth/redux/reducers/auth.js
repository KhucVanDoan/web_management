import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from '../actions/auth'

const initialState = {
  isLoading: false,
  userInfo: {},
}

/**
 * auth reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
    case LOGOUT_START:
      return {
        ...state,
        isLoading: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userInfo: {},
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      }
    case LOGIN_FAILED:
    case LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
