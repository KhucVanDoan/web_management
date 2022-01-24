import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSaleOrdersFailed,
  getSaleOrdersSuccess,
  GET_SALE_ORDERS_START,
} from '~/modules/mesx/redux/actions/common.action'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getSaleOrdersApi = (params) => {
  const uri = `/v1/sales/sale-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetSaleOrders(action) {
  try {
    const response = yield call(getSaleOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getSaleOrdersSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSaleOrdersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search SOExport
 */
export default function* watchGetSaleOrders() {
  yield takeLatest(GET_SALE_ORDERS_START, doGetSaleOrders)
}
