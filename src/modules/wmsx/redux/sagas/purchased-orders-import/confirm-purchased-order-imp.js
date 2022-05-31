import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmPOImportByIdFailed,
  confirmPOImportByIdSuccess,
  CONFIRM_PO_IMPORT_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmPOImportApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmPOImport(action) {
  try {
    const response = yield call(confirmPOImportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmPOImportByIdSuccess(response.payload))

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
    yield put(confirmPOImportByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmPOImport() {
  yield takeLatest(CONFIRM_PO_IMPORT_START, doConfirmPOImport)
}
