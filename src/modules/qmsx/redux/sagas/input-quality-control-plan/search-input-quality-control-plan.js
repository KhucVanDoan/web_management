import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchInputQcPlanFail,
  searchInputQcPlanSuccess,
  SEARCH_INPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'
import { api } from '~/services/api'
/**
 * Search input quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInputQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/input/quality-plans`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInputQcPlan(action) {
  try {
    const response = yield call(searchInputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      yield put(searchInputQcPlanSuccess(payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchInputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search input quality control plan
 */
export default function* watchSearchInputQcPlan() {
  yield takeLatest(SEARCH_INPUT_QUALITY_CONTROL_PLAN_START, doSearchInputQcPlan)
}
