import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteSaleOrderFailed,
  DELETE_SALE_ORDER_START,
} from '~/modules/mesx/redux/actions/sale-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteSaleOrderApi = (params) => {
  const uri = `/v1/sales/sale-orders/${params}`
  return api.delete(uri)
  // return {
  //   statusCode: 200,
  //   results: { API: 'DELETE_USER', id: 0, name: 'abada' },
  // };
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteSaleOrder(action) {
  try {
    const response = yield call(deleteSaleOrderApi, action?.payload)
    if (response?.statusCode === 200) {
      // yield put(deleteSaleOrderSuccess())

      addNotification(
        'saleOrder.deleteSaleOrderSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteSaleOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteSaleOrder() {
  yield takeLatest(DELETE_SALE_ORDER_START, doDeleteSaleOrder)
}
