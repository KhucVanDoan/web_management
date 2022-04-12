import {
  UPDATE_USER_PERMISSION_FAILED,
  UPDATE_USER_PERMISSION_START,
  UPDATE_USER_PERMISSION_SUCCESS,
  GET_USER_PERMISSION_DETAILS_FAILED,
  GET_USER_PERMISSION_DETAILS_START,
  GET_USER_PERMISSION_DETAILS_SUCCESS,
  RESET_USER_PERMISSION_DETAILS_STATE,
} from '~/modules/mesx/redux/actions/user-permission'

const initialState = {
  isLoading: false,
  roleDetail: [],
}

/**
 * reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function userPermission(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PERMISSION_DETAILS_START:
    case UPDATE_USER_PERMISSION_START:
      return {
        ...state,
        isLoading: false,
      }
    case GET_USER_PERMISSION_DETAILS_SUCCESS:
      return {
        ...state,
        roleDetail: action.payload,
        isLoading: false,
      }
    case GET_USER_PERMISSION_DETAILS_FAILED:
    case UPDATE_USER_PERMISSION_FAILED:
      return {
        ...state,
        roleDetail: [],
        isLoading: false,
      }
    case UPDATE_USER_PERMISSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_USER_PERMISSION_DETAILS_STATE:
      return {
        ...state,
        roleDetail: [],
      }
    default:
      return state
  }
}
