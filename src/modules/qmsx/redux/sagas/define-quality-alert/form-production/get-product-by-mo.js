import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProductsByMoFail,
  getProductsByMoSuccess,
  GET_PRODUCTS_BY_MO_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'

/**
 * get product by mo-id API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductsByMOApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-list-item-by-manufacturing-order-id/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductsByMo(action) {
  try {
    const response = yield call(getProductsByMOApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getProductsByMoSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductsByMoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get MO
 */
export default function* watchGetProductsByMo() {
  yield takeLatest(GET_PRODUCTS_BY_MO_START, doGetProductsByMo)
}
