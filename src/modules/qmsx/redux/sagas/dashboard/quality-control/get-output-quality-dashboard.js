import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_OUTPUT_QUALITY_DASHBOARD_START,
  getOutputQualityDashboardFail,
  getOutputQualityDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get output quality API
 * @returns {Promise}
 */
const getOutputQualityDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/output/progress`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOutputQualityDashboard(action) {
  try {
    const response = yield call(getOutputQualityDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getOutputQualityDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getOutputQualityDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get output quality
 */
export default function* watchGetOutputQualityDashboard() {
  yield takeLatest(GET_OUTPUT_QUALITY_DASHBOARD_START, doGetOutputQualityDashboard)
}
