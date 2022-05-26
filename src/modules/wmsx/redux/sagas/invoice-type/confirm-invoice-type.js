import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmInvoiceTypeByIdFailed,
  confirmInvoiceTypeByIdSuccess,
  WMSX_CONFIRM_INVOICE_TYPE_START,
} from '../../actions/invoice-type'

/**
 * Confirm invoice type
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmInvoiceTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/invoice-types/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmInvoiceType(action) {
  try {
    const response = yield call(confirmInvoiceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmInvoiceTypeByIdSuccess(response.payload))

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
    yield put(confirmInvoiceTypeByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm invoice type
 */
export default function* watchConfirmInvoiceType() {
  yield takeLatest(WMSX_CONFIRM_INVOICE_TYPE_START, doConfirmInvoiceType)
}
