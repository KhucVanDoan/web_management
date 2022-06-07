import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  importVoucherFailed,
  importVoucherSuccess,
  WMSX_IMPORT_VOUCHER_START,
} from '../../actions/voucher'

/**
 * import Voucher
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importVoucherApi = (body) => {
  const uri = `/v1/warehouse-yard/vouchers/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportVoucher(action) {
  try {
    const response = yield call(importVoucherApi, action?.payload)

    if (response) {
      yield put(importVoucherSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importVoucherFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Voucher
 */
export default function* watchImportVoucher() {
  yield takeLatest(WMSX_IMPORT_VOUCHER_START, doImportVoucher)
}
