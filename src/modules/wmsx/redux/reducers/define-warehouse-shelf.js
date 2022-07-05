import {
  SEARCH_DEFINE_WAREHOUSE_SHELF_START,
  SEARCH_DEFINE_WAREHOUSE_SHELF_SUCCESS,
  SEARCH_DEFINE_WAREHOUSE_SHELF_FAILED,
  GET_DEFINE_WAREHOUSE_SHELF_START,
  GET_DEFINE_WAREHOUSE_SHELF_SUCCESS,
  GET_DEFINE_WAREHOUSE_SHELF_FAILED,
  RESET_STATE_WAREHOUSE_SHELF,
} from '../actions/define-warehouse-shelf'

const initialState = {
  isLoading: false,
  defineWarehouseShelfList: [],
  defineWarehouseShelfDetail: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */

export default function defineWarehouseShelf(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEFINE_WAREHOUSE_SHELF_START:
    case GET_DEFINE_WAREHOUSE_SHELF_START:
      return {
        ...state,
        isLoading: false,
      }
    case SEARCH_DEFINE_WAREHOUSE_SHELF_SUCCESS:
      return {
        ...state,
        defineWarehouseShelfList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_DEFINE_WAREHOUSE_SHELF_FAILED:
    case GET_DEFINE_WAREHOUSE_SHELF_FAILED:
      return {
        ...state,
        defineWarehouseShelfDetail: {},
        isLoading: false,
      }
    case GET_DEFINE_WAREHOUSE_SHELF_SUCCESS:
      return {
        ...state,
        defineWarehouseShelfDetail: action.payload,
        isLoading: false,
      }
    case RESET_STATE_WAREHOUSE_SHELF:
      return {
        ...state,
        defineWarehouseShelfDetail: {},
      }
    default:
      return state
  }
}
