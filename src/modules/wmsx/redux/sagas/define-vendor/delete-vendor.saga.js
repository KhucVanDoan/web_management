import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteVendorFailed,
  deleteVendorSuccess,
  DELETE_VENDOR_START,
} from '../../actions/define-vendor'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteVendorApi = (params) => {
  const uri = `/v1/sales/vendors/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteVendor(action) {
  try {
    const response = yield call(deleteVendorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteVendorSuccess(response.results))

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
    yield put(deleteVendorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteVendor() {
  yield takeLatest(DELETE_VENDOR_START, doDeleteVendor)
}
