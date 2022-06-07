import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectProductionOrderByIdFailed,
  rejectProductionOrderByIdSuccess,
  WMSX_REJECT_PRODUCTION_ORDER_START,
} from '../../actions/production-order'

/**
 * Reject production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectProductionOrderApi = (params) => {
  const uri = `/v1/sales/production-orders/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectProductionOrder(action) {
  try {
    const response = yield call(rejectProductionOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectProductionOrderByIdSuccess(response.payload))

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
    yield put(rejectProductionOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectProductionOrder() {
  yield takeLatest(WMSX_REJECT_PRODUCTION_ORDER_START, doRejectProductionOrder)
}
