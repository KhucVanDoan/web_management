export const SEARCH_DEVICE_STATUS = 'MMSX_SEARCH_DEVICE_STATUS'
export const SEARCH_DEVICE_STATUS_SUCCESS = 'MMSX_SEARCH_DEVICE_STATUS_SUCCESS'
export const SEARCH_DEVICE_STATUS_FAIL = 'MMSX_SEARCH_DEVICE_STATUS_FAIL'

export const SEARCH_DEVICE_STATISTIC = 'MMSX_SEARCH_DEVICE_STATISTIC'
export const SEARCH_DEVICE_STATISTIC_SUCCESS =
  'MMSX_SEARCH_DEVICE_STATISTIC_SUCCESS'
export const SEARCH_DEVICE_STATISTIC_FAIL = 'MMSX_SEARCH_DEVICE_STATISTIC_FAIL'

export function searchDeviceStatus(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEVICE_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceStatusSuccess(payload) {
  return {
    type: SEARCH_DEVICE_STATUS_SUCCESS,
    payload: payload,
  }
}

export function searchDeviceStatusFail() {
  return {
    type: SEARCH_DEVICE_STATUS_FAIL,
  }
}

export function searchDeviceStatistic(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEVICE_STATISTIC,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceStatisticSuccess(payload) {
  return {
    type: SEARCH_DEVICE_STATISTIC_SUCCESS,
    payload: payload,
  }
}

export function searchDeviceStatisticFail() {
  return {
    type: SEARCH_DEVICE_STATISTIC_FAIL,
  }
}
export default {
  searchDeviceStatus,
  searchDeviceStatusSuccess,
  searchDeviceStatusFail,
  searchDeviceStatistic,
  searchDeviceStatisticSuccess,
  searchDeviceStatisticFail,
}
