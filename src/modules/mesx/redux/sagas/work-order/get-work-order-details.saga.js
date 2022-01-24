import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWorkOrderDetailsByIdFailed,
  getWorkOrderDetailsByIdSuccess,
  GET_WORK_ORDER_DETAILS_START,
} from '~/modules/mesx/redux/actions/work-order.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWorkOrderDetailsApi = (params) => {
  const uri = `/v1/produces/work-orders/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWorkOrderDetails(action) {
  try {
    const response = yield call(getWorkOrderDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWorkOrderDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    console.log(error)
    yield put(getWorkOrderDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWorkOrderDetails() {
  yield takeLatest(GET_WORK_ORDER_DETAILS_START, doGetWorkOrderDetails)
}
