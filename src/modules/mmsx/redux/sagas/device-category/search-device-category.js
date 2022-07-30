import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchDeviceCategoryFail,
  searchDeviceCategorySuccess,
  SEARCH_DEVICE_CATEGORY_START,
} from '../../actions/device-category'

export const searchDeviceCategory = (params) => {
  const url = `v1/mms/device-groups/list`
  return api.get(url, params)
}

function* doSearchDeviceCategory(action) {
  try {
    const response = yield call(searchDeviceCategory, action?.payload)
    if (response.statusCode === 200) {
      yield put(searchDeviceCategorySuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDeviceCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchDeviceCategory() {
  yield takeLatest(SEARCH_DEVICE_CATEGORY_START, doSearchDeviceCategory)
}
