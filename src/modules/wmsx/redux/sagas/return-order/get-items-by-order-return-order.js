import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemsByOrderReturnOrderFailed,
  getItemsByOrderReturnOrderSuccess,
  GET_ITEMS_BY_ORDER_RETURN_ORDER_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'

/**
 * Get stock list
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemsByOrderReturnOrderApi = (params) => {
  const uri = `/v1/sales/return-orders/order/${params.orderId}/return-type/${params.returnType}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemsByOrderReturnOrder(action) {
  try {
    const response = yield call(getItemsByOrderReturnOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemsByOrderReturnOrderSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemsByOrderReturnOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get stock by item
 */
export default function* watchGetItemsByOrderReturnOrder() {
  yield takeLatest(
    GET_ITEMS_BY_ORDER_RETURN_ORDER_START,
    doGetItemsByOrderReturnOrder,
  )
}
