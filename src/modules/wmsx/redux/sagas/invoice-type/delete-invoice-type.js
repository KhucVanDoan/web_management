import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteInvoiceTypeFailed,
  deleteInvoiceTypeSuccess,
  WMSX_DELETE_INVOICE_TYPE_START,
} from '../../actions/invoice-type'

/**
 * Delete invoice type api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteInvoiceTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/invoice-types/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteInvoiceType(action) {
  try {
    const response = yield call(deleteInvoiceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteInvoiceTypeSuccess(response.results))

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
    yield put(deleteInvoiceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteInvoiceType() {
  yield takeLatest(WMSX_DELETE_INVOICE_TYPE_START, doDeleteInvoiceType)
}
