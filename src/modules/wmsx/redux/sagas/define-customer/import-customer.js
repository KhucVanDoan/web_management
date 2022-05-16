import { call, put, takeLatest } from 'redux-saga/effects'

import {
  importCustomerFailed,
  importCustomerSuccess,
  WMSX_IMPORT_CUSTOMER_START,
} from '~/modules/wmsx/redux/actions/define-customer'
import { api } from '~/services/api'
/**
 * import customer
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importCustomerApi = (body) => {
  const uri = `/v1/sales/customers/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportCustomer(action) {
  try {
    const response = yield call(importCustomerApi, action?.payload)

    if (response) {
      yield put(importCustomerSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importCustomerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportCustomer() {
  yield takeLatest(WMSX_IMPORT_CUSTOMER_START, doImportCustomer)
}
