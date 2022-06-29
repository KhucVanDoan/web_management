import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateReturnOrderFailed,
  updateReturnOrderSuccess,
  UPDATE_RETURN_ORDER_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update warehouse transfer API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateReturnOrderApi = (params) => {
  const uri = `/v1/sales/return-orders/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateReturnOrder(action) {
  try {
    const response = yield call(updateReturnOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateReturnOrderSuccess(response.data))

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
    yield put(updateReturnOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update warehouse transfer
 */
export default function* watchUpdateReturnOrder() {
  yield takeLatest(UPDATE_RETURN_ORDER_START, doUpdateReturnOrder)
}
