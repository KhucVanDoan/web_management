import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createSaleOrderFailed,
  createSaleOrderSuccess,
  CREATE_SALE_ORDER_START,
} from '~/modules/mesx/redux/actions/sale-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createSaleOrdersApi = (params) => {
  const uri = `/v1/sales/sale-orders/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateSaleOrder(action) {
  try {
    const response = yield call(createSaleOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createSaleOrderSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'saleOrder.createSaleOrderSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createSaleOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateSaleOrder() {
  yield takeLatest(CREATE_SALE_ORDER_START, doCreateSaleOrder)
}
