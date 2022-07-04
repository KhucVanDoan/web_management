import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmDeviceFailed,
  confirmDeviceSuccess,
  MMSX_CONFIRM_DEVICE_START,
} from '../../actions/define-device'
/**
 * Call api here
 * @returns {Promise}
 */
const confirmDeviceApi = (params) => {
  const uri = `v1/mms/web/devices/${params}`
  return api.patch(uri, params)
}

/**
 * Worker: do confirm device when take action: MMSX_confirm_device_start
 * @param {object} action
 */
function* doConfirmDevice(action) {
  try {
    const response = yield call(confirmDeviceApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(confirmDeviceSuccess())

      // Call callback action onSuccess
      if (action.onSuccess) {
        yield action.onSuccess()
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
    yield put(confirmDeviceFailed())
    // Call callback action onError
    if (action.onError) {
      yield action.onError()
    }
  }
}

/* Watcher */
export default function* watchConfirmDevice() {
  yield takeLatest(MMSX_CONFIRM_DEVICE_START, doConfirmDevice)
}
