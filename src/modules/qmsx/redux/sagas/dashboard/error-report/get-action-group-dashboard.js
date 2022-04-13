import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ACTION_GROUP_DASHBOARD_START,
  getActionGroupDashboardFail,
  getActionGroupDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get action group dashboard API
 * @returns {Promise}
 */
const getActionGroupDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/action-categories`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetActionGroupDashboard(action) {
  try {
    const response = yield call(getActionGroupDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getActionGroupDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getActionGroupDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get action group dashboard
 */
export default function* watchGetActionGroupDashboard() {
  yield takeLatest(GET_ACTION_GROUP_DASHBOARD_START, doGetActionGroupDashboard)
}
