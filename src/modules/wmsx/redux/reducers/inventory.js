import {
  WMSX_SEARCH_INVENTORY_FAILED,
  WMSX_SEARCH_INVENTORY_START,
  WMSX_SEARCH_INVENTORY_SUCCESS,
  WMSX_INVENTORY_DETAIL_FAILED,
  WMSX_INVENTORY_DETAIL_SUCCESS,
  WMSX_INVENTORY_DETAIL_START,
  WMSX_GET_WAREHOUSE_TYPE_FAILED,
  WMSX_GET_WAREHOUSE_TYPE_START,
  WMSX_GET_WAREHOUSE_TYPE_SUCCESS,
  RESET_INVENTORY_DETAILS_STATE,
  WMSX_APPROVE_INVENTORY_START,
  WMSX_APPROVE_INVENTORY_SUCCESS,
  WMSX_APPROVE_INVENTORY_FAILED,
  APPROVE_INVENTORY_FAILED_TO_GET_DATA,
} from '~/modules/wmsx/redux/actions/inventory'

const initialState = {
  isLoading: false,
  inventoryStatistic: [],
  inventoryStatisticDetail: {},
  warehouseType: [],
  data: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventory(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_INVENTORY_START:
    case WMSX_INVENTORY_DETAIL_START:
    case WMSX_GET_WAREHOUSE_TYPE_START:
    case WMSX_APPROVE_INVENTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_GET_WAREHOUSE_TYPE_SUCCESS:
      return {
        ...state,
        warehouseType: action.payload,
        isLoading: false,
      }
    case WMSX_SEARCH_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryStatistic: action.payload?.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_INVENTORY_DETAIL_SUCCESS:
      return {
        ...state,
        inventoryStatisticDetail: action.payload,
        isLoading: false,
      }
    case WMSX_SEARCH_INVENTORY_FAILED:
    case WMSX_INVENTORY_DETAIL_FAILED:
    case WMSX_GET_WAREHOUSE_TYPE_FAILED:
    case WMSX_APPROVE_INVENTORY_SUCCESS:
    case WMSX_APPROVE_INVENTORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_INVENTORY_DETAILS_STATE:
      return {
        ...state,
        inventoryStatistic: [],
        inventoryStatisticDetail: {},
        warehouseType: [],
      }
    case APPROVE_INVENTORY_FAILED_TO_GET_DATA:
      return {
        ...state,
        isLoading: false,
        data: action.data,
      }
    default:
      return state
  }
}
