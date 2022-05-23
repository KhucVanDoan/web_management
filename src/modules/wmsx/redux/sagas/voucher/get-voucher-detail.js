import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getVoucherByIdFailed,
  getVoucherByIdSuccess,
  WMSX_GET_VOUCHER_START,
} from '../../actions/voucher'

/**
 * Search Voucher API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getVouchersApi = (params) => {
  const uri = `/v1/warehouse-yard/vouchers/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetVouchers(action) {
  try {
    const response = yield call(getVouchersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getVoucherByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getVoucherByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search Voucher s
 */
export default function* watchGetVoucher() {
  yield takeLatest(WMSX_GET_VOUCHER_START, doGetVouchers)
}
