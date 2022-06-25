import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchReturnOrdersFailed,
  searchReturnOrdersSuccess,
  SEARCH_RETURN_ORDERS_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search warehouse-transfer API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchReturnOrdersApi = (params) => {
  const uri = `/v1/sales/return-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchReturnOrders(action) {
  try {
    const response = yield call(searchReturnOrdersApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchReturnOrdersSuccess(payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchReturnOrdersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search warehouse-transfers
 */
export default function* watchSearchReturnOrders() {
  yield takeLatest(SEARCH_RETURN_ORDERS_START, doSearchReturnOrders)
}
