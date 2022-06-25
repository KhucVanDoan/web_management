import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmReturnOrderByIdFailed,
  confirmReturnOrderByIdSuccess,
  CONFIRM_RETURN_ORDER_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmReturnOrderApi = (params) => {
  const uri = `/v1/sales/return-orders/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmReturnOrder(action) {
  try {
    const response = yield call(confirmReturnOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmReturnOrderByIdSuccess(response.payload))

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
    yield put(confirmReturnOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmReturnOrder() {
  yield takeLatest(CONFIRM_RETURN_ORDER_START, doConfirmReturnOrder)
}
