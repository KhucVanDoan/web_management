import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchOutputQcPlanFail,
  searchOutputQcPlanSuccess,
  SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
/**
 * Search output quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchOutputQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/output/quality-plans`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchOutputQcPlan(action) {
  try {
    const response = yield call(searchOutputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      yield put(searchOutputQcPlanSuccess(payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchOutputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search output quality control plan
 */
export default function* watchSearchOutputQcPlan() {
  yield takeLatest(
    SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_START,
    doSearchOutputQcPlan,
  )
}
