import {
  WMSX_SEARCH_PALLETS_FAILED,
  WMSX_SEARCH_PALLETS_START,
  WMSX_SEARCH_PALLETS_SUCCESS,
  WMSX_CREATE_PALLET_FAILED,
  WMSX_CREATE_PALLET_START,
  WMSX_CREATE_PALLET_SUCCESS,
  WMSX_DELETE_PALLET_FAILED,
  WMSX_DELETE_PALLET_START,
  WMSX_DELETE_PALLET_SUCCESS,
  WMSX_GET_PALLET_DETAIL_FAILED,
  WMSX_GET_PALLET_DETAIL_START,
  WMSX_GET_PALLET_DETAIL_SUCCESS,
  WMSX_UPDATE_PALLET_FAILED,
  WMSX_UPDATE_PALLET_START,
  WMSX_UPDATE_PALLET_SUCCESS,
  WMSX_GET_PALLETS_EVEN_BY_ITEM_FAILED,
  WMSX_GET_PALLETS_EVEN_BY_ITEM_SUCCESS,
  WMSX_GET_PALLETS_EVEN_BY_ITEM_START,
  WMSX_RESET_PALLET_DETAILS_STATE,
} from '../actions/define-pallet'

const initialState = {
  isLoading: false,
  palletList: [],
  palletDetails: {},
  palletsEvenByItem: [],
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function definePallet(state = initialState, action) {
  switch (action.type) {
    case WMSX_GET_PALLETS_EVEN_BY_ITEM_START:
    case WMSX_SEARCH_PALLETS_START:
    case WMSX_GET_PALLET_DETAIL_START:
    case WMSX_CREATE_PALLET_START:
    case WMSX_UPDATE_PALLET_START:
    case WMSX_DELETE_PALLET_START:
      return {
        ...state,
        isLoading: true,
      }

    case WMSX_SEARCH_PALLETS_SUCCESS:
      return {
        ...state,
        palletList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_GET_PALLETS_EVEN_BY_ITEM_SUCCESS:
      return {
        ...state,
        palletsEvenByItem: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_GET_PALLET_DETAIL_SUCCESS:
      return {
        ...state,
        palletDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_PALLET_DETAIL_FAILED:
    case WMSX_CREATE_PALLET_SUCCESS:
    case WMSX_CREATE_PALLET_FAILED:
    case WMSX_UPDATE_PALLET_SUCCESS:
    case WMSX_UPDATE_PALLET_FAILED:
    case WMSX_DELETE_PALLET_SUCCESS:
    case WMSX_DELETE_PALLET_FAILED:
    case WMSX_SEARCH_PALLETS_FAILED:
    case WMSX_GET_PALLETS_EVEN_BY_ITEM_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_RESET_PALLET_DETAILS_STATE:
      return {
        ...state,
        palletDetails: {},
      }
    default:
      return state
  }
}
