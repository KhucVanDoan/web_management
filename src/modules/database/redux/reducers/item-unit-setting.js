import {
  CREATE_ITEM_UNIT_FAILED,
  CREATE_ITEM_UNIT_START,
  CREATE_ITEM_UNIT_SUCCESS,
  DELETE_ITEM_UNIT_FAILED,
  DELETE_ITEM_UNIT_START,
  DELETE_ITEM_UNIT_SUCCESS,
  GET_ITEM_UNIT_DETAILS_FAILED,
  GET_ITEM_UNIT_DETAILS_START,
  GET_ITEM_UNIT_DETAILS_SUCCESS,
  SEARCH_ITEM_UNITS_FAILED,
  SEARCH_ITEM_UNITS_START,
  SEARCH_ITEM_UNITS_SUCCESS,
  UPDATE_ITEM_UNIT_FAILED,
  UPDATE_ITEM_UNIT_START,
  UPDATE_ITEM_UNIT_SUCCESS,
  RESET_ITEM_UNIT_DETAILS_STATE,
} from '~/modules/database/redux/actions/item-unit-setting'

const initialState = {
  isLoading: false,
  itemUnitList: [],
  itemUnitDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function itemUnitSetting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEM_UNITS_START:
    case CREATE_ITEM_UNIT_START:
    case UPDATE_ITEM_UNIT_START:
    case DELETE_ITEM_UNIT_START:
    case GET_ITEM_UNIT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ITEM_UNITS_SUCCESS:
      return {
        ...state,
        itemUnitList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case DELETE_ITEM_UNIT_SUCCESS:
      return {
        ...state,
        itemUnitList: state.itemUnitList.filter(
          (item) => item.id !== action.payload.id,
        ),
        isLoading: false,
      }
    case SEARCH_ITEM_UNITS_FAILED:
    case CREATE_ITEM_UNIT_SUCCESS:
    case CREATE_ITEM_UNIT_FAILED:
    case UPDATE_ITEM_UNIT_SUCCESS:
    case UPDATE_ITEM_UNIT_FAILED:
    case DELETE_ITEM_UNIT_FAILED:
    case GET_ITEM_UNIT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ITEM_UNIT_DETAILS_SUCCESS:
      return {
        ...state,
        itemUnitDetails: action.payload,
        isLoading: false,
      }
    case RESET_ITEM_UNIT_DETAILS_STATE:
      return {
        ...state,
        itemUnitDetails: {},
      }
    default:
      return state
  }
}
