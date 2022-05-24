import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDataWarehouseSpaceReportFailed,
  getDataWarehouseSpaceReportSuccess,
  SEARCH_DATA_WAREHOUSE_SPACE_REPORT_START,
} from '~/modules/wmsx/redux/actions/warehouse-space-report'
import { api } from '~/services/api'

/**
 * get data warehouse space reports
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const getDataWarehouseSpaceReportApi = (params) => {
  const uri = `/v1/warehouses/reports/${params.warehouseId}/sectors/volumes`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDataWarehouseSpaceReport(action) {
  try {
    const response = yield call(getDataWarehouseSpaceReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDataWarehouseSpaceReportSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDataWarehouseSpaceReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get data
 */
export default function* watchGetDataWarehouseSpaceReport() {
  yield takeLatest(
    SEARCH_DATA_WAREHOUSE_SPACE_REPORT_START,
    doGetDataWarehouseSpaceReport,
  )
}
