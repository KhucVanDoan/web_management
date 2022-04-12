import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_CAUSE_GROUP_DASHBOARD_START,
  getCauseGroupDashboardFail,
  getCauseGroupDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get cause group dashboard API
 * @returns {Promise}
 */
const getCauseGroupDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/cause-groups`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCauseGroupDashboard(action) {
  try {
    const response = yield call(getCauseGroupDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getCauseGroupDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getCauseGroupDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get cause group dashboard
 */
export default function* watchGetCauseGroupDashboard() {
  yield takeLatest(GET_CAUSE_GROUP_DASHBOARD_START, doGetCauseGroupDashboard)
}
