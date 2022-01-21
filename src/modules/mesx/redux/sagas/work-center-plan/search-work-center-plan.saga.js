import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  searchWorkCenterPlanFailed,
  searchWorkCenterPlanSuccess,
  SEARCH_WORK_CENTER_PLAN_START,
} from 'modules/mesx/redux/actions/work-center-plan.action'

/**
 * Search work center plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWorkCenterPlanApi = (data) => {
  const { id, params } = data
  const uri = `v1/produces/work-orders/${id}/schedules`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWorkCenterPlan(action) {
  try {
    const response = yield call(searchWorkCenterPlanApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data,
      }
      yield put(searchWorkCenterPlanSuccess(payload))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWorkCenterPlanFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search WorkCenterPlan
 */
export default function* watchSearchWorkCenterPlan() {
  yield takeLatest(SEARCH_WORK_CENTER_PLAN_START, doSearchWorkCenterPlan)
}
