import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createVendorFailed,
  createVendorSuccess,
  CREATE_VENDOR_START,
} from '../../actions/define-vendor'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createVendorApi = (params) => {
  const uri = `/v1/sales/vendors/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateVendor(action) {
  try {
    const response = yield call(createVendorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createVendorSuccess(response.data))

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
    yield put(createVendorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateVendor() {
  yield takeLatest(CREATE_VENDOR_START, doCreateVendor)
}
