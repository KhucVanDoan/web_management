import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteDeviceAssignSuccess,
  deleteDeviceAssignFail,
  MMSX_DELETE_DEVICE_ASSIGN_START,
} from '../../actions/device-assign'

const deleteDeviceAssign = (params) => {
  const url = `v1/mms/devices/assign-device/${params}`
  return api.delete(url)
}

function* doDeleteDeviceAssign(action) {
  try {
    const response = yield call(deleteDeviceAssign, action?.payload)
    if (response.statusCode === 200) {
      yield put(deleteDeviceAssignSuccess(action.payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteDeviceAssignFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteDeviceAssignFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteDeviceAssign() {
  yield takeLatest(MMSX_DELETE_DEVICE_ASSIGN_START, doDeleteDeviceAssign)
}
