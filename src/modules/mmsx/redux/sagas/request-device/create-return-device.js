import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createReturnDeviceFailed,
  createReturnDeviceSuccess,
  CREATE_RETURN_DEVICE_START,
} from '../../actions/request-device'

const createReturnDeviceApi = (params) => {
  const url = `v1/mms/device-requests/return-tickets`
  return api.post(url, params)
}

function* doCreateReturnDevice(action) {
  try {
    const response = yield call(createReturnDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createReturnDeviceSuccess())

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response.message)
    }
  } catch (error) {
    yield put(createReturnDeviceFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateReturnDevice() {
  yield takeLatest(CREATE_RETURN_DEVICE_START, doCreateReturnDevice)
}
