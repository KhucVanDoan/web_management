import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchDeviceSuccess,
  searchDeviceFailed,
  MMSX_SEARCH_DEVICE_START,
} from '../../actions/define-device'

export const searchDeviceListApi = (params) => {
  const url = `v1/mms/web/devices`
  return api.get(url, params)
}

function* doSearchDevice(action) {
  try {
    const response = yield call(searchDeviceListApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchDeviceSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDeviceFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchSearchDevice() {
  yield takeLatest(MMSX_SEARCH_DEVICE_START, doSearchDevice)
}
