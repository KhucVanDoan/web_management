import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createReturnOrderFailed,
  createReturnOrderSuccess,
  CREATE_RETURN_ORDER_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createReturnOrdersApi = (params) => {
  const uri = `/v1/sales/return-orders/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateReturnOrder(action) {
  try {
    const response = yield call(createReturnOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createReturnOrderSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createReturnOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateReturnOrder() {
  yield takeLatest(CREATE_RETURN_ORDER_START, doCreateReturnOrder)
}
