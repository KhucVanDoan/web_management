import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmVoucherIdFailed,
  confirmVoucherIdSuccess,
  WMSX_CONFIRM_VOUCHER_START,
} from '../../actions/voucher'

/**
 * confirm voucher
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmVoucherApi = (params) => {
  const uri = `/v1/warehouse-yard/vouchers/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmVoucher(action) {
  try {
    const response = yield call(confirmVoucherApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmVoucherIdSuccess(response.payload))

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
    yield put(confirmVoucherIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm Voucher
 */
export default function* watchConfirmVoucher() {
  yield takeLatest(WMSX_CONFIRM_VOUCHER_START, doConfirmVoucher)
}
