import {
  SEARCH_DEFINE_WAREHOUSE_PALLET_START,
  SEARCH_DEFINE_WAREHOUSE_PALLET_SUCCESS,
  SEARCH_DEFINE_WAREHOUSE_PALLET_FAILED,
  GET_DEFINE_WAREHOUSE_PALLET_START,
  GET_DEFINE_WAREHOUSE_PALLET_FAILED,
  GET_DEFINE_WAREHOUSE_PALLET_SUCCESS,
  RESET_STATE_WAREHOUSE_PALLET,
} from '../../redux/actions/define-warehouse-pallet'

const initialState = {
  isLoading: false,
  defineWarehousePalletList: [],
  defineWarehousePalletDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */

export default function defineWarehousePallet(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEFINE_WAREHOUSE_PALLET_START:
    case GET_DEFINE_WAREHOUSE_PALLET_START:
      return {
        ...state,
        isLoading: false,
      }
    case SEARCH_DEFINE_WAREHOUSE_PALLET_SUCCESS:
      return {
        ...state,
        defineWarehousePalletList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_DEFINE_WAREHOUSE_PALLET_FAILED:
    case GET_DEFINE_WAREHOUSE_PALLET_FAILED:
      return {
        ...state,
        defineWarehousePalletDetail: {},
        isLoading: false,
      }
    case GET_DEFINE_WAREHOUSE_PALLET_SUCCESS:
      return {
        ...state,
        defineWarehousePalletDetail: action.payload,
        isLoading: false,
      }
    case RESET_STATE_WAREHOUSE_PALLET:
      return {
        ...state,
        defineWarehousePalletDetail: {},
      }
    default:
      return state
  }
}
