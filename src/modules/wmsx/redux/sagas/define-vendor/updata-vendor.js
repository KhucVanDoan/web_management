import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateVendorFailed,
  updateVendorSuccess,
  UPDATE_VENDOR_START,
} from '../../actions/define-vendor'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateVendorApi = (params) => {
  const uri = `/v1/sales/vendors/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateVendor(action) {
  try {
    const response = yield call(updateVendorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateVendorSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateVendorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateVendor() {
  yield takeLatest(UPDATE_VENDOR_START, doUpdateVendor)
}
