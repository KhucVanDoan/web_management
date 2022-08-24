import {
  SEARCH_DEPARTMENT_LIST_START,
  SEARCH_DEPARTMENT_LIST_SUCCESS,
  SEARCH_DEPARTMENT_LIST_FAILED,
  UPDATE_DEPARTMENT_ASSIGN_FAILED,
  UPDATE_DEPARTMENT_ASSIGN_START,
  UPDATE_DEPARTMENT_ASSIGN_SUCCESS,
  GET_DEPARTMENT_ASSIGN_DETAILS_FAILED,
  GET_DEPARTMENT_ASSIGN_DETAILS_START,
  GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS,
  RESET_DEPARTMENT_ASSIGN_DETAILS_STATE,
} from '~/modules/configuration/redux/actions/department-list'

const initialState = {
  isLoading: false,
  departmentList: [],
  total: null,
  departmentAssign: {},
}

export default function departmentList(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEPARTMENT_LIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DEPARTMENT_LIST_SUCCESS:
      return {
        ...state,
        departmentList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_DEPARTMENT_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DEPARTMENT_ASSIGN_DETAILS_START:
    case UPDATE_DEPARTMENT_ASSIGN_START:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS:
      return {
        ...state,
        departmentAssign: action.payload,
        total: action.payload.meta.total,
        isLoading: false,
      }
    case GET_DEPARTMENT_ASSIGN_DETAILS_FAILED:
    case UPDATE_DEPARTMENT_ASSIGN_SUCCESS:
    case UPDATE_DEPARTMENT_ASSIGN_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_DEPARTMENT_ASSIGN_DETAILS_STATE:
      return {
        ...state,
        departmentAssign: [],
      }
    default:
      return state
  }
}
