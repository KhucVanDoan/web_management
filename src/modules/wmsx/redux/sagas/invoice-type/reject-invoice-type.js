import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectInvoiceTypeByIdFailed,
  rejectInvoiceTypeByIdSuccess,
  WMSX_REJECT_INVOICE_TYPE_START,
} from '../../actions/invoice-type'

/**
 * Reject invoice type
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectInvoiceTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/invoice-types/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectInvoiceType(action) {
  try {
    const response = yield call(rejectInvoiceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectInvoiceTypeByIdSuccess(response.payload))

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
    yield put(rejectInvoiceTypeByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectInvoiceType() {
  yield takeLatest(WMSX_REJECT_INVOICE_TYPE_START, doRejectInvoiceType)
}
