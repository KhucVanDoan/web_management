import {
  GET_ALL_CONFRIM_DEVICE_CATEGORY_FAILED,
  GET_ALL_CONFRIM_DEVICE_CATEGORY_START,
  GET_ALL_CONFRIM_DEVICE_CATEGORY_SUCCESS,
  GET_DEVICE_CATEGORY_FAIL,
  GET_DEVICE_CATEGORY_START,
  GET_DEVICE_CATEGORY_SUCCESS,
  SEARCH_DEVICE_CATEGORY_FAIL,
  SEARCH_DEVICE_CATEGORY_START,
  SEARCH_DEVICE_CATEGORY_SUCCESS,
  CREATE_DEVICE_CATEGORY_START,
  UPDATE_DEVICE_CATEGORY_START,
  RESET_DEVICE_CATEGORY,
  CREATE_DEVICE_CATEGORY_FAIL,
  UPDATE_DEVICE_CATEGORY_FAIL,
  CREATE_DEVICE_CATEGORY_SUCCESS,
  UPDATE_DEVICE_CATEGORY_SUCCESS,
} from '../actions/device-category'

const initialState = {
  isLoading: false,
  deviceCategoryList: [],
  deviceCategoryDetail: {},
  total: null,
  confirmDeviceCategory: [],
}

export default function deviceCategory(state = initialState, action) {
  switch (action.type) {
    case CREATE_DEVICE_CATEGORY_START:
    case SEARCH_DEVICE_CATEGORY_START:
    case UPDATE_DEVICE_CATEGORY_START:
    case GET_ALL_CONFRIM_DEVICE_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DEVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        deviceCategoryList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case SEARCH_DEVICE_CATEGORY_FAIL:
      return {
        ...state,
        deviceCategoryList: [],
        isLoading: false,
      }
    case GET_DEVICE_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_DEVICE_CATEGORY_FAIL:
    case UPDATE_DEVICE_CATEGORY_FAIL:
    case CREATE_DEVICE_CATEGORY_SUCCESS:
    case UPDATE_DEVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DEVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        deviceCategoryDetail: action?.payload,
        isLoading: false,
      }
    case GET_DEVICE_CATEGORY_FAIL:
      return {
        ...state,
        deviceCategoryDetail: {},
        isLoading: false,
      }
    case GET_ALL_CONFRIM_DEVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        confirmDeviceCategory: action?.payload,
        isLoading: false,
      }
    case GET_ALL_CONFRIM_DEVICE_CATEGORY_FAILED:
      return {
        ...state,
        confirmDeviceCategory: [],
        isLoading: false,
      }
    case RESET_DEVICE_CATEGORY:
      return {
        ...state,
        deviceCategoryDetail: {},
      }
    default:
      return state
  }
}
