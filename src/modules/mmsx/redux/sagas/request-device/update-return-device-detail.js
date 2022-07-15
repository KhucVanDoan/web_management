import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateReturnDeviceDetailFailed,
  updateReturnDeviceDetailSuccess,
  UPDATE_RETURN_DEVICE_DETAIL_START,
} from '../../actions/request-device'

const updateReturnDeviceDetailApi = (params) => {
  const url = `v1/mms/device-requests/return-tickets`
  return api.put(url, params)
}

function* doUpdateReturnDeviceDetail(action) {
  try {
    const response = yield call(updateReturnDeviceDetailApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(updateReturnDeviceDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateReturnDeviceDetailFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateReturnDeviceDetail() {
  yield takeLatest(
    UPDATE_RETURN_DEVICE_DETAIL_START,
    doUpdateReturnDeviceDetail,
  )
}
