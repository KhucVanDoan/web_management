import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  changeStatusRequestDeviceFailed,
  changeStatusRequestDeviceSuccess,
  CHANGE_STATUS_REQUEST_DEVICE_START,
} from '../../actions/request-device'

const changeStatusRequestDeviceApi = (params) => {
  const url = `v1/mms/device-requests/request-tickets`
  return api.patch(url, params)
}

function* doChangeStatusRequestDevice(action) {
  try {
    const response = yield call(changeStatusRequestDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(changeStatusRequestDeviceSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(changeStatusRequestDeviceFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchChangeStatusRequestDevice() {
  yield takeLatest(
    CHANGE_STATUS_REQUEST_DEVICE_START,
    doChangeStatusRequestDevice,
  )
}
