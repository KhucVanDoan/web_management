import {
  WMSX_GET_WAREHOUSE_EXPORT_DETAILS_FAILED,
  WMSX_GET_WAREHOUSE_EXPORT_DETAILS_START,
  WMSX_GET_WAREHOUSE_EXPORT_DETAILS_SUCCESS,
  WMSX_SEARCH_WAREHOUSE_EXPORT_FAILED,
  WMSX_SEARCH_WAREHOUSE_EXPORT_START,
  WMSX_SEARCH_WAREHOUSE_EXPORT_SUCCESS,
  WMSX_RESET_WAREHOUSE_EXPORT_DETAILs_STATE,
} from '~/modules/wmsx/redux/actions/warehouse-export'

const initialState = {
  isLoading: false,
  warehouseExportList: [],
  warehouseExportDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function movementManagement(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_WAREHOUSE_EXPORT_START:
    case WMSX_GET_WAREHOUSE_EXPORT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_WAREHOUSE_EXPORT_SUCCESS:
      return {
        ...state,
        warehouseExportList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_GET_WAREHOUSE_EXPORT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        warehouseExportDetail: action.payload,
      }
    case WMSX_GET_WAREHOUSE_EXPORT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        warehouseExportDetail: {},
      }
    case WMSX_SEARCH_WAREHOUSE_EXPORT_FAILED:
      return {
        ...state,
        warehouseExportList: [],
        isLoading: false,
        total: 0,
      }
    case WMSX_RESET_WAREHOUSE_EXPORT_DETAILs_STATE:
      return {
        ...state,
        warehouseExportDetail: {},
      }
    default:
      return state
  }
}
