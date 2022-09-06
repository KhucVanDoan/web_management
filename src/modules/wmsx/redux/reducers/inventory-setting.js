import {
  CREATE_INVENTORY_SETTING_FAILED,
  CREATE_INVENTORY_SETTING_START,
  CREATE_INVENTORY_SETTING_SUCCESS,
  DELETE_INVENTORY_SETTING_FAILED,
  DELETE_INVENTORY_SETTING_START,
  DELETE_INVENTORY_SETTING_SUCCESS,
  GET_INVENTORY_SETTING_FAILED,
  GET_INVENTORY_SETTING_START,
  GET_INVENTORY_SETTING_SUCCESS,
  SEARCH_INVENTORY_SETTING_FAILED,
  SEARCH_INVENTORY_SETTING_START,
  SEARCH_INVENTORY_SETTING_SUCCESS,
  UPDATE_INVENTORY_SETTING_FAILED,
  UPDATE_INVENTORY_SETTING_START,
  UPDATE_INVENTORY_SETTING_SUCCESS,
  RESET_INVENTORY_SETTING_STATE,
} from '~/modules/wmsx/redux/actions/inventory-setting'

const initialState = {
  isLoading: false,
  inventorySettingList: [],
  inventorySettingDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventorySetting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INVENTORY_SETTING_START:
    case CREATE_INVENTORY_SETTING_START:
    case UPDATE_INVENTORY_SETTING_START:
    case DELETE_INVENTORY_SETTING_START:
    case GET_INVENTORY_SETTING_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_INVENTORY_SETTING_SUCCESS:
      return {
        ...state,
        inventorySettingList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }

    case SEARCH_INVENTORY_SETTING_FAILED:
    case CREATE_INVENTORY_SETTING_SUCCESS:
    case CREATE_INVENTORY_SETTING_FAILED:
    case UPDATE_INVENTORY_SETTING_SUCCESS:
    case UPDATE_INVENTORY_SETTING_FAILED:
    case DELETE_INVENTORY_SETTING_SUCCESS:
    case DELETE_INVENTORY_SETTING_FAILED:
    case GET_INVENTORY_SETTING_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_INVENTORY_SETTING_SUCCESS:
      return {
        ...state,
        inventorySettingDetail: action.payload,
        isLoading: false,
      }
    case RESET_INVENTORY_SETTING_STATE:
      return {
        ...state,
        inventorySettingDetail: {},
      }
    default:
      return state
  }
}
