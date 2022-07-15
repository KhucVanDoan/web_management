import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchRequestDeviceFailed,
  searchRequestDeviceSuccess,
  SEARCH_REQUEST_DEVICE_START,
} from '../../actions/request-device'

const searchRequestDevice = (params) => {
  const url = `v1/mms/device-requests`
  return api.get(url, params)
}

function* doSearchRequestDevice(action) {
  try {
    const response = yield call(searchRequestDevice, action?.payload)

    if (response.statusCode === 200) {
      yield put(searchRequestDeviceSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchRequestDeviceFailed())
    if (action.onError) {
      yield action.onError
    }
  }
}

export default function* watchSearchRequestDevice() {
  yield takeLatest(SEARCH_REQUEST_DEVICE_START, doSearchRequestDevice)
}
