import {
  SEARCH_DEVICE_STATUS,
  SEARCH_DEVICE_STATUS_SUCCESS,
  SEARCH_DEVICE_STATUS_FAIL,
  SEARCH_DEVICE_STATISTIC,
  SEARCH_DEVICE_STATISTIC_FAIL,
  SEARCH_DEVICE_STATISTIC_SUCCESS,
} from '../actions/device-status-report'

const initialState = {
  isLoading: false,
  deviceStatus: [],
  metaStatus: {},
  deviceStatistic: [],
  metaStatistic: {},
}

export default function deviceStatus(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEVICE_STATUS:
    case SEARCH_DEVICE_STATISTIC:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DEVICE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatus: action?.payload?.items,
        metaStatus: action?.payload?.meta,
      }
    case SEARCH_DEVICE_STATISTIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatistic: action?.payload?.items,
        metaStatistic: action?.payload?.meta,
      }
    case SEARCH_DEVICE_STATUS_FAIL:
    case SEARCH_DEVICE_STATISTIC_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
