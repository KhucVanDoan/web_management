import {
  WMSX_SEARCH_INVENTORIES_STATISTICS_FAILED,
  WMSX_SEARCH_INVENTORIES_STATISTICS_START,
  WMSX_SEARCH_INVENTORIES_STATISTICS_SUCCESS,
  WMSX_UPDATE_INVENTORIES_STATISTICS_FAILED,
  WMSX_UPDATE_INVENTORIES_STATISTICS_START,
  WMSX_UPDATE_INVENTORIES_STATISTICS_SUCCESS,
  WMSX_RESET_STATE_INVENTORIES_STATISTICS,
} from '~/modules/wmsx/redux/actions/inventory-statistics'

const initialState = {
  isLoading: false,
  inventoryStatisticList: [],
  inventoryDetail: {},
  totalStock: null,
  totalCost: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventoryStatistics(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_INVENTORIES_STATISTICS_START:
    case WMSX_UPDATE_INVENTORIES_STATISTICS_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_INVENTORIES_STATISTICS_SUCCESS:
      return {
        ...state,
        inventoryStatisticList: action.payload?.list,
        isLoading: false,
        total: action.payload.total,
        totalStock: action.payload?.totalStock,
        totalCost: action.payload?.totalCost,
      }
    case WMSX_SEARCH_INVENTORIES_STATISTICS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_UPDATE_INVENTORIES_STATISTICS_SUCCESS:
    case WMSX_UPDATE_INVENTORIES_STATISTICS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_RESET_STATE_INVENTORIES_STATISTICS:
      return {
        ...state,
        inventoryStatisticList: [],
      }
    default:
      return state
  }
}
