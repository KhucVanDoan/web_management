import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchOutputQualityReportFail,
  searchOutputQualityReportSuccess,
  SEARCH_OUTPUT_QUALITY_REPORT_START,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Search output quality report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchOutputQualityReportApi = (params) => {
  const uri = `/v1/quality-controls/reports/list-qc-output`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchOutputQualityReport(action) {
  try {
    const response = yield call(searchOutputQualityReportApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchOutputQualityReportSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(searchOutputQualityReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search output quality report
 */
export default function* watchSearchOutputQualityReport() {
  yield takeLatest(SEARCH_OUTPUT_QUALITY_REPORT_START, doSearchOutputQualityReport)
}
