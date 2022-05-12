import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseExportDetailsByIdFailed,
  getWarehouseExportDetailsByIdSuccess,
  WMSX_GET_WAREHOUSE_EXPORT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-export'
import { api } from '~/services/api'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseExportDetailsApi = (params) => {
  const uri = `/v1/warehouses/movements/${params}/mobile`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseExportDetails(action) {
  try {
    const response = yield call(getWarehouseExportDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseExportDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseExportDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseExportDetails() {
  yield takeLatest(
    WMSX_GET_WAREHOUSE_EXPORT_DETAILS_START,
    doGetWarehouseExportDetails,
  )
}
