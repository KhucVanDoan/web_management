import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateProductionOrderFailed,
  updateProductionOrderSuccess,
  WMSX_UPDATE_PRODUCTION_ORDER_START,
} from '../../actions/production-order'

/**
 * Update production-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateProductionOrderApi = (params) => {
  const uri = `/v1/sales/production-orders/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateProductionOrder(action) {
  try {
    const response = yield call(updateProductionOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateProductionOrderSuccess(response.data))

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
    yield put(updateProductionOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateProductionOrder() {
  yield takeLatest(WMSX_UPDATE_PRODUCTION_ORDER_START, doUpdateProductionOrder)
}
