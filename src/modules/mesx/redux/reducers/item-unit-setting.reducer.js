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
} from 'modules/mesx/redux/actions/item-unit-setting.action'

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

    case SEARCH_ITEM_UNITS_FAILED:
    case CREATE_ITEM_UNIT_SUCCESS:
    case CREATE_ITEM_UNIT_FAILED:
    case UPDATE_ITEM_UNIT_SUCCESS:
    case UPDATE_ITEM_UNIT_FAILED:
    case DELETE_ITEM_UNIT_SUCCESS:
    case DELETE_ITEM_UNIT_FAILED:
    case GET_ITEM_UNIT_DETAILS_FAILED:
      return {
        ...state,
        itemUnitDetails: {},
        isLoading: false,
      }
    case GET_ITEM_UNIT_DETAILS_SUCCESS:
      return {
        ...state,
        itemUnitDetails: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}
