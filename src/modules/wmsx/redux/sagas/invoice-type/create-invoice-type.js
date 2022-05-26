import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createInvoiceTypeFailed,
  createInvoiceTypeSuccess,
  WMSX_CREATE_INVOICE_TYPE_START,
} from '../../actions/invoice-type'

/**
 * Create invoice type api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createInvoiceTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/invoice-types/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateInvoiceType(action) {
  try {
    const response = yield call(createInvoiceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createInvoiceTypeSuccess(response.data))

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
    yield put(createInvoiceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateInvoiceType() {
  yield takeLatest(WMSX_CREATE_INVOICE_TYPE_START, doCreateInvoiceType)
}
