import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_START,
  getProducingStepListByItemMoDashboardFail,
  getProducingStepListByItemMoDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get producing step list by item and MO dashboard API
 * @returns {Promise}
 */
const getProducingStepListByItemMoDashboardApi = (params) => {
  const { moId, itemId } = params

  const uri = `/v1/quality-controls/dashboards/mo/${moId}/bom-items/${itemId}/produce-steps`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProducingStepListByItemMoDashboard(action) {
  try {
    const response = yield call(getProducingStepListByItemMoDashboardApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getProducingStepListByItemMoDashboardSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getProducingStepListByItemMoDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get producing step list by item and MO dashboard
 */
export default function* watchGetProducingStepListByItemMoDashboard() {
  yield takeLatest(GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_START, doGetProducingStepListByItemMoDashboard)
}
