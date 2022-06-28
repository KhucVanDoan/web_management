import {
  SEARCH_BLOCK_ITEMS_FAILED,
  SEARCH_BLOCK_ITEMS_START,
  SEARCH_BLOCK_ITEMS_SUCCESS,
  CLOSE_BLOCK_ITEM_FAILED,
  CLOSE_BLOCK_ITEM_START,
  CLOSE_BLOCK_ITEM_SUCCESS,
  CREATE_BLOCK_ITEM_FAILED,
  CREATE_BLOCK_ITEM_START,
  CREATE_BLOCK_ITEM_SUCCESS,
  DELETE_BLOCK_ITEM_FAILED,
  DELETE_BLOCK_ITEM_START,
  DELETE_BLOCK_ITEM_SUCCESS,
  GET_BLOCK_ITEM_DETAIL_FAILED,
  GET_BLOCK_ITEM_DETAIL_START,
  GET_BLOCK_ITEM_DETAIL_SUCCESS,
  OPEN_BLOCK_ITEM_FAILED,
  OPEN_BLOCK_ITEM_START,
  OPEN_BLOCK_ITEM_SUCCESS,
  SEARCH_BLOCK_LOCATIONS_FAILED,
  SEARCH_BLOCK_LOCATIONS_START,
  SEARCH_BLOCK_LOCATIONS_SUCCESS,
  CLOSE_BLOCK_LOCATION_FAILED,
  CLOSE_BLOCK_LOCATION_START,
  CLOSE_BLOCK_LOCATION_SUCCESS,
  CREATE_BLOCK_LOCATION_FAILED,
  CREATE_BLOCK_LOCATION_START,
  CREATE_BLOCK_LOCATION_SUCCESS,
  DELETE_BLOCK_LOCATION_FAILED,
  DELETE_BLOCK_LOCATION_START,
  DELETE_BLOCK_LOCATION_SUCCESS,
  GET_BLOCK_LOCATION_DETAIL_FAILED,
  GET_BLOCK_LOCATION_DETAIL_START,
  GET_BLOCK_LOCATION_DETAIL_SUCCESS,
  OPEN_BLOCK_LOCATION_FAILED,
  OPEN_BLOCK_LOCATION_START,
  OPEN_BLOCK_LOCATION_SUCCESS,
  GET_DESIGN_BY_WAREHOUSE_FAILED,
  GET_DESIGN_BY_WAREHOUSE_START,
  GET_DESIGN_BY_WAREHOUSE_SUCCESS,
} from '../actions/block-item-location'

const initialState = {
  isLoadingBlockItem: false,
  isLoadingBlockLocation: false,
  blockItemList: [],
  blockItemDetail: {},
  totalBlockItem: 0,
  blockLocationList: [],
  blockLocationDetail: {},
  totalBlockLocation: 0,
  designList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function blockItemLocation(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BLOCK_ITEMS_START:
    case CLOSE_BLOCK_ITEM_START:
    case CREATE_BLOCK_ITEM_START:
    case DELETE_BLOCK_ITEM_START:
    case GET_BLOCK_ITEM_DETAIL_START:
    case OPEN_BLOCK_ITEM_START:
      return {
        ...state,
        isLoadingBlockItem: true,
      }
    case SEARCH_BLOCK_ITEMS_SUCCESS:
      return {
        ...state,
        blockItemList: action.payload.list,
        isLoadingBlockItem: false,
        totalBlockItem: action.payload.total,
      }
    case GET_BLOCK_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        blockItemDetail: action.payload,
        isLoadingBlockItem: false,
        totalBlockItem: action.payload.total,
      }
    case SEARCH_BLOCK_ITEMS_FAILED:
    case CLOSE_BLOCK_ITEM_FAILED:
    case CLOSE_BLOCK_ITEM_SUCCESS:
    case CREATE_BLOCK_ITEM_FAILED:
    case CREATE_BLOCK_ITEM_SUCCESS:
    case DELETE_BLOCK_ITEM_FAILED:
    case DELETE_BLOCK_ITEM_SUCCESS:
    case GET_BLOCK_ITEM_DETAIL_FAILED:
    case OPEN_BLOCK_ITEM_FAILED:
    case OPEN_BLOCK_ITEM_SUCCESS:
      return {
        ...state,
        isLoadingBlockItem: false,
      }
    case SEARCH_BLOCK_LOCATIONS_START:
    case CLOSE_BLOCK_LOCATION_START:
    case CREATE_BLOCK_LOCATION_START:
    case DELETE_BLOCK_LOCATION_START:
    case GET_BLOCK_LOCATION_DETAIL_START:
    case OPEN_BLOCK_LOCATION_START:
    case GET_DESIGN_BY_WAREHOUSE_START:
      return {
        ...state,
        isLoadingBlockLocation: true,
      }
    case SEARCH_BLOCK_LOCATIONS_SUCCESS:
      return {
        ...state,
        blockLocationList: action.payload.list,
        isLoadingBlockLocation: false,
        totalBlockLocation: action.payload.total,
      }
    case GET_BLOCK_LOCATION_DETAIL_SUCCESS:
      return {
        ...state,
        blockLocationDetail: action.payload,
        isLoadingBlockLocation: false,
        totalBlockLocation: action.payload.total,
      }
    case SEARCH_BLOCK_LOCATIONS_FAILED:
    case CLOSE_BLOCK_LOCATION_FAILED:
    case CLOSE_BLOCK_LOCATION_SUCCESS:
    case CREATE_BLOCK_LOCATION_FAILED:
    case CREATE_BLOCK_LOCATION_SUCCESS:
    case DELETE_BLOCK_LOCATION_FAILED:
    case DELETE_BLOCK_LOCATION_SUCCESS:
    case GET_BLOCK_LOCATION_DETAIL_FAILED:
    case OPEN_BLOCK_LOCATION_FAILED:
    case OPEN_BLOCK_LOCATION_SUCCESS:
      return {
        ...state,
        isLoadingBlockLocation: false,
      }
    case GET_DESIGN_BY_WAREHOUSE_SUCCESS:
      return {
        ...state,
        designList: action.payload,
        isLoadingBlockLocation: false,
      }
    case GET_DESIGN_BY_WAREHOUSE_FAILED:
      return {
        ...state,
        designList: [],
        isLoadingBlockLocation: false,
      }
    default:
      return state
  }
}
