import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteProductionOrderFailed,
  deleteProductionOrderSuccess,
  WMSX_DELETE_PRODUCTION_ORDER_START,
} from '../../actions/production-order'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteProductionOrderApi = (params) => {
  const uri = `/v1/sales/production-orders/${params}`
  return api.delete(uri)
  // return {
  //   statusCode: 200,
  //   results: { API: 'DELETE_USER', id: 0, name: 'abada' },
  // };
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteProductionOrder(action) {
  try {
    const response = yield call(deleteProductionOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteProductionOrderSuccess(response.data))

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
    yield put(deleteProductionOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteProductionOrder() {
  yield takeLatest(WMSX_DELETE_PRODUCTION_ORDER_START, doDeleteProductionOrder)
}
