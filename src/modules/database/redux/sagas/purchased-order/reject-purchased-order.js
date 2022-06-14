import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectPurchasedOrderByIdFailed,
  rejectPurchasedOrderByIdSuccess,
  REJECT_PURCHASED_ORDER_START,
} from '~/modules/database/redux/actions/purchased-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Reject purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectPurchasedOrderApi = (params) => {
  const uri = `/v1/sales/purchased-orders/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectPurchasedOrder(action) {
  try {
    const response = yield call(rejectPurchasedOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectPurchasedOrderByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'purchasedOrder.rejectPurchasedOrderSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectPurchasedOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectPurchasedOrder() {
  yield takeLatest(REJECT_PURCHASED_ORDER_START, doRejectPurchasedOrder)
}
