import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getAllDeviceSuccess,
  getAllDeviceFail,
  GET_ALL_DEVICE_START,
} from '../../actions/common'

const getAllDeviceApi = () => {
  const url = `v1/mms/devices/all-devices`
  return api.get(url)
}

function* doGetAllDevice(action) {
  try {
    const response = yield call(getAllDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getAllDeviceSuccess(response.data))
      if (action.onSuccess) yield action.onSuccess(response.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllDeviceFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetAllDevice() {
  yield takeLatest(GET_ALL_DEVICE_START, doGetAllDevice)
}
