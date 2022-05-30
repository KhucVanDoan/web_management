import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectBillByIdFailed,
  rejectBillByIdSuccess,
  WMSX_REJECT_BILL_START,
} from '../../actions/define-bill'

/**
 * Reject bill
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectBillApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectBill(action) {
  try {
    const response = yield call(rejectBillApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectBillByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectBillByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch reject bill
 */
export default function* watchRejectBill() {
  yield takeLatest(WMSX_REJECT_BILL_START, doRejectBill)
}
