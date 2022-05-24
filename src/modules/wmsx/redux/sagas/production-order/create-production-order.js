import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createProductionOrderFailed,
  createProductionOrderSuccess,
  WMSX_CREATE_PRODUCTION_ORDER_START,
} from '../../actions/production-order'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createProductionOrdersApi = (params) => {
  const uri = `/v1/sales/production-orders/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateProductionOrder(action) {
  try {
    const response = yield call(createProductionOrdersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createProductionOrderSuccess(response.data))

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
    yield put(createProductionOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateProductionOrder() {
  yield takeLatest(WMSX_CREATE_PRODUCTION_ORDER_START, doCreateProductionOrder)
}
