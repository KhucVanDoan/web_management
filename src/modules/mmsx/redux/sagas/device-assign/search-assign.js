import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchDeviceAssignSuccess,
  searchDeviceAssignFailed,
  MMSX_SEARCH_DEVICE_ASSIGN_START,
} from '../../actions/device-assign'

const searchDeviceAssignApi = (params) => {
  const url = `v1/mms/device-assignment/list`
  return api.get(url, params)
}

function* doSearchDeviceAssign(action) {
  try {
    const response = yield call(searchDeviceAssignApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchDeviceAssignSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(searchDeviceAssignFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchDeviceAssignFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchDeviceAssign() {
  yield takeLatest(MMSX_SEARCH_DEVICE_ASSIGN_START, doSearchDeviceAssign)
}
