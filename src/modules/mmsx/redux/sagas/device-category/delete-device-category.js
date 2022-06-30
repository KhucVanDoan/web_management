import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteDeviceCategorySuccess,
  deleteDeviceCategoryFail,
  DELETE_DEVICE_CATEGORY_START,
} from '../../actions/device-category'

const deleteDeviceCategoryApi = (params) => {
  const url = `v1/mms/device-groups/${params}`
  return api.delete(url)
}

function* doDeleteDevicesCategory(action) {
  try {
    const response = yield call(deleteDeviceCategoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteDeviceCategorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteDeviceCategoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteDeviceCategory() {
  yield takeLatest(DELETE_DEVICE_CATEGORY_START, doDeleteDevicesCategory)
}
