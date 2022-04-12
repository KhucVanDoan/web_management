import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_SUMMARY_DASHBOARD_START,
  getSummaryDashboardFail,
  getSummaryDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get summary dashboard API
 * @returns {Promise}
 */
const getSummaryDashboardApi = () => {
  const uri = `/v1/quality-controls/dashboards/summary`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetSummaryDashboard(action) {
  try {
    const response = yield call(getSummaryDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getSummaryDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getSummaryDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get summary dashboard
 */
export default function* watchGetSummaryDashboard() {
  yield takeLatest(GET_SUMMARY_DASHBOARD_START, doGetSummaryDashboard)
}
