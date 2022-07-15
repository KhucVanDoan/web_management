import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  changeStatusReturnDeviceFailed,
  changeStatusReturnDeviceSuccess,
  CHANGE_STATUS_RETURN_DEVICE_START,
} from '../../actions/request-device'

const changeStatusReturnDeviceApi = (params) => {
  const url = `v1/mms/device-requests/return-tickets`
  return api.patch(url, params)
}

function* doChangeStatusReturnDevice(action) {
  try {
    const response = yield call(changeStatusReturnDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(changeStatusReturnDeviceSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(changeStatusReturnDeviceFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchChangeStatusReturnDevice() {
  yield takeLatest(
    CHANGE_STATUS_RETURN_DEVICE_START,
    doChangeStatusReturnDevice,
  )
}
