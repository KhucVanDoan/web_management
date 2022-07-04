import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getDeviceDetailByIdFailed,
  getDeviceDetailByIdSuccess,
  MMSX_GET_DEVICE_DETAIL_START,
} from '../../actions/define-device'

const getDeviceDetailByIdApi = (params) => {
  const uri = `v1/mms/web/devices/${params}`
  return api.get(uri)
}

function* doGetDeviceDetailById(action) {
  try {
    const response = yield call(getDeviceDetailByIdApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceDetailByIdSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDeviceDetailByIdFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDeviceDetailById() {
  yield takeLatest(MMSX_GET_DEVICE_DETAIL_START, doGetDeviceDetailById)
}
