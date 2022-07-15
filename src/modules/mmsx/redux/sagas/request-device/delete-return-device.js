import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteReturnDeviceFailed,
  deleteReturnDeviceSuccess,
  DELETE_RETURN_DEVICE_START,
} from '../../actions/request-device'

const deleteReturnDeviceApi = (params) => {
  const url = `v1/mms/device-requests/return-tickets/${params}`
  return api.delete(url)
}

function* doDeleteReturnDevice(action) {
  try {
    const response = yield call(deleteReturnDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteReturnDeviceSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteReturnDeviceFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteReturnDevice() {
  yield takeLatest(DELETE_RETURN_DEVICE_START, doDeleteReturnDevice)
}
