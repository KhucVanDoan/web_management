import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createDeviceCategoryFail,
  createDeviceCategorySuccess,
  CREATE_DEVICE_CATEGORY_START,
} from '../../actions/device-category'

const createDeviceCategory = (params) => {
  const url = `/v1/mms/device-groups`
  return api.post(url, params)
}

function* doCreateDeviceCategory(action) {
  try {
    const response = yield call(createDeviceCategory, action?.payload)
    if (response?.statusCode === 200) {
      yield put(createDeviceCategorySuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createDeviceCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateDeviceCategory() {
  yield takeLatest(CREATE_DEVICE_CATEGORY_START, doCreateDeviceCategory)
}
