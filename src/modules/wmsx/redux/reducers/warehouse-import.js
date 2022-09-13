import {
  GET_WAREHOUSE_IMPORT_MOVEMENTS,
  GET_WAREHOUSE_IMPORT_MOVEMENTS_SUCCESS,
} from '~/modules/wmsx/redux/actions/warehouse-import'

const initialState = {
  isLoading: false,
  movements: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function warehouseImport(state = initialState, action) {
  switch (action.type) {
    case GET_WAREHOUSE_IMPORT_MOVEMENTS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_WAREHOUSE_IMPORT_MOVEMENTS_SUCCESS:
      return {
        ...state,
        movements: action.payload.items,
        total: action.payload.meta.total,
        isLoading: false,
      }
    default:
      return state
  }
}
