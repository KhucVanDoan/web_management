import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_QC_PROGRESS_DASHBOARD_START,
  getQcProgressDashboardFail,
  getQcProgressDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get QC progress API
 * @returns {Promise}
 */
const getQcProgressDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/overall/progress`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQcProgressDashboard(action) {
  try {
    const response = yield call(getQcProgressDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getQcProgressDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getQcProgressDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get QC progress
 */
export default function* watchGetQcProgressDashboard() {
  yield takeLatest(GET_QC_PROGRESS_DASHBOARD_START, doGetQcProgressDashboard)
}
