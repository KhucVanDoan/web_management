import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getAllConfirmDeviceCategoryFailed,
  getAllConfirmDeviceCategorySuccess,
  GET_ALL_CONFRIM_DEVICE_CATEGORY_START,
} from '../../actions/device-category'

const getAllConfirmDeviceCategory = () => {
  const queryParams = {
    isGetAll: 1,
  }
  const url = `v1/mms/device-groups/list`
  return api.get(url, queryParams)
}

function* doGetAllConfirmDeviceCategory(action) {
  try {
    const response = yield call(getAllConfirmDeviceCategory, action?.payload)

    if (response.statusCode === 200) {
      yield put(getAllConfirmDeviceCategorySuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllConfirmDeviceCategoryFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAllConfirmDeviceCategory() {
  yield takeLatest(
    GET_ALL_CONFRIM_DEVICE_CATEGORY_START,
    doGetAllConfirmDeviceCategory,
  )
}
