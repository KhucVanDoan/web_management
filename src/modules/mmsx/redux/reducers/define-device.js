import {
  MMSX_CONFIRM_DEVICE_FAILED,
  MMSX_CONFIRM_DEVICE_START,
  MMSX_CONFIRM_DEVICE_SUCCESS,
  MMSX_CREATE_DEVICE_FAILED,
  MMSX_CREATE_DEVICE_START,
  MMSX_CREATE_DEVICE_SUCCESS,
  MMSX_DELETE_DEVICE_FAILED,
  MMSX_DELETE_DEVICE_START,
  MMSX_DELETE_DEVICE_SUCCESS,
  MMSX_GET_DEVICE_DETAIL_FAILED,
  MMSX_GET_DEVICE_DETAIL_START,
  MMSX_GET_DEVICE_DETAIL_SUCCESS,
  MMSX_PASS_DEVICE_TO_STORE,
  MMSX_SEARCH_DEVICE_FAILED,
  MMSX_SEARCH_DEVICE_START,
  MMSX_SEARCH_DEVICE_SUCCESS,
  MMSX_SET_SUPPLIES_AND_ACCESSORY_LIST,
  MMSX_UPDATE_DEVICE_FAILED,
  MMSX_UPDATE_DEVICE_START,
  MMSX_UPDATE_DEVICE_SUCCESS,
  MMSX_RESET_DEVICE_STATE,
} from '../actions/define-device'

const initialState = {
  isLoading: false,
  deviceList: [],
  total: null,
  suppliesAndAccessoryList: [],
  deviceInStore: null,
  deviceDetail: {},
}

export default function defineDevice(state = initialState, action) {
  switch (action.type) {
    case MMSX_CONFIRM_DEVICE_START:
    case MMSX_DELETE_DEVICE_START:
    case MMSX_CREATE_DEVICE_START:
    case MMSX_UPDATE_DEVICE_START:
      return {
        ...state,
      }
    case MMSX_GET_DEVICE_DETAIL_START:
    case MMSX_SEARCH_DEVICE_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_DEVICE_SUCCESS:
      return {
        ...state,
        deviceList: action.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case MMSX_SEARCH_DEVICE_FAILED:
      return {
        ...state,
        deviceList: [],
        isLoading: true,
      }
    case MMSX_CONFIRM_DEVICE_SUCCESS:
    case MMSX_CONFIRM_DEVICE_FAILED:
      return {
        ...state,
      }
    case MMSX_DELETE_DEVICE_SUCCESS:
    case MMSX_DELETE_DEVICE_FAILED:
    case MMSX_CREATE_DEVICE_SUCCESS:
    case MMSX_CREATE_DEVICE_FAILED:
    case MMSX_UPDATE_DEVICE_SUCCESS:
    case MMSX_UPDATE_DEVICE_FAILED:
      return {
        ...state,
      }
    case MMSX_SET_SUPPLIES_AND_ACCESSORY_LIST:
      return {
        ...state,
        suppliesAndAccessoryList: action.payload,
      }
    case MMSX_PASS_DEVICE_TO_STORE:
      return {
        ...state,
        deviceInStore: action.payload,
      }
    case MMSX_GET_DEVICE_DETAIL_SUCCESS:
      return {
        ...state,
        deviceDetail: action.payload,
        isLoading: false,
      }
    case MMSX_GET_DEVICE_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_DEVICE_STATE:
      return {
        ...state,
        deviceDetail: {},
      }
    default:
      return state
  }
}
