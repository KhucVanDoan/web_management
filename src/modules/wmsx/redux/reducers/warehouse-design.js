import {
  GET_WAREHOUSE_DESIGN_START,
  GET_WAREHOUSE_DESIGN_FAILED,
  GET_WAREHOUSE_DESIGN_SUCCESS,
  UPDATE_WAREHOUSE_DESIGN_START,
  UPDATE_WAREHOUSE_DESIGN_FAILED,
  UPDATE_WAREHOUSE_DESIGN_SUCCESS,
} from '../actions/warehouse-design'

const initialState = {
  isLoading: false,
  detail: [],
}
/**
 * reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function warehouseDesign(state = initialState, action) {
  switch (action.type) {
    case GET_WAREHOUSE_DESIGN_START:
    case UPDATE_WAREHOUSE_DESIGN_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_WAREHOUSE_DESIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload,
      }
    case UPDATE_WAREHOUSE_DESIGN_SUCCESS:
    case GET_WAREHOUSE_DESIGN_FAILED:
    case UPDATE_WAREHOUSE_DESIGN_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
