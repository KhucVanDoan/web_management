import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ERROR_GROUP_DASHBOARD_START,
  getErrorReportStatusDashboardFail,
  getErrorReportStatusDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get error report status API
 * @returns {Promise}
 */
const getErrorReportStatusDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/error-reports/status`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetErrorReportStatusDashboard(action) {
  try {
    const response = yield call(getErrorReportStatusDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getErrorReportStatusDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getErrorReportStatusDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get error report status
 */
export default function* watchGetErrorReportStatusDashboard() {
  yield takeLatest(GET_ERROR_GROUP_DASHBOARD_START, doGetErrorReportStatusDashboard)
}
