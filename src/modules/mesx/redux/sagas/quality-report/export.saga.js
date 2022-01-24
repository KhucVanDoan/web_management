import { call, put, takeLatest } from 'redux-saga/effects'

import {
  EXPORT_QUALITY_REPORTS,
  exportQualityReportsSuccess,
} from '~/modules/mesx/redux/actions/quality-report.action'
import { api } from '~/services/api'

/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getQualityReportsApi = (params) => {
  const uri = `/v1/reports/produces/boqs-quality/reports/list`
  return api.get(uri, params)
  // return res;
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doExportQualityReports(action) {
  try {
    const response = yield call(getQualityReportsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(exportQualityReportsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Get data saga
 */
export default function* watchExportQualityReportData() {
  yield takeLatest(EXPORT_QUALITY_REPORTS, doExportQualityReports)
}
