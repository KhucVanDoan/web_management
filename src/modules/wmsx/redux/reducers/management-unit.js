import {
  CREATE_MANAGEMENT_UNIT_FAILED,
  CREATE_MANAGEMENT_UNIT_START,
  CREATE_MANAGEMENT_UNIT_SUCCESS,
  DELETE_MANAGEMENT_UNIT_FAILED,
  DELETE_MANAGEMENT_UNIT_START,
  DELETE_MANAGEMENT_UNIT_SUCCESS,
  GET_MANAGEMENT_UNIT_FAILED,
  GET_MANAGEMENT_UNIT_START,
  GET_MANAGEMENT_UNIT_SUCCESS,
  SEARCH_MANAGEMENT_UNIT_FAILED,
  SEARCH_MANAGEMENT_UNIT_START,
  SEARCH_MANAGEMENT_UNIT_SUCCESS,
  UPDATE_MANAGEMENT_UNIT_FAILED,
  UPDATE_MANAGEMENT_UNIT_START,
  UPDATE_MANAGEMENT_UNIT_SUCCESS,
  CONFIRM_UNIT_MANAGEMENT_FAILED,
  CONFIRM_UNIT_MANAGEMENT_START,
  CONFIRM_UNIT_MANAGEMENT_SUCCESS,
  REJECT_UNIT_MANAGEMENT_FAILED,
  REJECT_UNIT_MANAGEMENT_START,
  REJECT_UNIT_MANAGEMENT_SUCCESS,
  GET_DEPARTMENT_ASSIGN_DETAILS_FAILED,
  GET_DEPARTMENT_ASSIGN_DETAILS_START,
  GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS,
  RESET_DEPARTMENT_ASSIGN_DETAILS_STATE,
  RESET_MANAGEMENT_UNIT_STATE,
} from '~/modules/wmsx/redux/actions/management-unit'

const initialState = {
  isLoading: false,
  managementUnitList: [],
  detailManagementUnit: {},
  departmentAssign: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function managementUnit(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MANAGEMENT_UNIT_START:
    case CREATE_MANAGEMENT_UNIT_START:
    case UPDATE_MANAGEMENT_UNIT_START:
    case DELETE_MANAGEMENT_UNIT_START:
    case GET_MANAGEMENT_UNIT_START:
    case CONFIRM_UNIT_MANAGEMENT_START:
    case REJECT_UNIT_MANAGEMENT_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_MANAGEMENT_UNIT_SUCCESS:
      return {
        ...state,
        managementUnitList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }

    case SEARCH_MANAGEMENT_UNIT_FAILED:
    case CREATE_MANAGEMENT_UNIT_SUCCESS:
    case CREATE_MANAGEMENT_UNIT_FAILED:
    case UPDATE_MANAGEMENT_UNIT_SUCCESS:
    case UPDATE_MANAGEMENT_UNIT_FAILED:
    case DELETE_MANAGEMENT_UNIT_SUCCESS:
    case DELETE_MANAGEMENT_UNIT_FAILED:
    case GET_MANAGEMENT_UNIT_FAILED:
    case CONFIRM_UNIT_MANAGEMENT_SUCCESS:
    case CONFIRM_UNIT_MANAGEMENT_FAILED:
    case REJECT_UNIT_MANAGEMENT_SUCCESS:
    case REJECT_UNIT_MANAGEMENT_FAILED:
    case GET_DEPARTMENT_ASSIGN_DETAILS_START:
    case GET_DEPARTMENT_ASSIGN_DETAILS_FAILED:
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
    case GET_MANAGEMENT_UNIT_SUCCESS:
      return {
        ...state,
        detailManagementUnit: action.payload,
        isLoading: false,
      }
    case RESET_MANAGEMENT_UNIT_STATE:
      return {
        ...state,
        detailManagementUnit: {},
      }
    case RESET_DEPARTMENT_ASSIGN_DETAILS_STATE:
      return {
        ...state,
        departmentAssign: {},
      }
    default:
      return state
  }
}
