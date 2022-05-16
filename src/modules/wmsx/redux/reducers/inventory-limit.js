import {
  WMSX_CREATE_INVENTORY_LIMIT_FAILED,
  WMSX_CREATE_INVENTORY_LIMIT_START,
  WMSX_CREATE_INVENTORY_LIMIT_SUCCESS,
  WMSX_DELETE_INVENTORY_LIMIT_FAILED,
  WMSX_DELETE_INVENTORY_LIMIT_START,
  WMSX_DELETE_INVENTORY_LIMIT_SUCCESS,
  WMSX_GET_INVENTORY_LIMIT_DETAILS_FAILED,
  WMSX_GET_INVENTORY_LIMIT_DETAILS_START,
  WMSX_GET_INVENTORY_LIMIT_DETAILS_SUCCESS,
  WMSX_RESET_INVENTORY_LIMIT_DETAIL_STATE,
  WMSX_SEARCH_INVENTORY_LIMITS_FAILED,
  WMSX_SEARCH_INVENTORY_LIMITS_START,
  WMSX_SEARCH_INVENTORY_LIMITS_SUCCESS,
  WMSX_UPDATE_INVENTORY_LIMIT_FAILED,
  WMSX_UPDATE_INVENTORY_LIMIT_START,
  WMSX_UPDATE_INVENTORY_LIMIT_SUCCESS,
} from '../actions/inventory-limit'

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
    case WMSX_SEARCH_INVENTORY_LIMITS_START:
    case WMSX_CREATE_INVENTORY_LIMIT_START:
    case WMSX_UPDATE_INVENTORY_LIMIT_START:
    case WMSX_DELETE_INVENTORY_LIMIT_START:
    case WMSX_GET_INVENTORY_LIMIT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_INVENTORY_LIMITS_SUCCESS:
      return {
        ...state,
        inventoryLimitList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_SEARCH_INVENTORY_LIMITS_FAILED:
    case WMSX_CREATE_INVENTORY_LIMIT_SUCCESS:
    case WMSX_CREATE_INVENTORY_LIMIT_FAILED:
    case WMSX_UPDATE_INVENTORY_LIMIT_SUCCESS:
    case WMSX_UPDATE_INVENTORY_LIMIT_FAILED:
    case WMSX_DELETE_INVENTORY_LIMIT_SUCCESS:
    case WMSX_DELETE_INVENTORY_LIMIT_FAILED:
    case WMSX_GET_INVENTORY_LIMIT_DETAILS_FAILED:
      return {
        ...state,
        inventoryLimitDetails: {},
        isLoading: false,
      }
    case WMSX_GET_INVENTORY_LIMIT_DETAILS_SUCCESS:
      return {
        ...state,
        inventoryLimitDetails: action.payload,
        isLoading: false,
      }
    case WMSX_RESET_INVENTORY_LIMIT_DETAIL_STATE:
      return {
        ...state,
        inventoryLimitDetails: {},
      }
    default:
      return state
  }
}
