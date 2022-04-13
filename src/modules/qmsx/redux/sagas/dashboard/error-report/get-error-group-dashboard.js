import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ERROR_GROUP_DASHBOARD_START,
  getErrorGroupDashboardFail,
  getErrorGroupDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get error group dashboard API
 * @returns {Promise}
 */
const getErrorGroupDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/error-groups`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetErrorGroupDashboard(action) {
  try {
    const response = yield call(getErrorGroupDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getErrorGroupDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getErrorGroupDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get error dashboard group
 */
export default function* watchGetErrorGroupDashboard() {
  yield takeLatest(GET_ERROR_GROUP_DASHBOARD_START, doGetErrorGroupDashboard)
}
