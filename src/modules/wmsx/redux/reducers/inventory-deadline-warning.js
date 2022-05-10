import {
  WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_START,
  WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_SUCCESS,
  WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_FAILED,
} from '~/modules/wmsx/redux/actions/inventory-deadline-warning'

const initialState = {
  isLoading: false,
  inventoryDeadlineWarningList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventoryDeadlineWarning(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_SUCCESS:
      return {
        ...state,
        inventoryDeadlineWarningList: action.payload?.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
