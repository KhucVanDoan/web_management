import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateImportManufacturingOrderFailed,
  updateImportManufacturingOrderSuccess,
  WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_START,
} from '../../actions/import-manufacturing-order'

/**
 * Update import manufacturing order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateImportManufacturingOrderApi = (params) => {
  const uri = `/v1/sales/import-orders/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateImportManufacturingOrder(action) {
  try {
    const response = yield call(
      updateImportManufacturingOrderApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateImportManufacturingOrderSuccess(response.data))

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
    yield put(updateImportManufacturingOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search import-manufacturing-orders
 */
export default function* watchUpdateImportManufacturingOrder() {
  yield takeLatest(
    WMSX_UPDATE_IMPORT_MANUFACTURING_ORDER_START,
    doUpdateImportManufacturingOrder,
  )
}
