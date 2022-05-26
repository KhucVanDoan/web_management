import { call, put, takeLatest } from 'redux-saga/effects'

import {
  importPaymentTypeFailed,
  importPaymentTypeSuccess,
  IMPORT_PAYMENT_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-payment-type'
import { api } from '~/services/api'

/**
 * import payment type
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importPaymentTypeApi = (body) => {
  const uri = `/v1/warehouse-yard/payment-types/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportPaymentType(action) {
  try {
    const response = yield call(importPaymentTypeApi, action?.payload)

    if (response) {
      yield put(importPaymentTypeSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importPaymentTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportPaymentType() {
  yield takeLatest(IMPORT_PAYMENT_TYPE_START, doImportPaymentType)
}
