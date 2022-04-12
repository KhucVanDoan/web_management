import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_ITEM_LIST_BY_MO_DASHBOARD_START,
  getItemListByMoDashboardFail,
  getItemListByMoDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get item list by MO dashboard API
 * @returns {Promise}
 */
const getItemListByMoDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/mo/${params.moId}/bom-items/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemListByMoDashboard(action) {
  try {
    const response = yield call(getItemListByMoDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getItemListByMoDashboardSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getItemListByMoDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get item list by MO dashboard
 */
export default function* watchGetItemListByMoDashboard() {
  yield takeLatest(GET_ITEM_LIST_BY_MO_DASHBOARD_START, doGetItemListByMoDashboard)
}
