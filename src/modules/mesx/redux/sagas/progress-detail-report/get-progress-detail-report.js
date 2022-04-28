import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProgressDetailReportFailed,
  getProgressDetailReportSuccess,
  GET_PROGRESS_DETAIL_REPORT_START,
} from '~/modules/mesx/redux/actions/progress-detail-report'
import { api } from '~/services/api'

/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProgressDeatilReportApi = (params) => {
  const uri = `/v1/produces/producing-steps/reports/progress/dashboard`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProgressDetailReports(action) {
  try {
    const response = yield call(getProgressDeatilReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProgressDetailReportSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProgressDetailReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Get data saga
 */
export default function* watchProgressDetailReportData() {
  yield takeLatest(GET_PROGRESS_DETAIL_REPORT_START, doGetProgressDetailReports)
}
