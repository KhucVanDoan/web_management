import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteDeviceSuccess,
  deleteDeviceFailed,
  MMSX_DELETE_DEVICE_START,
} from '../../actions/define-device'

/**
 * Call api here
 * @returns {Promise}
 */
const deleteDeviceApi = (params) => {
  const uri = `v1/mms/web/devices/${params?.id}`
  return api.delete(uri, params)
}

/**
 * Worker: do delet device when take action
 * @param {object} action
 */
function* doDeleteDevice(action) {
  try {
    const response = yield call(deleteDeviceApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(deleteDeviceSuccess())

      //Callback onSuccess
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
    yield put(deleteDeviceFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watcher: action delete start
 */
export default function* watchDeleteDevice() {
  yield takeLatest(MMSX_DELETE_DEVICE_START, doDeleteDevice)
}
