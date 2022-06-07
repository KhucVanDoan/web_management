import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteImportManufacturingOrderFailed,
  deleteImportManufacturingOrderSuccess,
  WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_START,
} from '../../actions/import-manufacturing-order'

/**
 * Delete import manufacturing order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteImportManufacturingOrderApi = (params) => {
  const uri = `/v1/sales/import-orders/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteImportManufacturingOrder(action) {
  try {
    const response = yield call(
      deleteImportManufacturingOrderApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(deleteImportManufacturingOrderSuccess(response.data))

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
    yield put(deleteImportManufacturingOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteImportManufacturingOrder() {
  yield takeLatest(
    WMSX_DELETE_IMPORT_MANUFACTURING_ORDER_START,
    doDeleteImportManufacturingOrder,
  )
}
