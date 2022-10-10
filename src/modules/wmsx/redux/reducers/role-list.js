import {
  SEARCH_ROLE_LIST_START,
  SEARCH_ROLE_LIST_SUCCESS,
  SEARCH_ROLE_LIST_FAILED,
  CREATE_ROLE_FAILED,
  CREATE_ROLE_START,
  CREATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  UPDATE_ROLE_START,
  UPDATE_ROLE_SUCCESS,
  GET_ROLE_DETAIL_FAILED,
  GET_ROLE_DETAIL_START,
  GET_ROLE_DETAIL_SUCCESS,
  RESET_ROLE_STATE,
  DELETE_ROLE_FAILED,
  DELETE_ROLE_START,
  DELETE_ROLE_SUCCESS,
} from '~/modules/wmsx/redux/actions/role-list'

const initialState = {
  isLoading: false,
  roleList: [],
  total: null,
  roleDetails: {},
}

export default function roleList(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ROLE_LIST_START:
    case CREATE_ROLE_START:
    case UPDATE_ROLE_START:
    case GET_ROLE_DETAIL_START:
    case DELETE_ROLE_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ROLE_LIST_SUCCESS:
      return {
        ...state,
        roleList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_ROLE_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_ROLE_SUCCESS:
    case CREATE_ROLE_FAILED:
    case UPDATE_ROLE_SUCCESS:
    case UPDATE_ROLE_FAILED:
    case DELETE_ROLE_SUCCESS:
    case DELETE_ROLE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ROLE_DETAIL_SUCCESS:
      return {
        ...state,
        roleDetails: action.payload,
        isLoading: false,
      }
    case GET_ROLE_DETAIL_FAILED:
    case RESET_ROLE_STATE:
      return {
        ...state,
        roleDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
