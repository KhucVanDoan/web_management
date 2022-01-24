import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchSaleOrdersFailed,
  searchSaleOrdersSuccess,
  SEARCH_SALE_ORDERS_START,
} from '~/modules/mesx/redux/actions/sale-order.action'
import { api } from '~/services/api'

/**
 * Search sale-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchSaleOrdersApi = (params) => {
  const uri = `/v1/sales/sale-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchSaleOrders(action) {
  try {
    const response = yield call(searchSaleOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchSaleOrdersSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchSaleOrdersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search sale-orders
 */
export default function* watchSearchSaleOrders() {
  yield takeLatest(SEARCH_SALE_ORDERS_START, doSearchSaleOrders)
}
