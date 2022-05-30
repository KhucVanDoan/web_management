import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  importBillFailed,
  importBillSuccess,
  WMSX_IMPORT_BILL_START,
} from '../../actions/define-bill'

/**
 * import bill
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importBillApi = (body) => {
  const uri = `/v1/sales/purchased-orders/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportBill(action) {
  try {
    const response = yield call(importBillApi, action?.payload)

    if (response) {
      yield put(importBillSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importBillFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import bill
 */
export default function* watchImportBill() {
  yield takeLatest(WMSX_IMPORT_BILL_START, doImportBill)
}
