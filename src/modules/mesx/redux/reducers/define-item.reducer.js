import {
  CREATE_ITEM_FAILED,
  CREATE_ITEM_START,
  CREATE_ITEM_SUCCESS,
  DELETE_ITEM_FAILED,
  DELETE_ITEM_START,
  DELETE_ITEM_SUCCESS,
  GET_ITEM_DETAILS_FAILED,
  GET_ITEM_DETAILS_START,
  GET_ITEM_DETAILS_SUCCESS,
  PRINT_QR_ITEMS_FAILED,
  PRINT_QR_ITEMS_START,
  PRINT_QR_ITEMS_SUCCESS,
  SEARCH_ITEMS_FAILED,
  SEARCH_ITEMS_START,
  SEARCH_ITEMS_SUCCESS,
  UPDATE_ITEM_FAILED,
  UPDATE_ITEM_START,
  UPDATE_ITEM_SUCCESS,
} from 'modules/mesx/redux/actions/define-item.action'

const initialState = {
  isLoading: false,
  itemList: [],
  itemDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineItem(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEMS_START:
    case CREATE_ITEM_START:
    case UPDATE_ITEM_START:
    case DELETE_ITEM_START:
    case GET_ITEM_DETAILS_START:
    case PRINT_QR_ITEMS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ITEMS_SUCCESS:
      return {
        ...state,
        itemList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_ITEM_SUCCESS:
    case CREATE_ITEM_FAILED:
    case UPDATE_ITEM_SUCCESS:
    case UPDATE_ITEM_FAILED:
    case DELETE_ITEM_SUCCESS:
    case DELETE_ITEM_FAILED:
    case PRINT_QR_ITEMS_SUCCESS:
    case PRINT_QR_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ITEM_DETAILS_SUCCESS:
      return {
        ...state,
        itemDetails: action.payload,
        isLoading: false,
      }
    case GET_ITEM_DETAILS_FAILED:
      return {
        ...state,
        itemDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
