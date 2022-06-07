import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateVoucherFailed,
  updateVoucherSuccess,
  WMSX_UPDATE_VOUCHER_START,
} from '../../actions/voucher'
/**
 * Update Voucher API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateVoucherApi = (params) => {
  const uri = `/v1/warehouse-yard/vouchers/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateVoucher(action) {
  try {
    const response = yield call(updateVoucherApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateVoucherSuccess(response.data))

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
    yield put(updateVoucherFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch Update Voucher
 */
export default function* watchUpdateVoucher() {
  yield takeLatest(WMSX_UPDATE_VOUCHER_START, doUpdateVoucher)
}
