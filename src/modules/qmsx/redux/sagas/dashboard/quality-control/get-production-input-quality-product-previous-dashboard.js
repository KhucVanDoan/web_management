import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_START,
  getProductionInputQualityProductPreviousDashboardFail,
  getProductionInputQualityProductPreviousDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get production input quality (product of previous stage) API
 * @returns {Promise}
 */
const getProductionInputQualityProductPreviousDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/input/previous-boms`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductionInputQualityProductPreviousDashboard(action) {
  try {
    const response = yield call(
      getProductionInputQualityProductPreviousDashboardApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(
        getProductionInputQualityProductPreviousDashboardSuccess(
          response?.data,
        ),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getProductionInputQualityProductPreviousDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get production input quality (product of previous stage)
 */
export default function* watchGetProductionInputQualityProductPreviousDashboard() {
  yield takeLatest(
    GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_START,
    doGetProductionInputQualityProductPreviousDashboard,
  )
}
