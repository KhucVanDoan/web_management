import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getRoutingByProductFail,
  getRoutingByProductSuccess,
  GET_ROUTING_BY_PRODUCT_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'

/**
 * get routing by product-id API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRoutingByProductApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-list-routing-by-item-id/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRoutingByProduct(action) {
  try {
    const response = yield call(getRoutingByProductApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getRoutingByProductSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRoutingByProductFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get routing by product-id
 */
export default function* watchGetRoutingByProduct() {
  yield takeLatest(GET_ROUTING_BY_PRODUCT_START, doGetRoutingByProduct)
}
