import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateInvoiceTypeFailed,
  updateInvoiceTypeSuccess,
  WMSX_UPDATE_INVOICE_TYPE_START,
} from '../../actions/invoice-type'

/**
 * Update invoice API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateInvoiceTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/invoice-types/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateInvoiceType(action) {
  try {
    const response = yield call(updateInvoiceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInvoiceTypeSuccess(response.data))

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
    yield put(updateInvoiceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update invoice type
 */
export default function* watchUpdateInvoiceType() {
  yield takeLatest(WMSX_UPDATE_INVOICE_TYPE_START, doUpdateInvoiceType)
}
