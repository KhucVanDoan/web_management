import {
  GET_PROGRESS_MANUFACTURING_BY_ORDER_START,
  GET_PROGRESS_MANUFACTURING_BY_ORDER_SUCCESS,
  GET_PROGRESS_MANUFACTURING_BY_ORDERD_FAILED,
} from '~/modules/mesx/redux/actions/progress-by-order'
const initialState = {
  isLoading: false,
  progressByOrderList: [],
  total: null,
}
export default function progressManufacturingByOrder(
  state = initialState,
  action,
) {
  switch (action.type) {
    case GET_PROGRESS_MANUFACTURING_BY_ORDER_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PROGRESS_MANUFACTURING_BY_ORDER_SUCCESS:
      return {
        ...state,
        progressByOrderList: action.payload,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_PROGRESS_MANUFACTURING_BY_ORDERD_FAILED:
      return {
        ...state,
        progressByOrderList: [],
        isLoading: false,
      }
    default:
      return state
  }
}
