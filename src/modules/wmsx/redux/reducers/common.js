import {
  WMSX_GET_ITEMS_START,
  WMSX_GET_ITEMS_SUCCESS,
  WMSX_GET_ITEMS_FAILED,
  WMSX_GET_WAREHOUSES_START,
  WMSX_GET_WAREHOUSES_SUCCESS,
  WMSX_GET_WAREHOUSES_FAILED,
  WMSX_GET_ITEM_QUALITY_POINT_START,
  WMSX_GET_ITEM_QUALITY_POINT_FAILED,
  WMSX_GET_ITEM_QUALITY_POINT_SUCCESS,
  WMSX_GET_ALL_SUPPLY_REQUEST_START,
  WMSX_GET_ALL_SUPPLY_REQUEST_SUCCESS,
  WMSX_GET_ALL_SUPPLY_REQUEST_FAILED,
} from '~/modules/wmsx/redux/actions/common'

const initialState = {
  isLoading: false,
  itemList: [],
  warehouseList: [],
  itemQualityPoint: [],
  supplyRequestList: [],
  multipleMessage: '',
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function commonManagement(state = initialState, action) {
  switch (action.type) {
    case WMSX_GET_ALL_SUPPLY_REQUEST_START:
    case WMSX_GET_ALL_SUPPLY_REQUEST_SUCCESS:
      return {
        ...state,
        supplyRequestList: action.payload.list,
      }
    case WMSX_GET_ALL_SUPPLY_REQUEST_FAILED:
      return {
        ...state,
        supplyRequestList: [],
      }
    case WMSX_GET_ITEMS_START:
    case WMSX_GET_WAREHOUSES_START:
      return {
        ...state,
        isLoading: true,
        multipleMessage: '',
      }
    case WMSX_GET_ITEMS_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_ITEMS_FAILED:
      return {
        ...state,
        itemList: [],
        isLoading: false,
      }
    case WMSX_GET_ITEM_QUALITY_POINT_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_GET_ITEM_QUALITY_POINT_SUCCESS:
      return {
        ...state,
        itemQualityPoint: action?.payload?.items,
        isLoading: false,
      }
    case WMSX_GET_ITEM_QUALITY_POINT_FAILED:
      return {
        ...state,
        itemQualityPoint: [],
        isLoading: false,
      }
    case WMSX_GET_WAREHOUSES_SUCCESS:
      return {
        ...state,
        warehouseList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_WAREHOUSES_FAILED:
      return {
        ...state,
        warehouseList: [],
        isLoading: false,
      }

    default:
      return state
  }
}
