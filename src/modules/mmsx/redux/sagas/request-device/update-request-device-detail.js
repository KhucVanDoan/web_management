import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateRequestDeviceDetailFailed,
  updateRequestDeviceDetailSuccess,
  UPDATE_REQUEST_DEVICE_DETAIL_START,
} from '../../actions/request-device'

const updateRequestDeviceDetailApi = (params) => {
  const url = `v1/mms/device-requests/request-tickets`
  return api.put(url, params)
}

function* doUpdateRequestDeviceDetail(action) {
  try {
    const response = yield call(updateRequestDeviceDetailApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(updateRequestDeviceDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateRequestDeviceDetailFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateRequestDeviceDetail() {
  yield takeLatest(
    UPDATE_REQUEST_DEVICE_DETAIL_START,
    doUpdateRequestDeviceDetail,
  )
}
