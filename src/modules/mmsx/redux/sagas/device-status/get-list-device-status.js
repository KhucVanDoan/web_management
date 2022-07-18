import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getListDeviceStatusSuccess,
  getListDeviceStatusFail,
  GET_LIST_DEVICE_STATUS,
} from '~/modules/mmsx/redux/actions/device-status'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getListDeviceStatusApi = (params) => {
  const uri = `/v1/mms/device-status`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetListDeviceStatus(action) {
  try {
    const response = yield call(getListDeviceStatusApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getListDeviceStatusSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getListDeviceStatusFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetListDeviceStatus() {
  yield takeLatest(GET_LIST_DEVICE_STATUS, doGetListDeviceStatus)
}
