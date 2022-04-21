import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPurchasedOrderDetailsByIdFailed,
  getPurchasedOrderDetailsByIdSuccess,
  GET_PURCHASED_ORDER_DETAILS_START,
} from '~/modules/mesx/redux/actions/purchased-order'
import { api } from '~/services/api'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPurchasedOrderDetailsApi = (params) => {
  const uri = `/v1/sales/purchased-orders/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPurchasedOrderDetails(action) {
  try {
    const response = yield call(getPurchasedOrderDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getPurchasedOrderDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPurchasedOrderDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetPurchasedOrderDetails() {
  yield takeLatest(
    GET_PURCHASED_ORDER_DETAILS_START,
    doGetPurchasedOrderDetails,
  )
}
