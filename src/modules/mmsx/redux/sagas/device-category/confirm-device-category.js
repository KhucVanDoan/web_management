import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmDeviceCategorySuccess,
  confirmDeviceCategoryFail,
  CONFIRM_DEVICE_CATEGORY_START,
} from '../../actions/device-category'

const confirmDeviceCategoryApi = (params) => {
  const url = `v1/mms/device-groups/${params}/confirmed`
  return api.put(url)
}

function* doConfirmDeviceCategory(action) {
  try {
    const response = yield call(confirmDeviceCategoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmDeviceCategorySuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmDeviceCategoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmDeviceCategory() {
  yield takeLatest(CONFIRM_DEVICE_CATEGORY_START, doConfirmDeviceCategory)
}
