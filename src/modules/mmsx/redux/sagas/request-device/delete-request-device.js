import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteRequestDeviceFailed,
  deleteRequestDeviceSuccess,
  DELETE_REQUEST_DEVICE_START,
} from '../../actions/request-device'

const deleteRequestDeviceApi = (params) => {
  const url = `v1/mms/device-requests/request-tickets/${params}`
  return api.delete(url)
}

function* doDeleteRequestDevice(action) {
  try {
    const response = yield call(deleteRequestDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteRequestDeviceSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteRequestDeviceFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteRequestDevice() {
  yield takeLatest(DELETE_REQUEST_DEVICE_START, doDeleteRequestDevice)
}
