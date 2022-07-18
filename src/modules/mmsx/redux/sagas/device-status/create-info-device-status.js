import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createInfoDeviceStatusSuccess,
  createInfoDeviceStatusFail,
  CREATE_INFO_DEVICE_STATUS,
} from '~/modules/mmsx/redux/actions/device-status'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @returns {Promise}
 */
const createInfoDataApi = (params) => {
  const uri = `v1/mms/device-status/info-active-create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateInfoData(action) {
  try {
    const response = yield call(createInfoDataApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createInfoDeviceStatusSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createInfoDeviceStatusFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateInfoData() {
  yield takeLatest(CREATE_INFO_DEVICE_STATUS, doCreateInfoData)
}
