import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_IN_PROGRESS_MO_LIST_DASHBOARD_START,
  getInProgressMoListDashboardFail,
  getInProgressMoListDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get in-progress MO list API
 * @returns {Promise}
 */
const getInProgressMoListDashboardApi = () => {
  const uri = `/v1/quality-controls/dashboards/mo/in-progress/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInProgressMoDashboard(action) {
  try {
    const response = yield call(getInProgressMoListDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInProgressMoListDashboardSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getInProgressMoListDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get in-progress MO list
 */
export default function* watchGetInProgressMoDashboard() {
  yield takeLatest(GET_IN_PROGRESS_MO_LIST_DASHBOARD_START, doGetInProgressMoDashboard)
}
