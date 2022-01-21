import {
  CREATE_INVENTORY_LIMIT_FAILED,
  CREATE_INVENTORY_LIMIT_START,
  CREATE_INVENTORY_LIMIT_SUCCESS,
  DELETE_INVENTORY_LIMIT_FAILED,
  DELETE_INVENTORY_LIMIT_START,
  DELETE_INVENTORY_LIMIT_SUCCESS,
  GET_INVENTORY_LIMIT_DETAILS_FAILED,
  GET_INVENTORY_LIMIT_DETAILS_START,
  GET_INVENTORY_LIMIT_DETAILS_SUCCESS,
  SEARCH_INVENTORY_LIMITS_FAILED,
  SEARCH_INVENTORY_LIMITS_START,
  SEARCH_INVENTORY_LIMITS_SUCCESS,
  UPDATE_INVENTORY_LIMIT_FAILED,
  UPDATE_INVENTORY_LIMIT_START,
  UPDATE_INVENTORY_LIMIT_SUCCESS,
} from 'modules/mesx/redux/actions/inventory-limit.action'

const initialState = {
  isLoading: false,
  inventoryLimitList: [],
  inventoryLimitDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventoryLimitSetting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INVENTORY_LIMITS_START:
    case CREATE_INVENTORY_LIMIT_START:
    case UPDATE_INVENTORY_LIMIT_START:
    case DELETE_INVENTORY_LIMIT_START:
    case GET_INVENTORY_LIMIT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_INVENTORY_LIMITS_SUCCESS:
      return {
        ...state,
        inventoryLimitList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_INVENTORY_LIMITS_FAILED:
    case CREATE_INVENTORY_LIMIT_SUCCESS:
    case CREATE_INVENTORY_LIMIT_FAILED:
    case UPDATE_INVENTORY_LIMIT_SUCCESS:
    case UPDATE_INVENTORY_LIMIT_FAILED:
    case DELETE_INVENTORY_LIMIT_SUCCESS:
    case DELETE_INVENTORY_LIMIT_FAILED:
    case GET_INVENTORY_LIMIT_DETAILS_FAILED:
      return {
        ...state,
        inventoryLimitDetails: {},
        isLoading: false,
      }
    case GET_INVENTORY_LIMIT_DETAILS_SUCCESS:
      return {
        ...state,
        inventoryLimitDetails: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}
