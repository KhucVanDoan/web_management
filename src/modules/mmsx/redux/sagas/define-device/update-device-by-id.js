import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateDeviceFailed,
  updateDeviceSuccess,
  MMSX_UPDATE_DEVICE_START,
} from '../../actions/define-device'

const updateDeviceApi = (params) => {
  const url = `v1/mms/web/devices`
  return api.put(url, params)
}

//worker
function* doUpdateDevice(action) {
  try {
    const response = yield call(updateDeviceApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(updateDeviceSuccess(response?.data))

      //Call back on success
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateDeviceFailed())
    //Call back on error
    if (action.onError) {
      yield action.onError()
    }
  }
}

//watcher
export default function* watchUpdateDevice() {
  yield takeLatest(MMSX_UPDATE_DEVICE_START, doUpdateDevice)
}
