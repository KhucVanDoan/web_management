import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchInputQualityReportFail,
  searchInputQualityReportSuccess,
  SEARCH_INPUT_QUALITY_REPORT_START,
} from '~/modules/qmsx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Search input quality report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInputQualityReportApi = (params) => {
  const uri = `/v1/quality-controls/reports/list-qc-input`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInputQualityReport(action) {
  try {
    const response = yield call(searchInputQualityReportApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchInputQualityReportSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(searchInputQualityReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search input quality report
 */
export default function* watchSearchInputQualityReport() {
  yield takeLatest(SEARCH_INPUT_QUALITY_REPORT_START, doSearchInputQualityReport)
}
