import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateSaleOrderFailed,
  updateSaleOrderSuccess,
  UPDATE_SALE_ORDER_START,
} from 'modules/mesx/redux/actions/sale-order.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Update sale-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateSaleOrderApi = (params) => {
  const uri = `/v1/sales/sale-orders/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateSaleOrder(action) {
  try {
    const response = yield call(updateSaleOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateSaleOrderSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'saleOrder.updateSaleOrderSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateSaleOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search sale-orders
 */
export default function* watchUpdateSaleOrder() {
  yield takeLatest(UPDATE_SALE_ORDER_START, doUpdateSaleOrder)
}
