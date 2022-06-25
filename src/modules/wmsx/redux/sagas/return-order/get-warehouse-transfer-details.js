import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getReturnOrderDetailsByIdFailed,
  getReturnOrderDetailsByIdSuccess,
  GET_RETURN_ORDER_DETAILS_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getReturnOrderDetailsApi = (params) => {
  const uri = `/v1/sales/return-orders/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetReturnOrderDetails(action) {
  try {
    const response = yield call(getReturnOrderDetailsApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getReturnOrderDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getReturnOrderDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetReturnOrderDetails() {
  yield takeLatest(GET_RETURN_ORDER_DETAILS_START, doGetReturnOrderDetails)
}
