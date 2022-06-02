import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmPaymentTypeByIdFailed,
  confirmPaymentTypeByIdSuccess,
  CONFIRM_PAYMENT_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-payment-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmPaymentTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/payment-types/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmPaymentType(action) {
  try {
    const response = yield call(confirmPaymentTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmPaymentTypeByIdSuccess(response.payload))

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
    yield put(confirmPaymentTypeByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmPaymentType() {
  yield takeLatest(CONFIRM_PAYMENT_TYPE_START, doConfirmPaymentType)
}
