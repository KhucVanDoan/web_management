import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteReturnOrderFailed,
  deleteReturnOrderSuccess,
  DELETE_RETURN_ORDER_START,
} from '~/modules/wmsx/redux/actions/return-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteReturnOrderApi = (params) => {
  const uri = `/v1/sales/return-orders/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteReturnOrder(action) {
  try {
    const response = yield call(deleteReturnOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteReturnOrderSuccess(response.data))

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
    yield put(deleteReturnOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete warehouse area
 */
export default function* watchDeleteReturnOrder() {
  yield takeLatest(DELETE_RETURN_ORDER_START, doDeleteReturnOrder)
}
