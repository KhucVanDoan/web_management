import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deletePurchasedOrderFailed,
  deletePurchasedOrderSuccess,
  DELETE_PURCHASED_ORDER_START,
} from '~/modules/mesx/redux/actions/purchased-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deletePurchasedOrderApi = (params) => {
  const uri = `/v1/sales/purchased-orders/${params}`
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
function* doDeletePurchasedOrder(action) {
  try {
    const response = yield call(deletePurchasedOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deletePurchasedOrderSuccess(response.data))

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
    yield put(deletePurchasedOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeletePurchasedOrder() {
  yield takeLatest(DELETE_PURCHASED_ORDER_START, doDeletePurchasedOrder)
}
