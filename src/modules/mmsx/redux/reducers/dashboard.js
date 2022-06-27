import {
  MMSX_GET_SUMMARY,
  MMSX_GET_SUMMARY_SUCCESS,
  MMSX_GET_SUMMARY_FAIL,
  MMSX_GET_MAINTAINANCE,
  MMSX_GET_MAINTAINANCE_FAIL,
  MMSX_GET_MAINTAINANCE_SUCCESS,
  MMSX_GET_DEVICE_STATUS,
  MMSX_GET_DEVICE_STATUS_FAIL,
  MMSX_GET_DEVICE_STATUS_SUCCESS,
  MMSX_GET_DEVICE_ERROR,
  MMSX_GET_DEVICE_ERROR_FAIL,
  MMSX_GET_DEVICE_ERROR_SUCCESS,
  MMSX_GET_REQUEST_STATUS,
  MMSX_GET_REQUEST_STATUS_FAIL,
  MMSX_GET_REQUEST_STATUS_SUCCESS,
  MMSX_GET_MTT_STATS,
  MMSX_GET_MTT_STATS_FAIL,
  MMSX_GET_MTT_STATS_SUCCESS,
  MMSX_GET_DEVICE_USING_STATUS,
  MMSX_GET_DEVICE_USING_STATUS_FAIL,
  MMSX_GET_DEVICE_USING_STATUS_SUCCESS,
} from '../actions/dashboard'

const initState = {
  isLoading: false,
  summary: [],
  maintainanceJobStatus: [],
  deviceStatus: [],
  deviceError: [],
  requestStatus: [],
  mttStatus: [],
  deviceUsingStatus: [],
}

/**
 * @param {{ type: any; payload: { items: any; meta: { total: any; }; }; }} action
 */
export default function dashboard(state = initState, action) {
  switch (action.type) {
    case MMSX_GET_SUMMARY:
    case MMSX_GET_MAINTAINANCE:
    case MMSX_GET_DEVICE_STATUS:
    case MMSX_GET_DEVICE_ERROR:
    case MMSX_GET_REQUEST_STATUS:
    case MMSX_GET_MTT_STATS:
    case MMSX_GET_DEVICE_USING_STATUS:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_GET_MTT_STATS_SUCCESS:
      return {
        ...state,
        mttStatus: action.payload,
        isLoading: false,
      }
    case MMSX_GET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        isLoading: false,
      }
    case MMSX_GET_MAINTAINANCE_SUCCESS:
      return {
        ...state,
        maintainanceJobStatus: action.payload,
        isLoading: false,
      }
    case MMSX_GET_DEVICE_STATUS_SUCCESS:
      return {
        ...state,
        deviceStatus: action.payload,
        isLoading: false,
      }
    case MMSX_GET_DEVICE_ERROR_SUCCESS:
      return {
        ...state,
        deviceError: action.payload,
        isLoading: false,
      }
    case MMSX_GET_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        requestStatus: action.payload,
        isLoading: false,
      }
    case MMSX_GET_DEVICE_USING_STATUS_SUCCESS:
      return {
        ...state,
        deviceUsingStatus: action.payload,
        isLoading: false,
      }
    case MMSX_GET_DEVICE_USING_STATUS_FAIL:
    case MMSX_GET_SUMMARY_FAIL:
    case MMSX_GET_MAINTAINANCE_FAIL:
    case MMSX_GET_DEVICE_STATUS_FAIL:
    case MMSX_GET_DEVICE_ERROR_FAIL:
    case MMSX_GET_REQUEST_STATUS_FAIL:
    case MMSX_GET_MTT_STATS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
