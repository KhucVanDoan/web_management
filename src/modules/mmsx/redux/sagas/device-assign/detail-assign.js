import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  detailDeviceAssignSuccess,
  detailDeviceAssignFail,
  MMSX_DETAIL_DEVICE_ASSIGN_START,
} from '../../actions/device-assign'

const detailDeviceAssign = (params) => {
  const url = `v1/mms/devices/assign-device/${params}`
  return api.get(url)
}

function* doDetailDeviceAssign(action) {
  try {
    const response = yield call(detailDeviceAssign, action?.payload)
    if (response.statusCode === 200) {
      yield put(detailDeviceAssignSuccess(response?.data))
      if (action?.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(detailDeviceAssignFail())
      if (action?.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(detailDeviceAssignFail())
    if (action?.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDetailDeviceAssign() {
  yield takeLatest(MMSX_DETAIL_DEVICE_ASSIGN_START, doDetailDeviceAssign)
}
