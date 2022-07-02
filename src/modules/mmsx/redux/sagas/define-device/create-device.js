import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createDeviceFailed,
  createDeviceSuccess,
  MMSX_CREATE_DEVICE_START,
} from '../../actions/define-device'
/**
 * Call api here
 * @returns {Promise}
 */
const createDeviceApi = (params) => {
  const uri = `v1/mms/web/devices`
  return api.post(uri, params)
}

/* Worker  */
function* doCreateDevice(action) {
  try {
    const response = yield call(createDeviceApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(createDeviceSuccess())

      if (action.onSuccess) {
        yield action?.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createDeviceFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/* Watcher  */
export default function* watchCreateDevice() {
  yield takeLatest(MMSX_CREATE_DEVICE_START, doCreateDevice)
}
