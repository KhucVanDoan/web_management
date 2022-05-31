import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectPOImportByIdFailed,
  rejectPOImportByIdSuccess,
  REJECT_PO_IMPORT_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectPOSImportApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectPOSImport(action) {
  try {
    const response = yield call(rejectPOSImportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectPOImportByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectPOImportByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectPOSImport() {
  yield takeLatest(REJECT_PO_IMPORT_START, doRejectPOSImport)
}
