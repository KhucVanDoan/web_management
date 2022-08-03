import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_QUALITY_REPORTS,
  getQualityReportsSuccess,
} from '~/modules/mesx/redux/actions/quality-report'
import { api } from '~/services/api'

/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getQualityReportsApi = (params) => {
  const uri = `/v1/produces/reports/boqs-quality/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQualityReports(action) {
  try {
    const response = yield call(getQualityReportsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getQualityReportsSuccess(response.data))

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
export default function* watchQualityReportData() {
  yield takeLatest(GET_QUALITY_REPORTS, doGetQualityReports)
}
