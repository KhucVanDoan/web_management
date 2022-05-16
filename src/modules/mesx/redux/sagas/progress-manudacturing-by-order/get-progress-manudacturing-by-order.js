import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProgressManufacturingByOrderSuccess,
  getProgressManufacturingByOrderFailed,
  GET_PROGRESS_MANUFACTURING_BY_ORDER_START,
} from '~/modules/mesx/redux/actions/progress-by-order'
import { api } from '~/services/api'

/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProgressmanufacturingByOrdertApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/statistic/sale-orders`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProgressManufacturingByOrder(action) {
  try {
    const response = yield call(
      getProgressmanufacturingByOrdertApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getProgressManufacturingByOrderSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProgressManufacturingByOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Get data saga
 */
export default function* watchProgressManuFacturingByOrderData() {
  yield takeLatest(
    GET_PROGRESS_MANUFACTURING_BY_ORDER_START,
    doGetProgressManufacturingByOrder,
  )
}
