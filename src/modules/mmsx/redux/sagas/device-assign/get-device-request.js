import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDeviceRequestSuccess,
  getDeviceRequestFail,
  MMSX_GET_DEVICE_REQUESTS_START,
} from '../../actions/device-assign'

const getDeviceRequest = () => {
  const url = `v1/mms/device-requests`
  return api.get(url)
}

function* doGetDeviceRequest(action) {
  try {
    const response = yield call(getDeviceRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceRequestSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getDeviceRequestFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDeviceRequestFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDeviceRequest() {
  yield takeLatest(MMSX_GET_DEVICE_REQUESTS_START, doGetDeviceRequest)
}
