import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPurchasedOrderNotCreatePOimpFailed,
  getPurchasedOrderNotCreatePOimpSuccess,
  GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'

/**
 * Search purchased-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPurchasedOrderNotCreatePOimpApi = (params) => {
  const uri = `/v1/sales/purchased-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPurchasedOrderNotCreatePOimp(action) {
  try {
    const response = yield call(
      getPurchasedOrderNotCreatePOimpApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getPurchasedOrderNotCreatePOimpSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPurchasedOrderNotCreatePOimpFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchGetPurchasedOrderNotCreatePOimp() {
  yield takeLatest(
    GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START,
    doGetPurchasedOrderNotCreatePOimp,
  )
}
