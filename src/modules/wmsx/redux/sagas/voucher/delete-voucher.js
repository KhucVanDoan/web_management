import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteVoucherFailed,
  deleteVoucherSuccess,
  WMSX_DELETE_VOUCHER_START,
} from '../../actions/voucher'
/**
 * Delete voucher
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteVoucherApi = (params) => {
  const uri = `/v1/warehouse-yard/vouchers/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteVoucher(action) {
  try {
    const response = yield call(deleteVoucherApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteVoucherSuccess(response.data))

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
    yield put(deleteVoucherFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete voucher
 */
export default function* watchDeleteVoucher() {
  yield takeLatest(WMSX_DELETE_VOUCHER_START, doDeleteVoucher)
}
