import {
  CREATE_ITEM_TYPE_FAILED,
  CREATE_ITEM_TYPE_START,
  CREATE_ITEM_TYPE_SUCCESS,
  DELETE_ITEM_TYPE_FAILED,
  DELETE_ITEM_TYPE_START,
  DELETE_ITEM_TYPE_SUCCESS,
  GET_ITEM_TYPE_DETAILS_FAILED,
  GET_ITEM_TYPE_DETAILS_START,
  GET_ITEM_TYPE_DETAILS_SUCCESS,
  SEARCH_ITEM_TYPES_FAILED,
  SEARCH_ITEM_TYPES_START,
  SEARCH_ITEM_TYPES_SUCCESS,
  UPDATE_ITEM_TYPE_FAILED,
  UPDATE_ITEM_TYPE_START,
  UPDATE_ITEM_TYPE_SUCCESS,
} from '~/modules/mesx/redux/actions/item-type-setting.action'

const initialState = {
  isLoading: false,
  itemTypeList: [],
  itemTypeDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function itemTypeSetting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEM_TYPES_START:
    case CREATE_ITEM_TYPE_START:
    case UPDATE_ITEM_TYPE_START:
    case DELETE_ITEM_TYPE_START:
    case GET_ITEM_TYPE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ITEM_TYPES_SUCCESS:
      return {
        ...state,
        itemTypeList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_ITEM_TYPES_FAILED:
    case CREATE_ITEM_TYPE_SUCCESS:
    case CREATE_ITEM_TYPE_FAILED:
    case UPDATE_ITEM_TYPE_SUCCESS:
    case UPDATE_ITEM_TYPE_FAILED:
    case DELETE_ITEM_TYPE_SUCCESS:
    case DELETE_ITEM_TYPE_FAILED:
    case GET_ITEM_TYPE_DETAILS_FAILED:
      return {
        ...state,
        itemTypeDetails: {},
        isLoading: false,
      }
    case GET_ITEM_TYPE_DETAILS_SUCCESS:
      return {
        ...state,
        itemTypeDetails: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}
