import {
  SEARCH_ROLE_LIST_START,
  SEARCH_ROLE_LIST_SUCCESS,
  SEARCH_ROLE_LIST_FAILED,
  UPDATE_ROLE_ASSIGN_FAILED,
  UPDATE_ROLE_ASSIGN_START,
  UPDATE_ROLE_ASSIGN_SUCCESS,
  GET_ROLE_ASSIGN_DETAILS_FAILED,
  GET_ROLE_ASSIGN_DETAILS_START,
  GET_ROLE_ASSIGN_DETAILS_SUCCESS,
  RESET_ROLE_ASSIGN_DETAILS_STATE,
} from '~/modules/configuration/redux/actions/role-list'

const initialState = {
  isLoading: false,
  roleList: [],
  total: null,
  roleAssign: [],
}

export default function roleList(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ROLE_LIST_START:
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
    case GET_ROLE_ASSIGN_DETAILS_START:
    case UPDATE_ROLE_ASSIGN_START:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ROLE_ASSIGN_DETAILS_SUCCESS:
      return {
        ...state,
        roleAssign: action.payload?.items,
        total: action.payload.meta.total,
        isLoading: false,
      }
    case GET_ROLE_ASSIGN_DETAILS_FAILED:
    case UPDATE_ROLE_ASSIGN_FAILED:
      return {
        ...state,
        roleAssign: [],
        isLoading: false,
      }
    case UPDATE_ROLE_ASSIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_ROLE_ASSIGN_DETAILS_STATE:
      return {
        ...state,
        roleAssign: [],
      }
    default:
      return state
  }
}
