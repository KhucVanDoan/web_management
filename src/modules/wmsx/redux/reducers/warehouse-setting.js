import {
  SEARCH_WAREHOUSE_SETTING_START,
  SEARCH_WAREHOUSE_SETTING_SUCCESS,
  SEARCH_WAREHOUSE_SETTING_FAILED,
  CREATE_WAREHOUSE_SETTING_START,
  CREATE_WAREHOUSE_SETTING_SUCCESS,
  CREATE_WAREHOUSE_SETTING_FAILED,
  UPDATE_WAREHOUSE_SETTING_START,
  UPDATE_WAREHOUSE_SETTING_SUCCESS,
  UPDATE_WAREHOUSE_SETTING_FAILED,
  DELETE_WAREHOUSE_SETTING_START,
  DELETE_WAREHOUSE_SETTING_SUCCESS,
  DELETE_WAREHOUSE_SETTING_FAILED,
  GET_WAREHOSE_SETTING_DETAIL_START,
  GET_WAREHOSE_SETTING_DETAIL_SUCCESS,
  GET_WAREHOSE_SETTING_DETAIL_FAILED,
  RESET_WAREHOSE_SETTING_DETAIL_STATE,
} from '~/modules/wmsx/redux/actions/warehouse-setting'

const initialState = {
  isLoading: false,
  warehouseSettingList: [],
  warehouseSettingDetails: {},
  total: null,
}

export default function warehouseSetting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_WAREHOUSE_SETTING_START:
    case CREATE_WAREHOUSE_SETTING_START:
    case UPDATE_WAREHOUSE_SETTING_START:
    case DELETE_WAREHOUSE_SETTING_START:
    case GET_WAREHOSE_SETTING_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WAREHOUSE_SETTING_SUCCESS:
      return {
        ...state,
        warehouseSettingList: action.payload,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_WAREHOUSE_SETTING_FAILED:
      return {
        ...state,
        warehouseSettingList: [],
        isLoading: false,
        total: 0,
      }

    case CREATE_WAREHOUSE_SETTING_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_WAREHOUSE_SETTING_SUCCESS:
    case UPDATE_WAREHOUSE_SETTING_SUCCESS:
    case UPDATE_WAREHOUSE_SETTING_FAILED:
    case DELETE_WAREHOUSE_SETTING_SUCCESS:
    case DELETE_WAREHOUSE_SETTING_FAILED:
      return {
        ...state,
        isLoading: true,
      }
    case GET_WAREHOSE_SETTING_DETAIL_SUCCESS:
      return {
        ...state,
        warehouseSettingDetails: action.payload,
        isLoading: false,
      }
    case GET_WAREHOSE_SETTING_DETAIL_FAILED:
      return {
        ...state,
        warehouseSettingDetails: {},
        isLoading: false,
      }
    case RESET_WAREHOSE_SETTING_DETAIL_STATE:
      return {
        ...state,
        warehouseSettingDetails: {},
      }
    default:
      return state
  }
}
