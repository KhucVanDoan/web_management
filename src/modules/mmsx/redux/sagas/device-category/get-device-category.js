import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getDeviceCategoryDetailSuccess,
  getDeviceCategoryDetailFail,
  GET_DEVICE_CATEGORY_START,
} from '../../actions/device-category'

const getDetailDeviceCategory = (params) => {
  const url = `v1/mms/device-groups/${params}`
  return api.get(url)
}

function* doGetDetailDeviceCategory(action) {
  try {
    const response = yield call(getDetailDeviceCategory, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDeviceCategoryDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDeviceCategoryDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDetailDeviceCategory() {
  yield takeLatest(GET_DEVICE_CATEGORY_START, doGetDetailDeviceCategory)
}
