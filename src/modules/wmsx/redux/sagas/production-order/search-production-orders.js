import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchProductionOrdersFailed,
  searchProductionOrdersSuccess,
  WMSX_SEARCH_PRODUCTION_ORDERS_START,
} from '../../actions/production-order'

/**
 * Search production-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProductionOrdersApi = (params) => {
  const uri = `/v1/sales/production-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProductionOrders(action) {
  try {
    const response = yield call(searchProductionOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchProductionOrdersSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchProductionOrdersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchSearchProductionOrders() {
  yield takeLatest(
    WMSX_SEARCH_PRODUCTION_ORDERS_START,
    doSearchProductionOrders,
  )
}
