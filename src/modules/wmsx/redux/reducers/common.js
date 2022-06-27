import {
  WMSX_GET_ITEMS_START,
  WMSX_GET_ITEMS_SUCCESS,
  WMSX_GET_ITEMS_FAILED,
  WMSX_GET_PACKAGES_START,
  WMSX_GET_PACKAGES_SUCCESS,
  WMSX_GET_PACKAGES_FAILED,
  WMSX_GET_BLOCKS_START,
  WMSX_GET_BLOCKS_SUCCESS,
  WMSX_GET_BLOCKS_FAILED,
  WMSX_GET_WAREHOUSES_START,
  WMSX_GET_WAREHOUSES_SUCCESS,
  WMSX_GET_WAREHOUSES_FAILED,
  WMSX_GET_ITEM_QUALITY_POINT_START,
  WMSX_GET_ITEM_QUALITY_POINT_FAILED,
  WMSX_GET_ITEM_QUALITY_POINT_SUCCESS,
  WMSX_GET_ALL_SUPPLY_REQUEST_START,
  WMSX_GET_ALL_SUPPLY_REQUEST_SUCCESS,
  WMSX_GET_ALL_SUPPLY_REQUEST_FAILED,
  WMSX_GET_TYPE_SERVICES_START,
  WMSX_GET_TYPE_SERVICES_SUCCESS,
  WMSX_GET_TYPE_SERVICES_FAILED,
  GET_MO_MATERIAL_PLAN_DETAIL_START,
  GET_MO_MATERIAL_PLAN_DETAIL_SUCCESS,
  GET_MO_MATERIAL_PLAN_DETAIL_FAILED,
  GET_PALLETS_START,
  GET_PALLETS_SUCCESS,
  GET_PALLETS_FAILED,
} from '~/modules/wmsx/redux/actions/common'

const initialState = {
  isLoading: false,
  itemList: [],
  packageList: [],
  blockList: [],
  warehouseList: [],
  itemQualityPoint: [],
  supplyRequestList: [],
  typeServiceList: [],
  multipleMessage: '',
  materialPlanDetail: {},
  palletList: [],
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
    case WMSX_GET_PACKAGES_START:
    case WMSX_GET_BLOCKS_START:
    case WMSX_GET_TYPE_SERVICES_START:
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
    case WMSX_GET_PACKAGES_SUCCESS:
      return {
        ...state,
        packageList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_PACKAGES_FAILED:
      return {
        ...state,
        packageList: [],
        isLoading: false,
      }
    case WMSX_GET_BLOCKS_SUCCESS:
      return {
        ...state,
        blockList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_BLOCKS_FAILED:
      return {
        ...state,
        blockList: [],
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
    case WMSX_GET_TYPE_SERVICES_SUCCESS:
      return {
        ...state,
        typeServiceList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_TYPE_SERVICES_FAILED:
      return {
        ...state,
        typeServiceList: [],
        isLoading: false,
      }
    case GET_MO_MATERIAL_PLAN_DETAIL_START:
    case GET_MO_MATERIAL_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        materialPlanDetail: action.payload,
      }
    case GET_MO_MATERIAL_PLAN_DETAIL_FAILED:
      return {
        ...state,
        materialPlanDetail: {},
      }
    case GET_PALLETS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PALLETS_SUCCESS:
      return {
        ...state,
        palletList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_PALLETS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
