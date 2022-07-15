import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  SEARCH_DEVICE_STATISTIC,
  searchDeviceStatisticFail,
  searchDeviceStatisticSuccess,
} from '../../actions/device-status-report'

export const getStatisticApi = (params) => {
  const url = `v1/mms/report-device-assign-status`
  return api.get(url, params)
}

function* doGetDeviceStatistic(action) {
  try {
    const response = yield call(getStatisticApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchDeviceStatisticSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDeviceStatisticFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDeviceStatistic() {
  yield takeLatest(SEARCH_DEVICE_STATISTIC, doGetDeviceStatistic)
}
