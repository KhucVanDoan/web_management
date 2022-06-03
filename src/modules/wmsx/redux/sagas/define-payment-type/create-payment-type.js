import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createPaymentTypeFailed,
  createPaymentTypeSuccess,
  CREATE_PAYMENT_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-payment-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createPaymentTypesApi = (params) => {
  const uri = `/v1/warehouse-yard/payment-types`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreatePaymentType(action) {
  try {
    const response = yield call(createPaymentTypesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createPaymentTypeSuccess(response.data))

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
    yield put(createPaymentTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreatePaymentType() {
  yield takeLatest(CREATE_PAYMENT_TYPE_START, doCreatePaymentType)
}
