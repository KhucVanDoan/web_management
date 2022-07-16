import {
  MMSX_SEARCH_DEVICE_ASSIGN_START,
  MMSX_CREATE_DEVICE_ASSIGN_START,
  MMSX_UPDATE_DEVICE_ASSIGN_START,
  MMSX_SEARCH_DEVICE_ASSIGN_SUCCESS,
  MMSX_SEARCH_DEVICE_ASSIGN_FAIL,
  MMSX_DELETE_DEVICE_ASSIGN_START,
  MMSX_DELETE_DEVICE_ASSIGN_SUCCESS,
  MMSX_DELETE_DEVICE_ASSIGN_FAIL,
  MMSX_DETAIL_DEVICE_ASSIGN_START,
  MMSX_DETAIL_DEVICE_ASSIGN_SUCCESS,
  MMSX_DETAIL_DEVICE_ASSIGN_FAIL,
  MMSX_GET_DEVICE_REQUESTS_START,
  MMSX_GET_DEVICE_REQUESTS_SUCCESS,
  MMSX_GET_DEVICE_REQUESTS_FAIL,
  MMSX_UPDATE_DEVICE_ASSIGN_FAIL,
  MMSX_UPDATE_DEVICE_ASSIGN_SUCCESS,
  MMSX_GET_GENERATED_SERIAL,
  MMSX_GET_GENERATED_SERIAL_SUCCESS,
  MMSX_GET_GENERATED_SERIAL_FAIL,
  MMSX_CHECK_SERIAL,
  MMSX_CHECK_SERIAL_SUCCESS,
  MMSX_CHECK_SERIAL_FAIL,
  MMSX_GET_LOG_TIME_BY_MO_FAIL,
  MMSX_GET_LOG_TIME_BY_MO_SUCCESS,
  MMSX_RESET_DEVICE_ASSIGN_STATE,
} from '../actions/device-assign'

const initState = {
  isLoading: false,
  deviceAssignList: [],
  meta: {},
  deviceAssignDetail: {},
  deviceRequest: [],
  logTimeByMo: [],
}

export default function deviceAssign(state = initState, action) {
  switch (action.type) {
    case MMSX_SEARCH_DEVICE_ASSIGN_START:
    case MMSX_CREATE_DEVICE_ASSIGN_START:
    case MMSX_UPDATE_DEVICE_ASSIGN_START:
    case MMSX_DELETE_DEVICE_ASSIGN_START:
    case MMSX_DETAIL_DEVICE_ASSIGN_START:
    case MMSX_GET_DEVICE_REQUESTS_START:
    case MMSX_GET_GENERATED_SERIAL:
    case MMSX_CHECK_SERIAL:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_GET_LOG_TIME_BY_MO_SUCCESS:
      return {
        ...state,
        logTimeByMo: action?.payload,
        isLoading: false,
      }
    case MMSX_SEARCH_DEVICE_ASSIGN_SUCCESS:
      return {
        ...state,
        deviceAssignList: action.payload?.result,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case MMSX_GET_DEVICE_REQUESTS_SUCCESS:
      return {
        ...state,
        deviceRequest: action.payload,
        meta: action?.payload?.meta,
        isLoading: false,
      }
    case MMSX_DELETE_DEVICE_ASSIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_DETAIL_DEVICE_ASSIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceAssignDetail: action.payload,
      }
    case MMSX_UPDATE_DEVICE_ASSIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_GET_GENERATED_SERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        generatedSerial: action.payload,
      }
    case MMSX_CHECK_SERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_GET_LOG_TIME_BY_MO_FAIL:
      return {
        ...state,
        isLoading: false,
        logTimeByMo: [],
      }
    case MMSX_SEARCH_DEVICE_ASSIGN_FAIL:
    case MMSX_DELETE_DEVICE_ASSIGN_FAIL:
    case MMSX_DETAIL_DEVICE_ASSIGN_FAIL:
    case MMSX_GET_DEVICE_REQUESTS_FAIL:
    case MMSX_UPDATE_DEVICE_ASSIGN_FAIL:
    case MMSX_GET_GENERATED_SERIAL_FAIL:
    case MMSX_CHECK_SERIAL_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_DEVICE_ASSIGN_STATE:
      return {
        ...state,
        deviceAssignDetail: {},
      }
    default:
      return state
  }
}
