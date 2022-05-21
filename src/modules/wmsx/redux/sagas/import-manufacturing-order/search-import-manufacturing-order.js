import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchImportManufacturingOrdersFailed,
  searchImportManufacturingOrdersSuccess,
  WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_START,
} from '../../actions/import-manufacturing-order'

/**
 * Search import manufacturing order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchImportManufacturingOrdersApi = (params) => {
  const uri = `/v1/sales/import-orders/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchImportManufacturingOrders(action) {
  try {
    const response = yield call(
      searchImportManufacturingOrdersApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchImportManufacturingOrdersSuccess(payload))

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
    yield put(searchImportManufacturingOrdersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search import-manufacturing-orders
 */
export default function* watchSearchImportManufacturingOrders() {
  yield takeLatest(
    WMSX_SEARCH_IMPORT_MANUFACTURING_ORDERS_START,
    doSearchImportManufacturingOrders,
  )
}
