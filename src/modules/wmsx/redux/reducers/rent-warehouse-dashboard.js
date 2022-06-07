import {
  WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST,
  WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_FAILED,
  WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_SUCCESS,
} from '../actions/rent-warehouse-dashboard'

const initialState = {
  isLoading: false,
  list: [],
  total: 0,
}

/**
 * Rent warehouse dashboard reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function rentWarehouseDashboard(state = initialState, action) {
  switch (action.type) {
    case WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }
    case WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_FAILED:
      return {
        ...state,
        list: [],
        total: 0,
        isLoading: false,
      }
    default:
      return state
  }
}
