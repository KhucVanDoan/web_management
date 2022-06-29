import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateDetailDeviceCategorySuccess,
  updateDetailDeviceCategoryfail,
  UPDATE_DEVICE_CATEGORY_START,
} from '../../actions/device-category'

const updateDetailDeviceCategory = (params) => {
  const url = `v1/mms/device-groups/${params.id}`
  return api.put(url, params.body)
}

function* doUpdateDeviceCategory(action) {
  try {
    const response = yield call(updateDetailDeviceCategory, action?.payload)

    if (response.statusCode === 200) {
      yield put(updateDetailDeviceCategorySuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateDetailDeviceCategoryfail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateDeviceCategory() {
  yield takeLatest(UPDATE_DEVICE_CATEGORY_START, doUpdateDeviceCategory)
}
