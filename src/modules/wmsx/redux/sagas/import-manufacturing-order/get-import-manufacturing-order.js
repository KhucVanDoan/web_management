import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getImportManufacturingOrderDetailsByIdFailed,
  getImportManufacturingOrderDetailsByIdSuccess,
  WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_START,
} from '../../actions/import-manufacturing-order'

/**
 * Get import manufacturing order detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getImportManufacturingOrderDetailsApi = (params) => {
  const uri = `/v1/sales/import-orders/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetImportManufacturingOrderDetails(action) {
  try {
    const response = yield call(
      getImportManufacturingOrderDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getImportManufacturingOrderDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getImportManufacturingOrderDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetImportManufacturingOrderDetails() {
  yield takeLatest(
    WMSX_GET_IMPORT_MANUFACTURING_ORDER_DETAILS_START,
    doGetImportManufacturingOrderDetails,
  )
}
