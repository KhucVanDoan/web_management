import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDataProductivityCompareReportFailed,
  getDataProductivityCompareReportSuccess,
  GET_DATA_PRODUCTIVITY_COMPARE_REPORT_START,
} from '~/modules/mesx/redux/actions/productivity-compare-report'
import { api } from '~/services/api'

/**
 * get data productivities report
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDataProductivityCompareReportApi = (params) => {
  const uri = `/v1/produces/reports/productivity-assessments`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDataProductivityCompareReport(action) {
  try {
    const response = yield call(
      getDataProductivityCompareReportApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getDataProductivityCompareReportSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDataProductivityCompareReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get data
 */
export default function* watchGetDataProductivityCompareReport() {
  yield takeLatest(
    GET_DATA_PRODUCTIVITY_COMPARE_REPORT_START,
    doGetDataProductivityCompareReport,
  )
}
