import {
  SEARCH_DATA_WAREHOUSE_SPACE_REPORT_FAILED,
  SEARCH_DATA_WAREHOUSE_SPACE_REPORT_START,
  SEARCH_DATA_WAREHOUSE_SPACE_REPORT_SUCCESS,
  GET_FACTORIES_START,
  GET_FACTORIES_FAILED,
  GET_FACTORIES_SUCCESS,
  RESET_WAREHOUSE_SPACE_REPORT_LIST_STATE,
} from '~/modules/wmsx/redux/actions/warehouse-space-report'

const initialState = {
  isLoading: false,
  warehouseSpace: [],
  factories: [],
}

export default function warehouseSpaceReport(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DATA_WAREHOUSE_SPACE_REPORT_START:
    case GET_FACTORIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_FACTORIES_SUCCESS:
      return {
        ...state,
        factories: action.payload,
        isLoading: false,
      }
    case SEARCH_DATA_WAREHOUSE_SPACE_REPORT_SUCCESS:
      return {
        ...state,
        warehouseSpace: action.payload,
        isLoading: false,
      }
    case SEARCH_DATA_WAREHOUSE_SPACE_REPORT_FAILED:
      return {
        ...state,
        warehouseSpace: [],
        isLoading: false,
      }
    case GET_FACTORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        total: 0,
      }
    case RESET_WAREHOUSE_SPACE_REPORT_LIST_STATE:
      return {
        ...state,
        warehouseSpace: [],
      }
    default:
      return state
  }
}
