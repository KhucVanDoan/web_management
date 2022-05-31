import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSaleOrderDetailsByIdFailed,
  getSaleOrderDetailsByIdSuccess,
  GET_SALE_ORDER_DETAILS_START,
} from '~/modules/database/redux/actions/sale-order'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getSaleOrderDetailsApi = (params) => {
  const uri = `/v1/sales/sale-orders/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetSaleOrderDetails(action) {
  try {
    const response = yield call(getSaleOrderDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getSaleOrderDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSaleOrderDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetSaleOrderDetails() {
  yield takeLatest(GET_SALE_ORDER_DETAILS_START, doGetSaleOrderDetails)
}
