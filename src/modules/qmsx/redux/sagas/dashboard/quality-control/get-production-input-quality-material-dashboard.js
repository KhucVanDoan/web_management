import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_START,
  getProductionInputQualityMaterialDashboardFail,
  getProductionInputQualityMaterialDashboardSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get production input quality (material) API
 * @returns {Promise}
 */
const getProductionInputQualityMaterialDashboardApi = (params) => {
  const uri = `/v1/quality-controls/dashboards/input/materials`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductionInputQualityMaterialDashboard(action) {
  try {
    const response = yield call(
      getProductionInputQualityMaterialDashboardApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(
        getProductionInputQualityMaterialDashboardSuccess(
          response?.data,
        ),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getProductionInputQualityMaterialDashboardFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get production input quality (material)
 */
export default function* watchGetProductionInputQualityMaterialDashboard() {
  yield takeLatest(
    GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_START,
    doGetProductionInputQualityMaterialDashboard,
  )
}
