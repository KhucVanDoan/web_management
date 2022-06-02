import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updatePaymentTypeFailed,
  updatePaymentTypeSuccess,
  UPDATE_PAYMENT_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-payment-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Update inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updatePaymentTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/payment-types/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdatePaymentType(action) {
  try {
    const response = yield call(updatePaymentTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updatePaymentTypeSuccess(response.data))

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
    yield put(updatePaymentTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchUpdatePaymentType() {
  yield takeLatest(UPDATE_PAYMENT_TYPE_START, doUpdatePaymentType)
}
