import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deletePaymentTypeFailed,
  deletePaymentTypeSuccess,
  DELETE_PAYMENT_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-payment-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deletePaymentTypeApi = (params) => {
  const uri = `/v1/warehouse-yard/payment-types/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeletePaymentType(action) {
  try {
    const response = yield call(deletePaymentTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deletePaymentTypeSuccess(response.data))

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
    yield put(deletePaymentTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeletePaymentType() {
  yield takeLatest(DELETE_PAYMENT_TYPE_START, doDeletePaymentType)
}
