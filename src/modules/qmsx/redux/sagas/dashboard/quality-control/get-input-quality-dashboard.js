import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_INPUT_QUALITY_DASHBOARD_START,
  getInputQualityDashboardFail,
  getInputQualityDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get input quality API
 * @returns {Promise}
 */
const getInputQualityDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/input/progress`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInputQualityDashboard(action) {
  try {
    const response = yield call(getInputQualityDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInputQualityDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getInputQualityDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get input quality
 */
export default function* watchGetInputQualityDashboard() {
  yield takeLatest(GET_INPUT_QUALITY_DASHBOARD_START, doGetInputQualityDashboard)
}
