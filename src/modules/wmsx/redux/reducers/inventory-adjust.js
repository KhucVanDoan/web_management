import {
  CONFIRM_INVENTORY_ADJUST_FAILED,
  CONFIRM_INVENTORY_ADJUST_START,
  CONFIRM_INVENTORY_ADJUST_SUCCESS,
  CREATE_INVENTORY_ADJUST_FAILED,
  CREATE_INVENTORY_ADJUST_START,
  CREATE_INVENTORY_ADJUST_SUCCESS,
  DELETE_INVENTORY_ADJUST_FAILED,
  DELETE_INVENTORY_ADJUST_START,
  DELETE_INVENTORY_ADJUST_SUCCESS,
  GET_INVENTORY_ADJUST_DETAILS_FAILED,
  GET_INVENTORY_ADJUST_DETAILS_START,
  GET_INVENTORY_ADJUST_DETAILS_SUCCESS,
  REJECT_INVENTORY_ADJUST_FAILED,
  REJECT_INVENTORY_ADJUST_START,
  REJECT_INVENTORY_ADJUST_SUCCESS,
  SEARCH_INVENTORY_ADJUST_FAILED,
  SEARCH_INVENTORY_ADJUST_START,
  SEARCH_INVENTORY_ADJUST_SUCCESS,
  UPDATE_INVENTORY_ADJUST_FAILED,
  UPDATE_INVENTORY_ADJUST_START,
  UPDATE_INVENTORY_ADJUST_SUCCESS,
  RESET_INVENTORY_ADJUST,
} from '../actions/inventory-adjust'

const initialState = {
  isLoading: false,
  inventoryAdjustList: [],
  inventoryAdjustDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventoryAdjust(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INVENTORY_ADJUST_START:
    case CREATE_INVENTORY_ADJUST_START:
    case UPDATE_INVENTORY_ADJUST_START:
    case DELETE_INVENTORY_ADJUST_START:
    case GET_INVENTORY_ADJUST_DETAILS_START:
    case CONFIRM_INVENTORY_ADJUST_START:
    case REJECT_INVENTORY_ADJUST_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_INVENTORY_ADJUST_SUCCESS:
      return {
        ...state,
        inventoryAdjustList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case CONFIRM_INVENTORY_ADJUST_FAILED:
    case CONFIRM_INVENTORY_ADJUST_SUCCESS:
    case REJECT_INVENTORY_ADJUST_FAILED:
    case REJECT_INVENTORY_ADJUST_SUCCESS:
    case SEARCH_INVENTORY_ADJUST_FAILED:
    case CREATE_INVENTORY_ADJUST_SUCCESS:
    case CREATE_INVENTORY_ADJUST_FAILED:
    case UPDATE_INVENTORY_ADJUST_SUCCESS:
    case UPDATE_INVENTORY_ADJUST_FAILED:
    case DELETE_INVENTORY_ADJUST_SUCCESS:
    case DELETE_INVENTORY_ADJUST_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_INVENTORY_ADJUST_DETAILS_SUCCESS:
      return {
        ...state,
        inventoryAdjustDetails: action.payload,
        isLoading: false,
      }
    case GET_INVENTORY_ADJUST_DETAILS_FAILED:
      return {
        ...state,
        inventoryAdjustDetails: {},
        isLoading: false,
        total: false,
      }
    case RESET_INVENTORY_ADJUST:
      return {
        ...state,
        inventoryAdjustDetails: {},
      }
    default:
      return state
  }
}
