import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_START,
  getProductionOutputQualityDashboardFail,
  getProductionOutputQualityDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get production output quality API
 * @returns {Promise}
 */
const getProductionOutputQualityDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/producing-steps/progress`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductionOutputQualityDashboard(action) {
  try {
    const response = yield call(getProductionOutputQualityDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProductionOutputQualityDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getProductionOutputQualityDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get production output quality
 */
export default function* watchGetProductionOutputQualityDashboard() {
  yield takeLatest(GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_START, doGetProductionOutputQualityDashboard)
}
