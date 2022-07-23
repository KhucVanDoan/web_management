import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getMaintainInfoDeviceAssignSuccess,
  getMaintainInfoDeviceAssignFail,
  MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_START,
} from '../../actions/device-assign'

export const maintainInfoDeviceAssign = (params) => {
  const url = `v1/mms/devices/assign-device/${params.id}/maintain-info`
  return api.get(url, { deviceAssignId: params.deviceAssignId })
}

function* doMaintainInfoDeviceAssign(action) {
  try {
    const response = yield call(maintainInfoDeviceAssign, action.payload)
    if (response.statusCode === 200) {
      yield put(getMaintainInfoDeviceAssignSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        yield put(getMaintainInfoDeviceAssignFail())
        if (action.onError) {
          yield action.onError()
        }
      }
    }
  } catch (error) {
    yield put(getMaintainInfoDeviceAssignFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchMaintainInfoDeviceAssign() {
  yield takeLatest(
    MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_START,
    doMaintainInfoDeviceAssign,
  )
}
