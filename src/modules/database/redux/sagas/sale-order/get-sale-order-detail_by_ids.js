import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSaleOrderDetailsByIdsSuccess,
  getSaleOrderDetailsByIdsFailed,
  GET_SALE_ORDER_DETAIL_BY_IDS_START,
} from '~/modules/database/redux/actions/sale-order'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getSaleOrderDetailsApi = (params) => {
  const uri = `/v1/sales/sale-orders/list-by-ids`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetSaleOrderDetailByIds(action) {
  try {
    const response = yield call(getSaleOrderDetailsApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getSaleOrderDetailsByIdsSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSaleOrderDetailsByIdsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watrchetSaleOrderDetailByIds() {
  yield takeLatest(
    GET_SALE_ORDER_DETAIL_BY_IDS_START,
    doGetSaleOrderDetailByIds,
  )
}
