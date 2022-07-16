import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getMaintainRequestDeviceAssignSuccess,
  getMaintainRequestDeviceAssignFail,
  MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_START,
} from '../../actions/device-assign'

const maintainRequestDeviceAssign = (params) => {
  const url = `v1/mms/devices/assign-device/${params}/maintain-request`
  return api.get(url)
}

function* doMaintainRequestDeviceAssign(action) {
  try {
    const response = yield call(maintainRequestDeviceAssign, action.payload)
    if (response.statusCode === 200) {
      yield put(getMaintainRequestDeviceAssignSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        yield put(getMaintainRequestDeviceAssignFail())
        if (action.onError) {
          yield action.onError()
        }
      }
    }
  } catch (error) {
    yield put(getMaintainRequestDeviceAssignFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchMaintainRequestDeviceAssign() {
  yield takeLatest(
    MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_START,
    doMaintainRequestDeviceAssign,
  )
}
