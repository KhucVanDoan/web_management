import {
  SEARCH_WAREHOUSE_AREAS_FAILED,
  SEARCH_WAREHOUSE_AREAS_START,
  SEARCH_WAREHOUSE_AREAS_SUCCESS,
  GET_WAREHOUSE_AREA_DETAIL_FAILED,
  GET_WAREHOUSE_AREA_DETAIL_START,
  GET_WAREHOUSE_AREA_DETAIL_SUCCESS,
} from '../actions/warehouse-area'

const initialState = {
  isLoading: false,
  warehouseAreaList: [],
  warehouseAreaDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function warehouseArea(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WAREHOUSE_AREAS_START:
    case GET_WAREHOUSE_AREA_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_WAREHOUSE_AREAS_SUCCESS:
      return {
        ...state,
        warehouseAreaList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_WAREHOUSE_AREAS_FAILED:
      return {
        ...state,
        warehouseAreaList: [],
        isLoading: false,
        total: 0,
      }
    case GET_WAREHOUSE_AREA_DETAIL_SUCCESS:
      return {
        ...state,
        warehouseAreaDetails: action.payload,
        isLoading: false,
      }

    case GET_WAREHOUSE_AREA_DETAIL_FAILED:
      return {
        ...state,
        warehouseAreaDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
