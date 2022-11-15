import { LOGOUT_SUCCESS } from '~/modules/auth/redux/actions/auth'
import {
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_START,
  UPDATE_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
} from '~/modules/configuration/redux/actions/user-info'
import { CHANGE_NOTIFICATION_STATUS_SUCCESS } from '~/modules/shared/redux/actions/notification'

const initialState = {
  isLoading: false,
  userInfo: {},
}

/**
 * reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO_START:
    case UPDATE_USER_INFO_START:
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      }
    case GET_USER_INFO_FAILED:
    case UPDATE_USER_INFO_FAILED:
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }

    case CHANGE_NOTIFICATION_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: {
          ...state.userInfo,
          statusNotification: action.payload?.statusNotification || false,
        },
      }

    case LOGOUT_SUCCESS:
      return initialState

    default:
      return state
  }
}
