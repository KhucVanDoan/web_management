import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchVoucherFailed,
  searchVoucherSuccess,
  WMSX_SEARCH_VOUCHER_START,
} from '../../actions/voucher'

/**
 * Search voucher api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchVoucherApi = (params) => {
  const uri = `/v1/warehouse-yard/vouchers/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchVoucher(action) {
  try {
    const response = yield call(searchVoucherApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchVoucherSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchVoucherFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Voucher
 */
export default function* watchSearchVouchers() {
  yield takeLatest(WMSX_SEARCH_VOUCHER_START, doSearchVoucher)
}
