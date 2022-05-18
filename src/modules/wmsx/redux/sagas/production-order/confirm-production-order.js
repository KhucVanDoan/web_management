import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmProductionOrderByIdFailed,
  confirmProductionOrderByIdSuccess,
  WMSX_CONFIRM_PRODUCTION_ORDER_START,
} from '../../actions/production-order'

/**
 * Confirm production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmProductionOrderApi = (params) => {
  const uri = `/v1/sales/production-orders/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmProductionOrder(action) {
  try {
    const response = yield call(confirmProductionOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmProductionOrderByIdSuccess(response.payload))

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
    yield put(confirmProductionOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmProductionOrder() {
  yield takeLatest(
    WMSX_CONFIRM_PRODUCTION_ORDER_START,
    doConfirmProductionOrder,
  )
}
