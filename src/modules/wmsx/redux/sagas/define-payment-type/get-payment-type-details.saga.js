import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPaymentTypeDetailsByIdFailed,
  getPaymentTypeDetailsByIdSuccess,
  GET_PAYMENT_TYPE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-payment-type'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const getPaymentTypeDetailsApi = (params) => {
  const uri = `/v1/warehouse-yard/payment-types/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPaymentTypeDetails(action) {
  try {
    const response = yield call(getPaymentTypeDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getPaymentTypeDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPaymentTypeDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetPaymentTypeDetails() {
  yield takeLatest(GET_PAYMENT_TYPE_DETAILS_START, doGetPaymentTypeDetails)
}
