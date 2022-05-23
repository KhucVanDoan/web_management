import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectVoucherIdFailed,
  rejectVoucherIdSuccess,
  WMSX_REJECT_VOUCHER_START,
} from '../../actions/voucher'

/**
 * Reject warehouse area
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectVoucherApi = (params) => {
  const uri = `/v1/warehouses/voucher/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectVoucher(action) {
  try {
    const response = yield call(rejectVoucherApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectVoucherIdSuccess(response.payload))

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
    yield put(rejectVoucherIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Reject Voucher
 */
export default function* watchRejectVoucher() {
  yield takeLatest(WMSX_REJECT_VOUCHER_START, doRejectVoucher)
}
