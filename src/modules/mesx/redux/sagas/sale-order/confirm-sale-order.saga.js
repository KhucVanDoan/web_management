import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'

import { NOTIFICATION_TYPE } from 'common/constants'
import {
  confirmSaleOrderByIdFailed,
  confirmSaleOrderByIdSuccess,
  CONFIRM_SALE_ORDER_START,
} from 'modules/mesx/redux/actions/sale-order.action'

/**
 * Confirm sale order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmSaleOrderApi = (params) => {
  const uri = `/v1/sales/sale-orders/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmSaleOrder(action) {
  try {
    const response = yield call(confirmSaleOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmSaleOrderByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'saleOrder.confirmSaleOrderSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmSaleOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmSaleOrder() {
  yield takeLatest(CONFIRM_SALE_ORDER_START, doConfirmSaleOrder)
}
