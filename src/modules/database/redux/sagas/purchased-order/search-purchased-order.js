import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchPurchasedOrdersFailed,
  searchPurchasedOrdersSuccess,
  SEARCH_PURCHASED_ORDERS_START,
} from '~/modules/database/redux/actions/purchased-order'
import { api } from '~/services/api'
/**
 * Search purchased-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchPurchasedOrdersApi = (params) => {
  const uri = `/v1/sales/purchased-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchPurchasedOrders(action) {
  try {
    const response = yield call(searchPurchasedOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchPurchasedOrdersSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchPurchasedOrdersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchPurchasedOrders() {
  yield takeLatest(SEARCH_PURCHASED_ORDERS_START, doSearchPurchasedOrders)
}
