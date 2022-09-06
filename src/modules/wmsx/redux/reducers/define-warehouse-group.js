import {
  CREATE_WAREHOUSE_GROUP_FAILED,
  CREATE_WAREHOUSE_GROUP_START,
  CREATE_WAREHOUSE_GROUP_SUCCESS,
  DELETE_WAREHOUSE_GROUP_FAILED,
  DELETE_WAREHOUSE_GROUP_START,
  DELETE_WAREHOUSE_GROUP_SUCCESS,
  GET_WAREHOUSE_GROUP_DETAILS_FAILED,
  GET_WAREHOUSE_GROUP_DETAILS_START,
  GET_WAREHOUSE_GROUP_DETAILS_SUCCESS,
  SEARCH_WAREHOUSE_GROUP_FAILED,
  SEARCH_WAREHOUSE_GROUP_START,
  SEARCH_WAREHOUSE_GROUP_SUCCESS,
  UPDATE_WAREHOUSE_GROUP_FAILED,
  UPDATE_WAREHOUSE_GROUP_START,
  UPDATE_WAREHOUSE_GROUP_SUCCESS,
  CONFIRM_WAREHOUSE_GROUP_FAILED,
  CONFIRM_WAREHOUSE_GROUP_START,
  CONFIRM_WAREHOUSE_GROUP_SUCCESS,
  REJECT_WAREHOUSE_GROUP_FAILED,
  REJECT_WAREHOUSE_GROUP_START,
  REJECT_WAREHOUSE_GROUP_SUCCESS,
  RESET_WAREHOUSE_GROUP_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-warehouse-group'

const initialState = {
  isLoading: false,
  warehouseGroupList: [],
  warehouseGroupDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineWarehouseGroup(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WAREHOUSE_GROUP_START:
    case CREATE_WAREHOUSE_GROUP_START:
    case UPDATE_WAREHOUSE_GROUP_START:
    case DELETE_WAREHOUSE_GROUP_START:
    case CONFIRM_WAREHOUSE_GROUP_START:
    case REJECT_WAREHOUSE_GROUP_START:
    case GET_WAREHOUSE_GROUP_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WAREHOUSE_GROUP_SUCCESS:
      return {
        ...state,
        warehouseGroupList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_WAREHOUSE_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_WAREHOUSE_GROUP_FAILED:
    case CONFIRM_WAREHOUSE_GROUP_SUCCESS:
    case REJECT_WAREHOUSE_GROUP_FAILED:
    case REJECT_WAREHOUSE_GROUP_SUCCESS:
    case CREATE_WAREHOUSE_GROUP_SUCCESS:
    case CREATE_WAREHOUSE_GROUP_FAILED:
    case UPDATE_WAREHOUSE_GROUP_SUCCESS:
    case UPDATE_WAREHOUSE_GROUP_FAILED:
    case DELETE_WAREHOUSE_GROUP_SUCCESS:
    case DELETE_WAREHOUSE_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_WAREHOUSE_GROUP_DETAILS_SUCCESS:
      return {
        ...state,
        warehouseGroupDetails: action.payload,
        isLoading: false,
      }
    case GET_WAREHOUSE_GROUP_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_WAREHOUSE_GROUP_DETAILS_STATE:
      return {
        ...state,
        warehouseGroupDetails: {},
      }
    default:
      return state
  }
}
