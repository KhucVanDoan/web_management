import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createDeviceAssignSuccess,
  createDeviceAssignFail,
  MMSX_CREATE_DEVICE_ASSIGN_START,
} from '../../actions/device-assign'

const createDeviceAssign = (params) => {
  const url = `v1/mms/devices/assign-device`
  return api.post(url, params)
}

function* doCreateDeviceAssign(action) {
  try {
    const response = yield call(createDeviceAssign, action.payload)
    if (response.statusCode === 200) {
      yield put(createDeviceAssignSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createDeviceAssignFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createDeviceAssignFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateDeviceAssign() {
  yield takeLatest(MMSX_CREATE_DEVICE_ASSIGN_START, doCreateDeviceAssign)
}
