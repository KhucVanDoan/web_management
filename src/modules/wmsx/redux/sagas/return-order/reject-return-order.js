import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectReturnOrderByIdFailed,
  rejectReturnOrderByIdSuccess,
  REJECT_RETURN_ORDER_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectReturnOrderApi = (params) => {
  const uri = `/v1/sales/return-orders/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectReturnOrder(action) {
  try {
    const response = yield call(rejectReturnOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectReturnOrderByIdSuccess(response.payload))

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
    yield put(rejectReturnOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectReturnOrder() {
  yield takeLatest(REJECT_RETURN_ORDER_START, doRejectReturnOrder)
}
