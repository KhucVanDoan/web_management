import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailDeviceStatusSuccess,
  getDetailDeviceStatusFail,
  GET_DETAIL_DEVICE_STATUS,
} from '~/modules/mmsx/redux/actions/device-status'
import { api } from '~/services/api'

/**
 * Search user API
 * @returns {Promise}
 */
const getDetailDeviceStatusApi = (id) => {
  const uri = `v1/mms/device-status/${id}/list-info-active`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailDeviceStatus(action) {
  try {
    const response = yield call(getDetailDeviceStatusApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailDeviceStatusSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailDeviceStatusFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailDeviceStatus() {
  yield takeLatest(GET_DETAIL_DEVICE_STATUS, doGetDetailDeviceStatus)
}
