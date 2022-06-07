import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createImportManufacturingOrderFailed,
  createImportManufacturingOrderSuccess,
  WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_START,
} from '../../actions/import-manufacturing-order'

/**
 * Create import manufacturing order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createImportManufacturingOrdersApi = (params) => {
  const uri = `/v1/sales/import-orders/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateImportManufacturingOrder(action) {
  try {
    const response = yield call(
      createImportManufacturingOrdersApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(createImportManufacturingOrderSuccess(response.data))

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
    yield put(createImportManufacturingOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateImportManufacturingOrder() {
  yield takeLatest(
    WMSX_CREATE_IMPORT_MANUFACTURING_ORDER_START,
    doCreateImportManufacturingOrder,
  )
}
