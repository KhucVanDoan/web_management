import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectImportManufacturingOrderByIdFailed,
  rejectImportManufacturingOrderByIdSuccess,
  WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_START,
} from '../../actions/import-manufacturing-order'

/**
 * Reject import manufacturing order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectImportManufacturingOrderApi = (params) => {
  const uri = `/v1/sales/import-orders/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectImportManufacturingOrder(action) {
  try {
    const response = yield call(
      rejectImportManufacturingOrderApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(rejectImportManufacturingOrderByIdSuccess(response.payload))

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
    yield put(rejectImportManufacturingOrderByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectImportManufacturingOrder() {
  yield takeLatest(
    WMSX_REJECT_IMPORT_MANUFACTURING_ORDER_START,
    doRejectImportManufacturingOrder,
  )
}
