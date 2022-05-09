import {
  WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_FAILED,
  WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_START,
  WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_SUCCESS,
  WMSX_RESET_WAREHOUSE_TRANSFER_MOVEMENT_DETAIL_STATE,
  WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_FAILED,
  WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_START,
  WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_SUCCESS,
} from '~/modules/wmsx/redux/actions/warehouse-transfer-movements'

const initialState = {
  isLoading: false,
  warehouseTransferMovementList: [],
  warehouseTransferMovementDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function warehouseTransferMovements(
  state = initialState,
  action,
) {
  switch (action.type) {
    case WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_START:
    case WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_SUCCESS:
      return {
        ...state,
        warehouseTransferMovementList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        warehouseTransferMovementDetail: action.payload,
      }
    case WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        warehouseTransferMovementDetail: {},
      }
    case WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_FAILED:
      return {
        ...state,
        warehouseTransferMovementList: [],
        isLoading: false,
        total: 0,
      }
    case WMSX_RESET_WAREHOUSE_TRANSFER_MOVEMENT_DETAIL_STATE:
      return {
        ...state,
        warehouseTransferMovementDetail: {},
      }
    default:
      return state
  }
}
