import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPlanDetailsByIdFailed,
  getPlanDetailsByIdSuccess,
  GET_PLAN_DETAILS_START,
} from '~/modules/mesx/redux/actions/plan'
import { api } from '~/services/api'

/**
 * get plan detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPlanDetailsApi = (params) => {
  const uri = `/v1/produces/plans/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPlanDetails(action) {
  try {
    const response = yield call(getPlanDetailsApi, action?.payload)
    if (response?.data) {
      yield put(getPlanDetailsByIdSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPlanDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get plan detail
 */
export default function* watchGetPlanDetails() {
  yield takeLatest(GET_PLAN_DETAILS_START, doGetPlanDetails)
}
