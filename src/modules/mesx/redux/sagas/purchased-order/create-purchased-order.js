import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createPurchasedOrderFailed,
  createPurchasedOrderSuccess,
  CREATE_PURCHASED_ORDER_START,
} from '~/modules/mesx/redux/actions/purchased-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createPurchasedOrdersApi = (params) => {
  const uri = `/v1/sales/purchased-orders/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreatePurchasedOrder(action) {
  try {
    const response = yield call(createPurchasedOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createPurchasedOrderSuccess(response.data))

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
    yield put(createPurchasedOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreatePurchasedOrder() {
  yield takeLatest(CREATE_PURCHASED_ORDER_START, doCreatePurchasedOrder)
}
