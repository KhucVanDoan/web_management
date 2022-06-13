import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updatePurchasedOrderFailed,
  updatePurchasedOrderSuccess,
  UPDATE_PURCHASED_ORDER_START,
} from '~/modules/database/redux/actions/purchased-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Update purchased-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updatePurchasedOrderApi = (params) => {
  const uri = `/v1/sales/purchased-orders/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdatePurchasedOrder(action) {
  try {
    const response = yield call(updatePurchasedOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updatePurchasedOrderSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updatePurchasedOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchUpdatePurchasedOrder() {
  yield takeLatest(UPDATE_PURCHASED_ORDER_START, doUpdatePurchasedOrder)
}
