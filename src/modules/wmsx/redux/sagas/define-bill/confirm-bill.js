import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmBillByIdFailed,
  confirmBillByIdSuccess,
  WMSX_CONFIRM_BILL_START,
} from '../../actions/define-bill'

/**
 * Confirm bill
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmBillApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmBill(action) {
  try {
    const response = yield call(confirmBillApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmBillByIdSuccess(response.payload))

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
    yield put(confirmBillByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm bill
 */
export default function* watchConfirmBill() {
  yield takeLatest(WMSX_CONFIRM_BILL_START, doConfirmBill)
}
