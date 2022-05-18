import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getProductionOrderDetailsByIdFailed,
  getProductionOrderDetailsByIdSuccess,
  WMSX_GET_PRODUCTION_ORDER_DETAILS_START,
} from '../../actions/production-order'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductionOrderDetailsApi = (params) => {
  const uri = `/v1/sales/production-orders/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductionOrderDetails(action) {
  try {
    const response = yield call(getProductionOrderDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProductionOrderDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductionOrderDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetProductionOrderDetails() {
  yield takeLatest(
    WMSX_GET_PRODUCTION_ORDER_DETAILS_START,
    doGetProductionOrderDetails,
  )
}
