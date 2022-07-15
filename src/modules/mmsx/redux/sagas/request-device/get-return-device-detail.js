import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getReturnDeviceDetailFailed,
  getReturnDeviceDetailSuccess,
  GET_RETURN_DEVICE_DETAIL_START,
} from '../../actions/request-device'

const getReturnDeviceDetailApi = (params) => {
  const url = `v1/mms/device-requests/return-tickets/${params}`
  return api.get(url)
}

function* doGetReturnDeviceDetail(action) {
  try {
    const response = yield call(getReturnDeviceDetailApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getReturnDeviceDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getReturnDeviceDetailFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetReturnDeviceDetail() {
  yield takeLatest(GET_RETURN_DEVICE_DETAIL_START, doGetReturnDeviceDetail)
}
