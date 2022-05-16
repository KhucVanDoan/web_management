import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  importVendorFailed,
  importVendorSuccess,
  IMPORT_VENDOR_START,
} from '../../actions/define-vendor'

/**
 * import vendor
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importVendorApi = (body) => {
  const uri = `/v1/sales/vendors/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportVendor(action) {
  try {
    const response = yield call(importVendorApi, action?.payload)

    if (response) {
      yield put(importVendorSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importVendorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportVendor() {
  yield takeLatest(IMPORT_VENDOR_START, doImportVendor)
}
