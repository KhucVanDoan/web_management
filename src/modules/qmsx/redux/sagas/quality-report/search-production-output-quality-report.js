import { call, put, takeLatest } from 'redux-saga/effects'

import {
  SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_START,
  searchProductionOutputQualityReportFail,
  searchProductionOutputQualityReportSuccess,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Search production output quality report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProductionOutputQualityReportApi = (params) => {
  const uri = `/v1/quality-controls/reports/list-qc-operation-product`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProductionOutputQualityReport(action) {
  try {
    const response = yield call(
      searchProductionOutputQualityReportApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchProductionOutputQualityReportSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(payload)
      }
    }
  } catch (error) {
    yield put(searchProductionOutputQualityReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production output quality report
 */
export default function* watchSearchProductionOutputQualityReport() {
  yield takeLatest(
    SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_START,
    doSearchProductionOutputQualityReport,
  )
}
