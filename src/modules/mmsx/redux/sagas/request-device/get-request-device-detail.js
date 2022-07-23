import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getRequestDeviceDetailFailed,
  getRequestDeviceDetailSuccess,
  GET_REQUEST_DEVICE_DETAIL_START,
} from '../../actions/request-device'

const getRequestDeviceDetailApi = (params) => {
  const url = `v1/mms/device-requests/request-tickets/${params}`
  return api.get(url)
}

function* doGetRequestDeviceDetail(action) {
  try {
    const response = yield call(getRequestDeviceDetailApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getRequestDeviceDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRequestDeviceDetailFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetRequestDeviceDetail() {
  yield takeLatest(GET_REQUEST_DEVICE_DETAIL_START, doGetRequestDeviceDetail)
}
