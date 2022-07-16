import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateDeviceAssignSuccess,
  updateDeviceAssignFail,
  MMSX_UPDATE_DEVICE_ASSIGN_START,
} from '../../actions/device-assign'

const updateDeviceAssign = (params) => {
  const url = `v1/mms/devices/assign-device/${params.id}`
  return api.put(url, params)
}

function* doUpdateDeviceAssign(action) {
  try {
    const response = yield call(updateDeviceAssign, action.payload)
    if (response.statusCode === 200) {
      yield put(updateDeviceAssignSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateDeviceAssignFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateDeviceAssignFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateDeviceAssign() {
  yield takeLatest(MMSX_UPDATE_DEVICE_ASSIGN_START, doUpdateDeviceAssign)
}
