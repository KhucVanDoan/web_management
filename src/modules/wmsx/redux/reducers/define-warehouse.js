import {
  CREATE_WAREHOUSE_FAILED,
  CREATE_WAREHOUSE_START,
  CREATE_WAREHOUSE_SUCCESS,
  DELETE_WAREHOUSE_FAILED,
  DELETE_WAREHOUSE_START,
  DELETE_WAREHOUSE_SUCCESS,
  GET_WAREHOUSE_DETAILS_FAILED,
  GET_WAREHOUSE_DETAILS_START,
  GET_WAREHOUSE_DETAILS_SUCCESS,
  SEARCH_WAREHOUSE_FAILED,
  SEARCH_WAREHOUSE_START,
  SEARCH_WAREHOUSE_SUCCESS,
  UPDATE_WAREHOUSE_FAILED,
  UPDATE_WAREHOUSE_START,
  UPDATE_WAREHOUSE_SUCCESS,
  CONFIRM_WAREHOUSE_FAILED,
  CONFIRM_WAREHOUSE_START,
  CONFIRM_WAREHOUSE_SUCCESS,
  REJECT_WAREHOUSE_FAILED,
  REJECT_WAREHOUSE_START,
  REJECT_WAREHOUSE_SUCCESS,
  RESET_WAREHOUSE_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-warehouse'

const initialState = {
  isLoading: false,
  warehouseList: [],
  warehouseDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineWarehouse(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WAREHOUSE_START:
    case CREATE_WAREHOUSE_START:
    case UPDATE_WAREHOUSE_START:
    case DELETE_WAREHOUSE_START:
    case CONFIRM_WAREHOUSE_START:
    case REJECT_WAREHOUSE_START:
    case GET_WAREHOUSE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouseList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_WAREHOUSE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_WAREHOUSE_FAILED:
    case CONFIRM_WAREHOUSE_SUCCESS:
    case REJECT_WAREHOUSE_FAILED:
    case REJECT_WAREHOUSE_SUCCESS:
    case CREATE_WAREHOUSE_SUCCESS:
    case CREATE_WAREHOUSE_FAILED:
    case UPDATE_WAREHOUSE_SUCCESS:
    case UPDATE_WAREHOUSE_FAILED:
    case DELETE_WAREHOUSE_SUCCESS:
    case DELETE_WAREHOUSE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_WAREHOUSE_DETAILS_SUCCESS:
      return {
        ...state,
        warehouseDetails: action.payload,
        isLoading: false,
      }
    case GET_WAREHOUSE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_WAREHOUSE_DETAILS_STATE:
      return {
        ...state,
        warehouseDetails: {},
      }
    default:
      return state
  }
}
