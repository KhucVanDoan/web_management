import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMoByPlanIdFailed,
  getMoByPlanIdSuccess,
  GET_MO_BY_PLAN_START,
} from '~/modules/mesx/redux/actions/plan'
import { api } from '~/services/api'

/**
 * get list Mo by plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchMoByPlan = (params) => {
  const uri = `/v1/produces/plans/mos/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMoByPlan(action) {
  try {
    const response = yield call(searchMoByPlan, action?.payload)
    if (response?.data) {
      const payload = {
        list: response.data,
      }
      yield put(getMoByPlanIdSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMoByPlanIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get Mo by plan
 */
export default function* watchGetMoByPlan() {
  yield takeLatest(GET_MO_BY_PLAN_START, doGetMoByPlan)
}
