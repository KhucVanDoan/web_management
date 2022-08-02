import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  printQRItemsFailed,
  printQRItemsSuccess,
  PRINT_QR_ITEMS_START,
} from '~/modules/database/redux/actions/define-item'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Print QR items
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const printQRItemsApi = (params) => {
  const uri = `/v1/items/qr-code/print`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doPrintQRItems(action) {
  try {
    const response = yield call(printQRItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(printQRItemsSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(printQRItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch print QR items
 */
export default function* watchPrintQRItems() {
  yield takeLatest(PRINT_QR_ITEMS_START, doPrintQRItems)
}
