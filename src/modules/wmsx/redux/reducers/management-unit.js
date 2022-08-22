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
  RESET_MANAGEMENT_UNIT_STATE,
} from '~/modules/wmsx/redux/actions/management-unit'

const initialState = {
  isLoading: false,
  managementUnitList: [],
  detailManagementUnit: {},
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
      return {
        ...state,
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
    default:
      return state
  }
}
