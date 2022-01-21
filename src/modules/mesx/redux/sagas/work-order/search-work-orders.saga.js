import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  searchWorkOrdersFailed,
  searchWorkOrdersSuccess,
  SEARCH_WORK_ORDERS_START,
} from 'modules/mesx/redux/actions/work-order.action'

/**
 * Search inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWorkOrdersApi = (params) => {
  const uri = `/v1/produces/work-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWorkOrders(action) {
  try {
    const response = yield call(searchWorkOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWorkOrdersSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    console.log(error)
    yield put(searchWorkOrdersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchSearchWorkOrders() {
  yield takeLatest(SEARCH_WORK_ORDERS_START, doSearchWorkOrders)
}
