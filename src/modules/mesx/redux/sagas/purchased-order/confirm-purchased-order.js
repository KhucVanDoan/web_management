import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmPurchasedOrderByIdFailed,
  confirmPurchasedOrderByIdSuccess,
  CONFIRM_PURCHASED_ORDER_START,
} from '~/modules/mesx/redux/actions/purchased-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmPurchasedOrderApi = (params) => {
  const uri = `/v1/sales/purchased-orders/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmPurchasedOrder(action) {
  try {
    const response = yield call(confirmPurchasedOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmPurchasedOrderByIdSuccess(response.payload))

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
    yield put(confirmPurchasedOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmPurchasedOrder() {
  yield takeLatest(CONFIRM_PURCHASED_ORDER_START, doConfirmPurchasedOrder)
}
