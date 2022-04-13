import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchProductionQcPlanFail,
  searchProductionQcPlanSuccess,
  SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
/**
 * Search production quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProductionQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/production/quality-plans`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProductionQcPlan(action) {
  try {
    const response = yield call(searchProductionQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      yield put(searchProductionQcPlanSuccess(payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchProductionQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production quality control plan
 */
export default function* watchSearchProductionQcPlan() {
  yield takeLatest(
    SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    doSearchProductionQcPlan,
  )
}
