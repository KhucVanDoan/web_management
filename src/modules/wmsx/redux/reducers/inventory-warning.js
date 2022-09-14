import {
  WMSX_SEARCH_INVENTORIES_WARNING_FAILED,
  WMSX_SEARCH_INVENTORIES_WARNING_START,
  WMSX_SEARCH_INVENTORIES_WARNING_SUCCESS,
} from '~/modules/wmsx/redux/actions/inventory-warning'

const initialState = {
  isLoading: false,
  inventoryWarningList: [],
  inventoryDetail: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventoryWarning(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_INVENTORIES_WARNING_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_INVENTORIES_WARNING_SUCCESS:
      return {
        ...state,
        inventoryWarningList: action.payload?.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_INVENTORIES_WARNING_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
