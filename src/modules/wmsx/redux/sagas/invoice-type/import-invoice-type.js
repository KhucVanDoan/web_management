import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  importInvoiceTypeFailed,
  importInvoiceTypeSuccess,
  WMSX_IMPORT_INVOICE_TYPE_START,
} from '../../actions/invoice-type'

/**
 * import invoice types
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importInvoiceTypeApi = (body) => {
  const uri = `/v1/warehouse-yard/invoice-types/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportInvoiceType(action) {
  try {
    const response = yield call(importInvoiceTypeApi, action?.payload)

    if (response) {
      yield put(importInvoiceTypeSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importInvoiceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportInvoiceType() {
  yield takeLatest(WMSX_IMPORT_INVOICE_TYPE_START, doImportInvoiceType)
}
