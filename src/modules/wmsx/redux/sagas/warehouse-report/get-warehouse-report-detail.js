import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseReportDetailsByIdFailed,
  getWarehouseReportDetailsByIdSuccess,
  WMSX_GET_WAREHOUSE_REPORT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-report'
import { api } from '~/services/api'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseReportDetailsApi = (params) => {
  const uri = `/v1/warehouses/reports/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseReportDetails(action) {
  try {
    const response = yield call(getWarehouseReportDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseReportDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseReportDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseReportDetails() {
  yield takeLatest(
    WMSX_GET_WAREHOUSE_REPORT_DETAILS_START,
    doGetWarehouseReportDetails,
  )
}
