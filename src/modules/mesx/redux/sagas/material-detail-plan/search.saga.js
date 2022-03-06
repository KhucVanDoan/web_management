import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchMaterialDetailPlanFailed,
  searchMaterialDetailPlanSuccess,
  SEARCH_MATERIAL_DETAIL_PLAN_START,
} from '~/modules/mesx/redux/actions/material-detail-plan.action'
import { api } from '~/services/api'

/**
 * Search material detail plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchMaterialDetailPlanApi = (params) => {
  const uri = `v1/produces/reports/materials`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchMaterialDetailPlan(action) {
  try {
    const response = yield call(searchMaterialDetailPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        data: response.data,
      }
      yield put(searchMaterialDetailPlanSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchMaterialDetailPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchMaterialDetailPlan() {
  yield takeLatest(
    SEARCH_MATERIAL_DETAIL_PLAN_START,
    doSearchMaterialDetailPlan,
  )
}
